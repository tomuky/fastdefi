'use client';
import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import { useAccount } from 'wagmi';
import ListFinish from '@/app/components/ListFinish';
import Spacer from '@/app/components/Spacer';
import PageTitle from '@/app/components/PageTitle';
import { useTabs } from '@/app/_hooks/useTabs';
import Steps from '@/app/components/Steps';
import Tabs from '@/app/components/Tabs';
import Intro from '@/app/components/Intro';
import FAQ from '@/app/components/FAQ';
import FAQItem from '@/app/components/FAQItem';

export default function StartPage() {

    const { isConnected } = useAccount();
    const TABS = ['create wallet', 'get coinbase', 'faq'];
    const { activeTab, setActiveTab } = useTabs(TABS);

    return (
        <div className={classes.container}>

            <PageTitle title="Set Up Wallet" image="/images/logos/aave-logo.png"/>

            <Intro>
                <p>You can earn interest with Aave&apos;s lending protocol</p>
            </Intro>
            
            <Tabs 
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === 'Wallet' && (
                <Steps>
                    <ol>
                        
                    </ol>
                </Steps>
            )}

            {activeTab === 'Coinbase' && (
                <Steps>
                    <ul>
                        
                    </ul>
                </Steps>
            )}

            {activeTab === 'FAQ' && (
                <FAQ>
                    <FAQItem question="What are the risks?" answer=""/>
                </FAQ>
            )}

            <NextButton title="Swap on LlamaSwap" target='/swap-on-llamaswap'/>

            <Spacer/>
        </div>
    )
}