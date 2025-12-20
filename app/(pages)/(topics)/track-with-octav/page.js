'use client';
import { useRouter } from 'next/navigation';
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
import FooterMobile from '@/app/components/FooterMobile';

export default function TrackWithOctav() {

    const router = useRouter();
    const TABS = ['track', 'faq'];
    const nextTopic = '/use-basescan';
    const TABS_FOOTER_MESSAGES = {
        'track': 'See FAQ',
        'faq': 'Next Topic: Use Basescan'
    };
    const { activeTab, setActiveTab, isLastTab, goToNextTab } = useTabs(TABS);

    const handleFooterClick = () => {
        if (isLastTab) {
            router.push(nextTopic);
        } else {
            goToNextTab();
        }
    };

    return (
        <div className={classes.container}>

            <PageTitle title="Track with Octav" image="/images/logos/octav-logo.png"/>

            <Intro>
                <p>Octav is a more advanced portfolio tracker that shows your balances and DeFi positions</p>
            </Intro>

            <Tabs
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === 'track' && (
                <Steps>
                    <ol>
                        <li>Go to <a href='https://pro.octav.fi' target='_blank'>Octav.fi</a></li>
                    <li>Enter any address you want to see in the searchbar</li>
                    <li>See your token balances and positions</li>
                    <ListIcon type='note'>No need to create an account</ListIcon>
                    <ListIcon type='note' style={{marginTop: '20px'}}>Octav reads your balances from the blockchain</ListIcon>
                        <ListIcon type='finish' style={{marginTop: '20px'}}>Done. Bookmark your Octav dashboard for easy tracking</ListIcon>
                    </ol>
                </Steps>
            )}

            {activeTab === 'faq' && (
                <FAQ>
                    <FAQItem question="What is Octav?" answer="Octav is a more advancedportfolio tracker that shows your balances and DeFi positions. Octav offers a pro mode with more features."/>
                    <FAQItem question="How does it work?" answer="Octav connects to your wallet and reads your balances and positions from the blockchain."/>
                    <FAQItem question="What are the risks?" answer="There is minimal risk when using Octav as a read-only tool. It does not have access to your funds."/>
                </FAQ>
            )}

            <NextButton title="Use Basescan" target='/use-basescan'/>

            <Spacer/>

            <FooterMobile message={TABS_FOOTER_MESSAGES[activeTab]} onClick={handleFooterClick} isNextTopic={isLastTab}/>
        </div>
    )
}