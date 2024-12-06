import classes from '@/app/(pages)/(topics)/swap-on-llamaswap/Balances.module.css';
import { formatUnits } from 'viem';

const Balances = ({ethBalance, cbBtcBalance}) => {

    return (
        <div className={classes.balanceArea}>
            <div className={classes.balanceItem}>
                <div className={classes.balanceItemTitle} style={{color: '#627EEA'}}>
                    ETH Balance
                </div>    
                <div className={classes.balanceItemValue} style={{borderColor: '#627EEA'}}>
                    <img src="/images/logos/eth.png" alt="ETH logo" className={classes.balanceIcon} />
                    {ethBalance ? Math.round(formatUnits(ethBalance.value, ethBalance.decimals)*100000)/100000 : '0'}
                </div>
            </div>
            <div className={classes.balanceItem}>
                <div className={classes.balanceItemTitle} style={{color: '#F7931A'}}>
                    cbBTC Balance
                </div>
                <div className={classes.balanceItemValue} style={{borderColor: '#F7931A'}}>
                    <img src="/images/logos/cbbtc.png" alt="cbBTC logo" className={classes.balanceIcon} />
                    {cbBtcBalance ? Math.round(formatUnits(cbBtcBalance.value, cbBtcBalance.decimals)*1000000)/1000000 : '0'}
                </div>
            </div>
        </div>
    )
}

export default Balances;