'use client'
import classes from './Sidebar.module.css';
import Account from './Account';
import SidebarTitle from './SidebarTitle';
import SidebarSection from './SidebarSection';
import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { useRouter } from 'next/navigation';
import SidebarLink from './SidebarLink';
import SidebarLinkGroup from './SidebarLinkGroup';

const Sidebar = ({isSidebarOpen, toggleSidebar}) => {
    const router = useRouter();
    const [completedSections, setCompletedSections] = useState({
        welcome: false,
        // Add other sections as needed
    });

    const { isConnected, address } = useAccount(); // Get wallet connection status
    const { data: balanceData } = useBalance({address}); // Get balance data

    // console.log('isConnected',isConnected);
    // console.log('balanceData',balanceData);

    useEffect(() => {
        const checkWalletStatus = () => {
            if (isConnected && balanceData?.value > 0) {
                setCompletedSections(prev => ({ ...prev, welcome: true }));
            }
        };

        checkWalletStatus();
    }, [isConnected, balanceData]);

    return (
        <div className={`${classes.sidebarArea} ${isSidebarOpen ? classes.slideIn : classes.slideOut}`}>

            <SidebarTitle/>

            <Account/>

            <div className={classes.divider}/>

            <SidebarSection toggleSidebar={toggleSidebar} completed={completedSections.welcome} paths={[
                {path: '/welcome', title: 'Welcome', role: 'header', icon: '/images/ui/welcome-logo.png'},
                {path: '/must-knows', title: 'Know the must-knows'},
                {path: '/get-wallet', title: 'Get a wallet'},
                {path: '/get-coinbase', title: 'Get Coinbase'},
                {path: '/fund-your-wallet', title: 'Fund your wallet'}
            ]}/>

            <div className={classes.divider}/>

            {/* <SidebarSection toggleSidebar={toggleSidebar} completed={false} paths={[
                {path: '/try-things', title: 'Try things', role: 'header', icon: '/images/ui/magic-2.png'},
                {path: '/save-with-aave', title: 'Save with Aave'}
            ]}/> */}

            <div className={classes.divider}/>

            {/* <div className={classes.stepsArea}>  
                <div className={classes.step} onClick={()=>router.push('/save-with-aave')}>
                    <img className={classes.icon} src={'/images/logos/aave-logo.png'} alt="Aave"/>
                    Save with Aave
                </div>
            </div> */}

            <SidebarLinkGroup>
                <SidebarLink title="Save with Aave" path='/save-with-aave' icon='/images/logos/aave-logo.png' toggleSidebar={toggleSidebar}/>
                <SidebarLink title="Swap on Uniswap" path='/swap-on-uniswap' icon='/images/logos/uniswap-logo.png' toggleSidebar={toggleSidebar}/>
            </SidebarLinkGroup>

        </div>
    )
}

export default Sidebar;