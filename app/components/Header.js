'use client'
import classes from './Header.module.css';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
const Header = ({toggleSidebar,isSidebarOpen}) => {
    const router = useRouter();
    const { isConnected } = useAccount();
    const { openAccountModal } = useAccountModal();
    const { openConnectModal } = useConnectModal();

    return (
        <div className={classes.header}>
            <div className={classes.hamburgerButton} onClick={toggleSidebar} >
                { isSidebarOpen && <img src="/images/ui/menu-bar.png" alt="hamburger icon" /> }
                { !isSidebarOpen && <img src="/images/ui/cross.png" alt="close menu icon" /> }
            </div>
            <div className={classes.titleArea}>
                <img src="/images/fdt.png" alt="Fast DeFi Tutorial" className={classes.logo} />
                <div className={classes.headerTitle}>Fast DeFi</div>
            </div>
            { !isConnected && (
                <div className={classes.connectWallet} onTouchEnd={openConnectModal}>
                    Connect
                </div>
            )}
            { isConnected && (
                <div className={classes.accountArea} onTouchEnd={(openAccountModal)}>
                    <img src="/images/ui/user.png" className={`${classes.accountIcon} ${classes.invert}`} alt="account icon" />
                </div>
            )}
        </div>
    )
}

export default Header;