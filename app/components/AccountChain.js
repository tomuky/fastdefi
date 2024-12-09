import classes from './Account.module.css';
import { useAccount } from 'wagmi';

const AccountChain = () => {
    const { chain } = useAccount();
    
    return (
        <div className={classes.chainArea} onClick={''}>
            <div className={classes.chainLabel}>
                <img src="/images/ui/flash.png" alt="Network" className={classes.accountImage} />
                Network
            </div>
            <span>
                {chain && chain.name}
                {!chain && 'Wrong network'}
            </span>
        </div>
    )
}

export default AccountChain;