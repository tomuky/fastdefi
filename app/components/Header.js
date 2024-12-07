'use client'
import classes from './Header.module.css';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlackCreateWalletButton } from './BlackCreateWalletButton';
import { useBasename } from '@/app/_hooks/useBaseNames';

const Header = ({toggleSidebar,isSidebarOpen}) => {
    const router = useRouter();
    const { isConnected, address } = useAccount();
    const { openAccountModal } = useAccountModal();
    const { openConnectModal } = useConnectModal();
    const { basename, loading } = useBasename();

    return (
        <div className={classes.header}>

            <div className={classes.titleArea}>
                <img src="/images/fdt.png" alt="Fast DeFi Tutorial" className={classes.logo} />
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
                    <div className={classes.accountArea} onClick={(openAccountModal)}>
                        <img src="/images/ui/user.png" className={`${classes.accountIcon} ${classes.invert}`} alt="account icon" />
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
                    { isSidebarOpen && <img src="/images/ui/menu-bar.png" alt="hamburger icon" /> }
                    { !isSidebarOpen && <img src="/images/ui/cross.png" alt="close menu icon" /> }
                </div>
            </div>

        </div>
    )
}

export default Header;