'use client'
import classes from './Header.module.css';
import { useAccount, useChainId, useSwitchChain, useDisconnect } from 'wagmi';
import Link from 'next/link';
import { BlackCreateWalletButton } from './BlackCreateWalletButton';
import { useBasename } from '@/app/_hooks/useBaseNames';
import Modal from './Modal';
import { useState } from 'react';
import { base, mainnet } from 'wagmi/chains';
import Image from 'next/image';

const Header = ({toggleSidebar,isSidebarOpen}) => {
    const { isConnected, address } = useAccount();
    const { basename, loading } = useBasename();
    const chainId = useChainId();
    const { switchChain } = useSwitchChain();
    const { disconnect } = useDisconnect();
    const [isModalOpen, setModalOpen] = useState(false);

    // Get chain name based on chainId
    const chainName = chainId === 8453 ? 'Base' : 
        chainId === 1 ? 'Ethereum' : 'Wrong Network';

    return (
        <div className={classes.header}>

            <div className={classes.titleArea}>
                <Image src="/images/fdt.png" alt="Fast DeFi Tutorial" className={classes.logo} width={20} height={20} />
                <Link href="/" passHref style={{textDecoration: 'none'}}>
                    <div className={classes.headerTitle}>Fast DeFi</div>
                </Link>
            </div>
            
            <div className={classes.rightSide}>
                { !isConnected && (
                    <div className={classes.createWallet}>
                        <BlackCreateWalletButton mobile={true}/>
                    </div>
                )}
                { isConnected && (
                    <div className={classes.accountArea} onClick={() => setModalOpen(true)}>
                        <Image src="/images/ui/user.png" className={`${classes.accountIcon} ${classes.invert}`} alt="account icon" width={14} height={14} />
                        {basename && (
                            <div style={{fontSize: '0.9em', marginLeft: '8px'}}>
                                {basename}
                            </div>
                        )}
                        {!basename && (
                            <div style={{fontSize: '0.9em', marginLeft: '8px'}}>
                                {address.slice(0, 5)}...{address.slice(-4)}
                            </div>
                        )}
                    </div>
                )}
                
                <div className={classes.hamburgerButton} onClick={toggleSidebar} >
                    { isSidebarOpen && <Image src="/images/ui/menu-bar.png" alt="hamburger icon" width={24} height={24} /> }
                    { !isSidebarOpen && <Image src="/images/ui/cross.png" alt="close menu icon" width={24} height={24} /> }
                </div>
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

export default Header;