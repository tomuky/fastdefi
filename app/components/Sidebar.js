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
            <div className={classes.sidebarContent}>
                <SidebarTitle/>
                
                <div className={classes.desktopOnly}>
                    <Account/>
                </div>

                <div className={classes.divider}/>

                {/* <SidebarSection toggleSidebar={toggleSidebar} completed={completedSections.welcome} paths={[
                    {path: '/hello', title: 'Hello', role: 'header', icon: '/images/ui/welcome-logo.png'},
                    {path: '/must-knows', title: 'The must-knows'},
                    {path: '/create-a-wallet', title: 'Create a wallet'},
                    {path: '/get-coinbase', title: 'Get Coinbase'},
                    {path: '/fund-your-wallet', title: 'Fund your wallet'}
                ]}/> */}

                <SidebarLinkGroup>
                    <SidebarLink title="Set Up Wallet" path='/set-up-wallet' icon='/images/ui/wallet-color-5.png' toggleSidebar={toggleSidebar}/>
                </SidebarLinkGroup>

                <div className={classes.divider}/>

                <SidebarLinkGroup>
                    <SidebarLink title="Earn on Aave" path='/earn-on-aave' icon='/images/logos/aave-logo.png' toggleSidebar={toggleSidebar}/>
                    <SidebarLink title="Swap on LlamaSwap" path='/swap-on-llamaswap' icon='/images/logos/llamaswap.png' toggleSidebar={toggleSidebar}/>
                    <SidebarLink title="Earn on Uniswap" path='/earn-on-uniswap' icon='/images/logos/uniswap-logo.png' toggleSidebar={toggleSidebar}/>
                    <SidebarLink title="Get a username" path='/get-a-username' icon='/images/logos/base.png' toggleSidebar={toggleSidebar}/>
                    <SidebarLink title="Track with Zapper" path='/track-with-zapper' icon='/images/logos/zapper-logo.png' toggleSidebar={toggleSidebar}/>
                    <SidebarLink title="Use Basescan" path='/use-basescan' icon='/images/logos/basescan-logo.png' toggleSidebar={toggleSidebar}/>
                    <SidebarLink title="Discover more apps" path='/discover-more-apps' icon='/images/ui/blockchain.png' toggleSidebar={toggleSidebar}/>
                </SidebarLinkGroup>

                <div className={classes.divider}/>

                <SidebarLinkGroup>
                    <SidebarLink title='Twitter/X' url='https://x.com/fastdefi' icon='/images/logos/x-logo.png'/>
                    <SidebarLink title='Github' url='https://github.com/tomuky/fastdefi' icon='/images/logos/github-logo.png'/>
                </SidebarLinkGroup>

                <div style={{width:'100%',minHeight:'200px'}}/>

            </div>
        </div>
    )
}

export default Sidebar;