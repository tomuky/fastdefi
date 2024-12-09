import classes from './Account.module.css';
import { useAccountModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useBasename } from '@/app/_hooks/useBaseNames';

const AccountAddress = () => {
    const { address } = useAccount();
    const { openAccountModal } = useAccountModal();
    const { basename } = useBasename();

    const handleClick = () => {
        console.log('clicked');
        openAccountModal();
    }

    return (
        <div className={classes.addressArea} onClick={handleClick}>
            <div className={classes.addressLabel}>
                <img src="/images/ui/user.png" alt="User" className={classes.accountImage} />
                {basename && basename.length < 17 && 'Account'}
                {!basename && 'Account'}
            </div>
            <span className={classes.address} 
                style={{ fontSize: basename && basename.length >= 13 ? '0.9em' : '1em' }}>
                {!basename && `${address.slice(0, 5)}...${address.slice(-4)}`}
                {basename && basename}
            </span>
        </div>
    )
}

export default AccountAddress;