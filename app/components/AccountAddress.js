import classes from './Account.module.css';
import { useAccountModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { getBasename } from '@/app/_apis/basenames';
import { useEffect, useState } from 'react';

const AccountAddress = () => {
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const { openAccountModal } = useAccountModal();
    const [basename, setBasename] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!isConnected) return;
            const fetchedBasename = await getBasename(address);
            setBasename(fetchedBasename);
        }
        fetchData();
    }, [address, isConnected]);

    return (
        <div className={classes.addressArea} onClick={openAccountModal}>
            <div className={classes.addressLabel}>
                <img src="/images/ui/user.png" alt="User" className={classes.accountImage} />
                {basename && basename.length <= 18 && 'Account'}
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