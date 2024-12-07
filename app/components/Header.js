'use client'
import classes from './Header.module.css';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = ({toggleSidebar,isSidebarOpen}) => {
    const router = useRouter();
    const { isConnected } = useAccount();
    const { openAccountModal } = useAccountModal();
    const { openConnectModal } = useConnectModal();

    const handleConnectWallet = () => {
        openConnectModal();
    }

    return (
        <div className={classes.header}>
            <div className={classes.hamburgerButton} onClick={toggleSidebar} >
                { isSidebarOpen && <img src="/images/ui/menu-bar.png" alt="hamburger icon" /> }
                { !isSidebarOpen && <img src="/images/ui/cross.png" alt="close menu icon" /> }
            </div>
            <div className={classes.titleArea}>
                <img src="/images/fdt.png" alt="Fast DeFi Tutorial" className={classes.logo} />
                <Link href="/" passHref style={{textDecoration: 'none'}}>
                    <div className={classes.headerTitle}>Fast DeFi</div>
                </Link>
            </div>
            { !isConnected && (
                <div className={classes.connectWallet} onClick={handleConnectWallet}>
                    Connect
                </div>
            )}
            { isConnected && (
                <div className={classes.accountArea} onClick={(openAccountModal)}>
                    <img src="/images/ui/user.png" className={`${classes.accountIcon} ${classes.invert}`} alt="account icon" />
                </div>
            )}
        </div>
    )
}

export default Header;