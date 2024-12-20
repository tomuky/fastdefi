'use client';
import classes from '@/app/(pages)/Pages.module.css';
import ListNote from '@/app/components/ListNote';
import ListFinish from '@/app/components/ListFinish';
import Intro from '@/app/components/Intro';
import NextNextButton from '@/app/components/NextButton';
import LPBalance from './LPBalance';
import Spacer from '@/app/components/Spacer';
import PageTitle from '@/app/components/PageTitle';
import Tabs from '@/app/components/Tabs';
import { useTabs } from '@/app/_hooks/useTabs';
import Steps from '@/app/components/Steps';
import FAQ from '@/app/components/FAQ';
import FAQItem from '@/app/components/FAQItem';

export default function EarnOnUniswap() {

    const TABS = ['Add','Withdraw','faq'];
    const { activeTab, setActiveTab }  = useTabs(TABS);

    return (
        <div className={classes.container}>
            
            <PageTitle title="Earn on Uniswap" image="/images/logos/uniswap-logo.png"/>
            
            <Intro>
                <p>Provide liquidity for token pairs and earn fees from other people trading</p>
            </Intro>

            <Tabs
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === 'Add' && (
                <>
                    <Steps>
                        <ol>
                            <li>Go to <a href='https://app.uniswap.org/pools/v2' target='_blank'>app.uniswap.org/pools/v2</a> to create a v2 position</li>
                            <ListNote>v2 is simpler, maintains a 50/50 ratio of the 2 tokens</ListNote>
                            <li>Click Add V2 liquidity and select ETH and USDC as the 2 tokens</li>
                            <li>Make sure you&apos;re on Base network</li>
                            <li>Type in $10 of USDC and it will prefill the ETH side</li>
                            <li>Click Approve USDC and confirm the tx in your wallet popup</li>
                            <li>Click Supply, then click Confirm Supply, and confirm the tx in your wallet popup</li>
                            <ListFinish>Done. You&apos;re collecting fees that auto-compound into your position!</ListFinish>
                        </ol>
                    </Steps>

                    <LPBalance tokenAddress='0x88a43bbdf9d098eec7bceda4e2494615dfd9bb9c' />
                </>
            )}

            {activeTab === 'Withdraw' && (
                <Steps>
                    <ol>
                        <li>Go to <a href='https://app.uniswap.org/pools/v2' target='_blank'>app.uniswap.org/pools/v2</a> and click into your position</li>
                        <li>Click Remove liquidity</li>
                        <li>Choose the amount and click Remove</li>
                        <li>Confirm the tx in your wallet popup</li>
                        <ListFinish>Done. You&apos;ve withdrawn your tokens and collected your fees!</ListFinish>
                    </ol>
                </Steps>
            )}

            {activeTab === 'faq' && (
                <FAQ>
                    <FAQItem question="What is Uniswap?" answer="Uniswap is a decentralized exchange that allows you to trade tokens directly from your wallet without a centralized intermediary."/>
                    <FAQItem question="Where does the yield come from?" answer="You earn fees from others using the liquidity to swap between the tokens. They pay a fee to swap, and the fee goes to you."/>
                    <FAQItem question="How do I claim the yield?" answer="The fees are automatically compounded into your position. You realize the yield when you withdraw your liquidity."/>
                    <FAQItem question="Are there miniumum deposits or lockup periods?" answer="There are no minimum deposits or lockup periods. You can add or remove liquidity at any time."/>
                </FAQ>
            )}

            <NextNextButton title="Track with Zapper" target='/track-with-zapper'/>

            <Spacer/>
        </div>
    )
}