import classes from './Account.module.css';
import { useAccountModal } from '@rainbow-me/rainbowkit';
import { useAccount,useEnsName } from 'wagmi';
import { useRouter } from 'next/navigation';
const AccountAddress = () => {
    const router = useRouter();
    const { address } = useAccount();
    const { openAccountModal } = useAccountModal();
    const { data: ensName, isLoading } = useEnsName({
        address: address,
        chainId: 1, // Always query mainnet for ENS
    });

    return (
        <div className={classes.addressArea} onClick={openAccountModal}>
            <div className={classes.addressLabel}>
                <img src="/images/ui/user.png" alt="User" className={classes.accountImage} />
                Account
            </div>
            <span className={classes.address} style={{ fontSize: ensName && ensName.length >= 17 ? '0.8em' : '1em' }}>
                {/* {ensName && ensName.length >= 17 ? `${ensName.slice(0, 7)}...${ensName.slice(-7)}` : ensName || `${address.slice(0, 5)}...${address.slice(-4)}`} */}
                {`${address.slice(0, 5)}...${address.slice(-4)}`}
            </span>
        </div>
    )
}

export default AccountAddress;