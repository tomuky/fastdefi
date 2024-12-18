import classes from '@/app/(pages)/(topics)/swap-on-llamaswap/Balances.module.css';
import { formatUnits } from 'viem';
import Image from 'next/image';

const Balances = ({ethBalance, cbBtcBalance, isConnected}) => {

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
                    {ethBalance ? Math.round(formatUnits(ethBalance.value, ethBalance.decimals)*100000)/100000 : '0'}
                </div>
            </div>
            <div className={classes.balanceItem}>
                <div className={classes.balanceItemTitle}>
                    cbBTC:
                </div>
                <div className={classes.balanceItemValue}>
                    <Image src="/images/logos/cbbtc.png" alt="cbBTC logo" className={classes.balanceIcon} width={30} height={30} />
                    {cbBtcBalance ? Math.round(formatUnits(cbBtcBalance.value, cbBtcBalance.decimals)*1000000)/1000000 : '0'}
                </div>
            </div>
        </div>
    )
}

export default Balances;