'use client';
import classes from '@/app/(pages)/Pages.module.css';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { getBasename, getBasenameAvatar, getBasenameTextRecord, BasenameTextRecordKeys } from '@/app/_apis/basenames';
import ListNote from '@/app/components/ListNote';
import ListFinish from '@/app/components/ListFinish';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';
import PageTitle from '@/app/components/PageTitle';
import Intro from '@/app/components/Intro';
import Steps from '@/app/components/Steps';
import FAQ from '@/app/components/FAQ';
import FAQItem from '@/app/components/FAQItem';
import Tabs from '@/app/components/Tabs';
import { useTabs } from '@/app/_hooks/useTabs';

export default function GetAUsername() {
    const { address, isConnected } = useAccount();
    const [basename, setBasename] = useState(null);

    const TABS = ['claim', 'faq'];
    const { activeTab, setActiveTab } = useTabs(TABS);

    useEffect(() => {
        async function fetchData() {
            if (!isConnected) return;
            const fetchedBasename = await getBasename(address);
            setBasename(fetchedBasename);
        }
        fetchData();
    }, [address, isConnected]);

    return (
        <div className={classes.container}>
            
            <PageTitle title="Get a username" image="/images/logos/base.png"/>

            <Intro>
                <p>Make your address easy to remember by registering a Base username</p>
            </Intro>

            <Tabs 
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === 'claim' && (
                <Steps>
                    <ol>
                        <li>Go to <a href="https://base.org/names" target="_blank" rel="noopener noreferrer">Base.org/names</a> and click Connect</li>
                        <li>Use the search field to find an available username</li>
                        <li>Click on a result that you like</li>
                        <li>Make sure &ldquo;Set as primary&ldquo; is checked</li>
                    <ListNote>This allows your username to be used as your address</ListNote>
                    <li>Click Register Name and confirm the popup in your wallet</li>
                    {basename && <li>Complete more of your profile on <a href={`https://www.base.org/name/${basename}`} target="_blank" rel="noopener noreferrer">base.org/name/{basename}</a></li>}
                        {basename && <ListFinish>Done! Your new username on Base is {basename}</ListFinish>}
                    </ol>
                </Steps>
            )}

            {activeTab === 'faq' && (
                <FAQ>
                    <FAQItem question="What is a Base username?" answer="A Base username is a human-readable name that you can register on Base. It makes your address easy to use and remember."/>
                    <FAQItem question="What is the point?" answer="Crypto addresses are hard to remember. Having a username allows you to send crypto to that address (on that network!) without typing the ugly long address."/>
                    <FAQItem question="How do I use it?" answer="When an application supports Base names, you can type in your username instead of the long ugly address when sending crypto or doing things on that network."/>
                    <FAQItem question="Where can I not use it?" answer="You cannot use it on other networks. For instance, Ethereum has its own username registrar but it is more expensive to set up."/>
                    <FAQItem question="What are the risks?" answer="Very minimal risk since there are no funds involved."/>
                </FAQ>
            )}

            <NextButton title="Track with Zapper" target='/track-with-zapper'/>

            <Spacer/>

        </div>
    );
}