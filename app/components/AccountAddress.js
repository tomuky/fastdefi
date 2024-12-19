import classes from './Account.module.css';
import { useAccount, useChainId, useSwitchChain, useDisconnect } from 'wagmi';
import { useBasename } from '@/app/_hooks/useBaseNames';
import Modal from './Modal';
import { useState } from 'react';
import { base, mainnet } from 'wagmi/chains';
import Image from 'next/image';

const AccountAddress = () => {
    const { address } = useAccount();
    const { basename } = useBasename();
    const [isModalOpen, setModalOpen] = useState(false);
    const chainId = useChainId();
    const { switchChain, isLoading: isSwitchingChain, error: switchError } = useSwitchChain({
        onError: (error) => {
            console.error('Failed to switch chain:', error);
        },
    });
    const { disconnect } = useDisconnect();

    // Get chain name based on chainId
    const chainName = chainId === 8453 ? 'Base' : 
        chainId === 1 ? 'Ethereum' : 'Wrong Network';

    return (
        <div style={{ position: 'relative',width: '100%' }}>
            <div className={classes.addressArea} onClick={() => setModalOpen(true)}>
                <div className={classes.addressLabel}>
                    <Image src="/images/ui/user-white.png" alt="User" className={classes.accountImage} width={16} height={16} />
                    {basename && basename.length < 17 && 'Account'}
                    {!basename && 'Account'}
                </div>
                <span className={classes.address} 
                    style={{ fontSize: basename && basename.length >= 13 ? '0.9em' : '1em' }}>
                    {!basename && `${address.slice(0, 5)}...${address.slice(-4)}`}
                    {basename && basename}
                </span>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                address={address}
                chainId={chainId}
                chainName={chainName}
                onChangeNetwork={() => switchChain({chainId: base.id})}
                onSignOut={() => {
                    disconnect();
                    setModalOpen(false);
                }}
            />
        </div>
    )
}

export default AccountAddress;