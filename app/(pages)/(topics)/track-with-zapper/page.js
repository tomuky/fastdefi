'use client';
import classes from '@/app/(pages)/Pages.module.css';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';
import PageTitle from '@/app/components/PageTitle';
import ListIcon from '@/app/components/ListIcon';
import Intro from '@/app/components/Intro';
import Steps from '@/app/components/Steps';
import FAQ from '@/app/components/FAQ';
import FAQItem from '@/app/components/FAQItem';
import Tabs from '@/app/components/Tabs';
import { useTabs } from '@/app/_hooks/useTabs';

export default function TrackWithZapper() {

    const TABS = ['track', 'faq'];
    const { activeTab, setActiveTab } = useTabs(TABS);

    return (
        <div className={classes.container}>

            <PageTitle title="Track with Zapper" image="/images/logos/zapper-logo.png"/>

            <Intro>
                <p>Track your portfolio just by connecting your wallet</p>
            </Intro>

            <Tabs 
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === 'track' && (
                <Steps>
                    <ol>
                        <li>Go to <a href='https://zapper.xyz' target='_blank'>Zapper.xyz</a></li>
                    <li>Click Connect Wallet in top right corner</li>
                    <li>See your token balances on the <a href='https://zapper.xyz/dashboard?tab=dashboard' target='_blank'>Zapper Dashboard</a></li>
                    <li>See your Aave and Uniswap positions on the <a href='https://zapper.xyz/dashboard?tab=apps' target='_blank'>Zapper Positions</a></li>
                    <ListIcon type='note'>No need to create an account</ListIcon>
                    <ListIcon type='note' style={{marginTop: '20px'}}>Zapper reads your balances from the blockchain</ListIcon>
                        <ListIcon type='finish' style={{marginTop: '20px'}}>Done. Bookmark your Zapper dashboard for easy tracking</ListIcon>
                    </ol>
                </Steps>
            )}

            {activeTab === 'faq' && (
                <FAQ>
                    <FAQItem question="What is Zapper?" answer="Zapper is a portfolio tracker that shows your balances and positions from multiple DeFi protocols."/>
                    <FAQItem question="How does it work?" answer="Zapper connects to your wallet and reads your balances and positions from the blockchain."/>
                    <FAQItem question="What are the risks?" answer="There is minimal risk when using Zapper as a read-only tool. It does not have access to your funds."/>
                </FAQ>
            )}

            <NextButton title="Use Basescan" target='/use-basescan'/>

            <Spacer/>
        </div>
    )
}
