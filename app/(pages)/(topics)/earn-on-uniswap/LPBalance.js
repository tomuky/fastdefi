import classes from './LPBalance.module.css';
import { useAccount, useReadContracts } from 'wagmi';
import { useState, useEffect, useCallback } from 'react';
import abi from '@/app/_abi/ERC20.json';
import Image from 'next/image';

// Add Uniswap V2 Pair ABI - you'll need the full ABI
const PAIR_ABI = [
    // Only including necessary functions
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getReserves",
        "outputs": [
            {"type": "uint112", "name": "reserve0"},
            {"type": "uint112", "name": "reserve1"},
            {"type": "uint32", "name": "blockTimestampLast"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const LPBalance = ({ tokenAddress }) => {
    const { address, isConnected } = useAccount();
    const [entryBlock, setEntryBlock] = useState(null);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);

    // 1. Find when user first acquired LP tokens
    useEffect(() => {
        const findEntryBlock = async () => {
            if (!address || !tokenAddress) return;
            
            const CACHE_KEY = `${address}-${tokenAddress}-entry-block`;
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                setEntryBlock(BigInt(cached));
                console.log('Entry block:', cached)
                setIsLoadingHistory(false);
                return;
            }

            try {
                const url = `https://api.basescan.org/api` +
                    `?module=account` +
                    `&action=tokentx` +
                    `&contractaddress=${tokenAddress}` +
                    `&address=${address}` +
                    `&sort=asc` +
                    `&apikey=${process.env.NEXT_PUBLIC_BASESCAN_API_KEY}`

                const response = await fetch(url);
                const data = await response.json();

                if (data.status === '1' && data.result.length > 0) {
                    const block = BigInt(data.result[0].blockNumber);
                    console.log('Entry block:', block)
                    setEntryBlock(block);
                    localStorage.setItem(CACHE_KEY, block.toString());
                }
            } catch (error) {
                console.error('Error finding entry block:', error);
            }
            setIsLoadingHistory(false);
        };

        findEntryBlock();
    }, [address, tokenAddress]);

    // Split into two separate hooks
    const { data: currentData, isLoading: isLoadingCurrent } = useReadContracts({
        contracts: [
            {
                address: tokenAddress,
                abi: abi,
                functionName: 'balanceOf',
                args: [address ?? '0x0'],
            },
            {
                address: tokenAddress,
                abi: PAIR_ABI,
                functionName: 'totalSupply',
            },
            {
                address: tokenAddress,
                abi: PAIR_ABI,
                functionName: 'getReserves',
            },
        ],
        query: {
            enabled: Boolean(address) && Boolean(tokenAddress),
            refetchInterval: 300000,
        }
    });

    const { data: historicalData, isLoading: isLoadingHistorical } = useReadContracts({
        contracts: [
            {
                address: tokenAddress,
                abi: PAIR_ABI,
                functionName: 'totalSupply',
            },
            {
                address: tokenAddress,
                abi: PAIR_ABI,
                functionName: 'getReserves',
            },
        ],
        blockNumber: entryBlock,
        query: {
            enabled: Boolean(address) && Boolean(tokenAddress) && Boolean(entryBlock)
        }
    });

    // Update the calculatePositions function to use the new data structure
    const calculatePositions = useCallback(() => {
        if (isLoadingCurrent || !currentData || (entryBlock && (!historicalData || isLoadingHistorical))) return null;

        // Current position
        const currentLPBalance = BigInt(currentData[0].result);
        const currentTotalSupply = BigInt(currentData[1].result);
        const currentReserves = currentData[2].result;
        
        // Historical position (if entryBlock exists)
        const historicalTotalSupply = entryBlock ? BigInt(historicalData[0].result) : currentTotalSupply;
        const historicalReserves = entryBlock ? historicalData[1].result : currentReserves;

        // Calculate shares
        const currentShare = Number(currentLPBalance * BigInt(1e18) / currentTotalSupply) / 1e18;
        const historicalShare = Number(currentLPBalance * BigInt(1e18) / historicalTotalSupply) / 1e18;

        // Calculate token amounts
        const currentToken0 = (Number(currentReserves[0]) * currentShare) / 1e18;
        const currentToken1 = (Number(currentReserves[1]) * currentShare) / 1e6;
        const initialToken0 = (Number(historicalReserves[0]) * historicalShare) / 1e18;
        const initialToken1 = (Number(historicalReserves[1]) * historicalShare) / 1e6;

        // Calculate changes
        const token0Change = currentToken0 - initialToken0;
        const token1Change = currentToken1 - initialToken1;

        // Calculate current ETH price
        const ethPrice = (Number(currentReserves[1]) / 1e6) / (Number(currentReserves[0]) / 1e18);

        // Calculate values
        const currentValue = currentToken0 * ethPrice + currentToken1;
        const changeValue = token0Change * ethPrice + token1Change;

        const positions = {
            initial: {
                token0: initialToken0,
                token1: initialToken1,
                share: historicalShare,
                historicalReserves0: historicalReserves[0],
                historicalReserves1: historicalReserves[1],
                entryBlock: entryBlock
            },
            current: {
                token0: currentToken0,
                token1: currentToken1,
                share: currentShare,
                ethPrice: ethPrice,
                value: currentValue,
                currentReserves0: currentReserves[0],
                currentReserves1: currentReserves[1]
            },
            changes: {
                token0: token0Change,
                token1: token1Change,
                value: changeValue
            }
        };

        console.log('Calculated positions:', positions);
        return positions;
    }, [currentData, historicalData, isLoadingCurrent, isLoadingHistorical, entryBlock]);

    // Update loading check
    const isLoading = isLoadingHistory || isLoadingCurrent || (entryBlock && isLoadingHistorical);

    // 4. Render the component
    const positions = calculatePositions();

    if (isConnected &&isLoading) {
        return <div>Loading position data...</div>;
    }

    if (isConnected && !positions) {
        return <div>No LP position found</div>;
    }

    // Update format balance function to handle different decimals
    const formatBalance = (rawBalance, decimals = 18) => {
        if (!rawBalance) return '0.00';
        try {
            const balance = BigInt(rawBalance);
            return (Number(balance) / Math.pow(10, decimals)).toFixed(decimals === 6 ? 2 : 4);
        } catch (e) {
            console.error('Error formatting balance:', e);
            return '0.00';
        }
    };

    const formatChange = (value, decimals) => {
        const formattedValue = Number(value).toFixed(decimals);
        return value > 0 ? `+${formattedValue}` : formattedValue;
    };

    if (!isConnected) {
        return <div style={{marginTop: '20px', marginBottom: '20px', fontSize:'16px'}}>Connect your wallet to see your LP balance</div>;
    }

    return (
        <div className={classes.balanceContainer}>
            <div className={classes.tokenAmountsArea}>

                <div className={classes.tokenAmountBox}>

                    <div className={classes.tokenAmountBoxTitle}>
                        Your underlying assets:
                    </div>

                    <div className={classes.tokenAmountBoxBody}>

                        <div className={classes.tokenAmountBoxRow}>
                            <div className={classes.tokenAmountBoxAsset}>
                                <Image 
                                    src="/images/logos/eth.png" 
                                    alt="ETH logo" 
                                    className={classes.tokenAmountBoxIcon}
                                    width={26}
                                    height={26}
                                />
                                <div className={classes.tokenAmountBoxLabel}>ETH</div>
                            </div>
                            <div className={classes.tokenAmountBoxValue}>{Number(positions.current.token0).toFixed(6)}</div>
                        </div>

                        <div className={classes.tokenAmountBoxRow}>
                            <div className={classes.tokenAmountBoxAsset}>
                                <Image 
                                    src="/images/logos/usdc.png" 
                                    alt="USDC logo" 
                                    className={classes.tokenAmountBoxIcon}
                                    width={26}
                                    height={26}
                                />
                                <div className={classes.tokenAmountBoxLabel}>USDC</div>
                            </div>
                            <div className={classes.tokenAmountBoxValue}>{Number(positions.current.token1).toFixed(2)}</div>
                        </div>

                        <div className={classes.tokenAmountBoxRow}>
                            <div className={classes.tokenAmountBoxLabel} style={{marginLeft:'34px'}}>Total</div>
                            <div className={classes.tokenAmountBoxValue}>${positions.current.value.toFixed(2)}</div>
                        </div>
                    </div>

                </div>

                <div className={classes.tokenAmountBox}>

                    <div className={classes.tokenAmountBoxTitle}>
                        Changes since entry:
                    </div>

                    <div className={classes.tokenAmountBoxBody}>

                        <div className={classes.tokenAmountBoxRow}>
                            <div className={classes.tokenAmountBoxAsset}>
                                <Image 
                                    src="/images/logos/eth.png" 
                                    alt="ETH logo" 
                                    className={classes.tokenAmountBoxIcon}
                                    width={26}
                                    height={26}
                                />
                                <div className={classes.tokenAmountBoxLabel}>ETH</div>
                            </div>
                            <div className={classes.tokenAmountBoxValue}>
                                {formatChange(positions.changes.token0, 6)}
                            </div>
                        </div>

                        <div className={classes.tokenAmountBoxRow}>
                            <div className={classes.tokenAmountBoxAsset}>
                                <Image 
                                    src="/images/logos/usdc.png" 
                                    alt="USDC logo" 
                                    className={classes.tokenAmountBoxIcon}
                                    width={26}
                                    height={26}
                                />
                                <div className={classes.tokenAmountBoxLabel}>USDC</div>
                            </div>
                            <div className={classes.tokenAmountBoxValue}>
                                {formatChange(positions.changes.token1, 2)}
                            </div>
                        </div>

                        <div className={classes.tokenAmountBoxRow}>
                            <div className={classes.tokenAmountBoxLabel} style={{marginLeft:'34px'}}>Total</div>
                            <div className={classes.tokenAmountBoxValue}>
                                {positions.changes.value > 0 ? '+' : ''}
                                ${positions.changes.value.toFixed(2)}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default LPBalance;