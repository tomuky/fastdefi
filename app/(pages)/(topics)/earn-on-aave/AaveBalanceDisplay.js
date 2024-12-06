import classes from './AaveBalanceDisplay.module.css';
import useAnimatedBalance from '@/app/_hooks/useAnimatedBalance';

const BalanceDisplay = ({title, balance=0, isBalanceLoading=false, style}) => {

    const animatedBalance = useAnimatedBalance(balance, 10000);

    return (
        <div className={classes.balanceContainer} style={style}>
            <div className={classes.balanceLabel}>{`${title}:`}</div>
            <div className={classes.balance}>
                {balance ? `$${animatedBalance.toFixed(10)}` : (isBalanceLoading ? '$...' : '$0.00')}
            </div>
        </div>
    )
}

export default BalanceDisplay;