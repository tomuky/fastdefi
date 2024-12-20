'use client';
import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import { useAccount } from 'wagmi';
import AaveBalanceDisplay from './AaveBalanceDisplay';
import ListNote from '@/app/components/ListNote';
import ListFinish from '@/app/components/ListFinish';
import Spacer from '@/app/components/Spacer';
import PageTitle from '@/app/components/PageTitle';
import { useTabs } from '@/app/_hooks/useTabs';
import Steps from '@/app/components/Steps';
import Tabs from '@/app/components/Tabs';
import Intro from '@/app/components/Intro';

export default function EarnOnAave() {

    const { isConnected } = useAccount();
    const TABS = ['deposit', 'withdraw', 'risks'];
    const { activeTab, setActiveTab } = useTabs(TABS);

    return (
        <div className={classes.container}>

            <PageTitle title="Earn with Aave" image="/images/logos/aave-logo.png"/>

            <Intro>
                <p>You can earn interest with Aave&apos;s lending protocol</p>
            </Intro>
            
            <Tabs 
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === 'deposit' && (
                <Steps>
                    <ol>
                        <li>Go to <a href='https://app.aave.com/?marketName=proto_base_v3' target='_blank'>app.aave.com</a> and click connect wallet, choose Coinbase Wallet</li>
                        <ListNote>Your balance shows up! No new account setup needed.</ListNote>
                        <li>Click Supply next to USDC</li>
                        <li>You might be prompted to switch your network to Base</li>
                        <li>Type in $10, click Approve USDC and confirm tx in your wallet popup</li>
                        <li>After tx confirms, click Supply USDC and confirm tx in your wallet popup</li>
                        <ListFinish>Done. You are earning interest every few seconds!</ListFinish>
                    </ol>
                </Steps>
            )}

            {activeTab === 'risks' && (
                <Steps>
                    <ol>
                        <li>Smart contract risk - Aave could have bugs</li>
                        <li>Market risk - USDC could lose its peg</li>
                        <li>Network risk - Base could have issues</li>
                    </ol>
                </Steps>
            )}

            {activeTab === 'withdraw' && (
                <Steps>
                    <ol>
                        <li>Go to <a href='https://app.aave.com/?marketName=proto_base_v3' target='_blank'>app.aave.com</a></li>
                        <li>Click Withdraw next to USDC</li>
                        <li>Enter the amount you want to withdraw</li>
                        <li>Click Withdraw and confirm the transaction</li>
                    </ol>
                </Steps>
            )}

            <AaveBalanceDisplay 
                style={{marginTop: 20}} 
                title="Your USDC Deposit" 
                isConnected={isConnected}
            />

            <NextButton title="Swap on LlamaSwap" target='/swap-on-llamaswap'/>

            <Spacer/>
        </div>
    )
}