import classes from '@/app/(pages)/(topics)/swap-on-llamaswap/Balances.module.css';
import { formatUnits } from 'viem';

const Balances = ({ethBalance, cbBtcBalance}) => {

    return (
        <div className={classes.balanceArea}>
            <div className={classes.balanceItem}>
                <div className={classes.balanceItemTitle}>
                    ETH:
                </div>    
                <div className={classes.balanceItemValue}>
                    <img src="/images/logos/eth.png" alt="ETH logo" className={classes.balanceIcon} />
                    {ethBalance ? Math.round(formatUnits(ethBalance.value, ethBalance.decimals)*100000)/100000 : '0'}
                </div>
            </div>
            <div className={classes.balanceItem}>
                <div className={classes.balanceItemTitle}>
                    cbBTC:
                </div>
                <div className={classes.balanceItemValue}>
                    <img src="/images/logos/cbbtc.png" alt="cbBTC logo" className={classes.balanceIcon} />
                    {cbBtcBalance ? Math.round(formatUnits(cbBtcBalance.value, cbBtcBalance.decimals)*1000000)/1000000 : '0'}
                </div>
            </div>
        </div>
    )
}

export default Balances;