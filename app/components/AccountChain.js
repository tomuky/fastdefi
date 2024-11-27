import classes from './Account.module.css';
import { useChainModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const AccountChain = () => {
    const { chain } = useAccount();
    const { openChainModal } = useChainModal();
    
    return (
        <div className={classes.chainArea} onClick={openChainModal}>
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