import classes from './AaveBalanceDisplay.module.css';
import useAnimatedBalance from '@/app/_hooks/useAnimatedBalance';
import { useAccount } from 'wagmi';
import { useReadContract } from 'wagmi';
import abi from '@/app/_abi/ERC20.json';

const BalanceDisplay = ({title, style, isConnected}) => {
    const { address } = useAccount();
    const aBaseUSDC_Address = '0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB';

    const {data:balance, isLoading: isBalanceLoading} = useReadContract({
        address: aBaseUSDC_Address,
        abi: abi,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
        query: {
            enabled: Boolean(address),
            refetchInterval: 10000,
        }
    });

    const animatedBalance = useAnimatedBalance(balance);

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