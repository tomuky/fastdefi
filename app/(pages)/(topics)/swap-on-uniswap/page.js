'use client';
import NextNextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import classes2 from '@/app/(pages)/(topics)/swap-on-uniswap/Page.module.css';
import { useAccount, useBalance, useChainId } from 'wagmi';
import ListFinish from '@/app/components/ListFinish';
import ListNote from '@/app/components/ListNote';
import { formatUnits } from 'viem';

export default function SaveWithAave() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const isBase = chainId === 8453; // Base network chain ID
    const CBBTC_ADDRESS = '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf';
    
    // Get ETH balance
    const { data: ethBalance, isLoading: isLoadingEth } = useBalance({
        address: address,
    });

    // Get cbBTC balance
    const { data: cbBtcBalance, isLoading: isLoadingCbBtc } = useBalance({
        address: address,
        token: CBBTC_ADDRESS,
    });

    // Helper function to safely check if balance is greater than zero
    const hasBalance = (balance) => balance && parseFloat(formatUnits(balance.value, balance.decimals)) > 0;

    console.log('ethBalance', ethBalance);
    console.log('cbBtcBalance', cbBtcBalance);
    console.log('isBase', isBase);

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/logos/uniswap-logo.png" alt="uniswap logo" className={classes.titleImage} />
                Swap on Uniswap
            </div>
            <div className={classes.intro}>
                <p>Swap tokens directly from your wallet</p>
            </div>
            <div className={classes.steps}>
                <ol>
                    { !isConnected && (
                        <>
                            <li>Get some ETH in your wallet</li> 
                            <li>Make sure you are connected to the Base network</li>
                        </>
                    )}
                    { isConnected && !isBase && (
                        <li>Connect to Base network by clicking the network button on this page</li>
                    )}
                    { isConnected && isBase && (isLoadingEth || isLoadingCbBtc) && (
                        <li>Loading balances...</li>
                    )}
                    { isConnected && isBase && !isLoadingEth && !isLoadingCbBtc && (
                        <>
                            {!hasBalance(ethBalance) && (
                                <li>Get some ETH in your wallet</li>
                            )}
                        </>
                    )}
                    <li>Go to <a href="https://app.uniswap.org/swap" target="_blank">app.uniswap.org/swap</a> and connect your wallet</li>
                    <li>Select Base ETH as token to swap from</li>
                    <li>Select cbBTC as token to swap to</li>
                    <ListNote>cbBTC is tokenized BTC on Base, price is pegged to BTC</ListNote>
                    <li>Type in a sample amount to swap like 0.002 ETH</li>
                    <li>Double check you're swapping right assets and on Base network</li>
                    <li>Click Review and then Swap, confirm the tx in your wallet popup</li>
                    { hasBalance(cbBtcBalance) && <ListFinish>Done. You swapped tokens directly from your wallet!</ListFinish> }
                    { !hasBalance(cbBtcBalance) && <li>After you swap you will see your balances update below</li> }
                </ol>

                <div className={classes2.balanceArea}>
                    <div className={classes2.balanceItem}>
                        <div className={classes2.balanceItemTitle} style={{color: '#627EEA'}}>ETH</div>    
                        <div className={classes2.balanceItemValue} style={{borderColor: '#627EEA'}}>
                            {ethBalance ? Math.round(formatUnits(ethBalance.value, ethBalance.decimals)*100000)/100000 : '0'}
                        </div>
                    </div>
                    <div className={classes2.balanceItem}>
                        <div className={classes2.balanceItemTitle} style={{color: '#F7931A'}}>cbBTC</div>    
                        <div className={classes2.balanceItemValue} style={{borderColor: '#F7931A'}}>
                            {cbBtcBalance ? Math.round(formatUnits(cbBtcBalance.value, cbBtcBalance.decimals)*1000000)/1000000 : '0'}
                        </div>
                    </div>
                </div>

            </div>

            <NextNextButton title="Something next" target='/get-wallet'/>

            <div style={{minHeight: '100px', width: '100%', backgroundColor: 'inherit'}}/>
            
        </div>
    )
}