import classes from './AaveBalanceDisplay.module.css';
import useAnimatedBalance from '@/app/_hooks/useAnimatedBalance';

const BalanceDisplay = ({title, balance=0, isBalanceLoading=false, style, isConnected}) => {

    const animatedBalance = useAnimatedBalance(balance, 10000);

    if (!isConnected) {
        return <div style={{marginTop: '20px', marginBottom: '20px', width: '100%', textAlign: 'center', fontStyle: 'italic'}}>Connect your wallet to see your balances</div>;
    }
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