'use client';
import classes from '@/app/(pages)/Pages.module.css';
import ListNote from '@/app/components/ListNote';
import ListFinish from '@/app/components/ListFinish';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';
import { useBasename } from '@/app/_hooks/useBaseNames';
import PageTitle from '@/app/components/PageTitle';
import Intro from '@/app/components/Intro';
import Steps from '@/app/components/Steps';
import FAQ from '@/app/components/FAQ';
import FAQItem from '@/app/components/FAQItem';
import Tabs from '@/app/components/Tabs';
import { useTabs } from '@/app/_hooks/useTabs';

export default function UseBasescan() {
    const { basename } = useBasename();
    const TABS = ['discover', 'faq'];
    const { activeTab, setActiveTab } = useTabs(TABS);

    return (
        <div className={classes.container}>

            <PageTitle title="Use Basescan" image="/images/logos/basescan-logo.png"/>

            <Intro>
                <p>Basescan is a block explorer for the Base network</p>
                <p>See more info about transactions, addresses, and more</p>
            </Intro>

            <Tabs 
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === 'discover' && (
                <Steps>
                    <ol>
                        <li>Go to <a href="https://basescan.org" target="_blank" rel="noopener noreferrer">Basescan.org</a> and search your address</li>
                    {basename && (
                        <ListNote>
                            You can use your Base username: <a href={`https://basescan.org/address/${basename}`} target="_blank" rel="noopener noreferrer">{basename}</a>
                        </ListNote>
                    )}
                    <li>Find your address as the Resolved Address you can click on</li>
                    <li>See a list of all your transactions you&apos;ve made on the Base network</li>
                    <li>Click into a couple and see if you can decipher the details</li>
                        <ListFinish>Done. Basescan is a powerful tool for seeing what transactions are doing</ListFinish>
                    </ol>
                </Steps>
            )}

            {activeTab === 'faq' && (
                <FAQ>
                    <FAQItem question="What is Basescan?" answer="Basescan is a block explorer for the Base network. It allows you to see all the transactions and addresses on the network."/>
                    <FAQItem question="What is a block explorer?" answer="A block explorer is a tool that allows you to see more raw data about transactions and balances on a blockchain."/>
                    <FAQItem question="What are the risks?" answer="There is no risk because Basescan is a read-only tool and does not have access to your funds."/>
                </FAQ>
            )}

            <NextButton title="Discover more apps" target='/discover-more-apps'/>

            <Spacer/>
        </div>
    );
}