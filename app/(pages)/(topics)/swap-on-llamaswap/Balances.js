import classes from '@/app/(pages)/(topics)/swap-on-llamaswap/Balances.module.css';
import { formatUnits } from 'viem';
import Image from 'next/image';
import { useAccount, useBalance } from 'wagmi';

export default function Balances({ isConnected }) {
    const { address } = useAccount();

    // Get ETH balance
    const { data: ethBalance, isLoading: isLoadingEth } = useBalance({address});

    // Get cbBTC balance
    const { data: cbBtcBalance, isLoading: isLoadingCbBtc } = useBalance({
        address: address,
        token: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
    });

    // Helper function to safely check if balance is greater than zero
    const hasBalance = (balance) => balance && parseFloat(formatUnits(balance.value, balance.decimals)) > 0;

    if (!isConnected) {
        return <div style={{marginTop: '20px', marginBottom: '20px', width: '100%', textAlign: 'center', fontStyle: 'italic', fontSize:'16px'}}>Connect your wallet to see your balances</div>;
    }

    return (
        <div className={classes.balanceArea}>
            <div className={classes.balanceItem}>
                <div className={classes.balanceItemTitle}>
                    ETH:
                </div>    
                <div className={classes.balanceItemValue}>
                    <Image src="/images/logos/eth.png" alt="ETH logo" className={classes.balanceIcon} width={30} height={30} />
                    {hasBalance(ethBalance) ? Math.round(formatUnits(ethBalance.value, ethBalance.decimals)*100000)/100000 : '0'}
                </div>
            </div>
            <div className={classes.balanceItem}>
                <div className={classes.balanceItemTitle}>
                    cbBTC:
                </div>
                <div className={classes.balanceItemValue}>
                    <Image src="/images/logos/cbbtc.png" alt="cbBTC logo" className={classes.balanceIcon} width={30} height={30} />
                    {hasBalance(cbBtcBalance) ? Math.round(formatUnits(cbBtcBalance.value, cbBtcBalance.decimals)*1000000)/1000000 : '0'}
                </div>
            </div>
        </div>
    )
}