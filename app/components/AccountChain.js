import classes from './Account.module.css';
import { useAccount } from 'wagmi';
import Image from 'next/image';

const AccountChain = () => {
    const { chain } = useAccount();
    
    return (
        <div className={classes.chainArea} onClick={''}>
            <div className={classes.chainLabel}>
                <Image src="/images/ui/flash.png" alt="Network" className={classes.accountImage} width={16} height={16} />
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