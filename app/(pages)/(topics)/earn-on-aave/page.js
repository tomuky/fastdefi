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
import FAQ from '@/app/components/FAQ';
import FAQItem from '@/app/components/FAQItem';

export default function EarnOnAave() {

    const { isConnected } = useAccount();
    const TABS = ['deposit', 'withdraw','faq'];
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
                <>
                    <Steps>
                        <ol>
                            <li>Go to <a href='https://app.aave.com/?marketName=proto_base_v3' target='_blank'>app.aave.com</a> and click connect wallet, choose Coinbase Wallet</li>
                            <ListNote>Notice how your USDC balance shows up automatically</ListNote>
                            <li>Click Supply next to USDC</li>
                            <li>You might be prompted to switch your network to Base</li>
                            <li>Type in $10, click Approve USDC and confirm tx in your wallet popup</li>
                            <li>After tx confirms, click Supply USDC and confirm tx in your wallet popup</li>
                            <ListFinish>Done. You are earning interest every few seconds!</ListFinish>
                        </ol>
                    </Steps>

                    <AaveBalanceDisplay 
                        style={{marginTop: 20}} 
                        title="Your USDC Deposit" 
                        isConnected={isConnected}
                    />
                </>
            )}

            {activeTab === 'withdraw' && (
                <Steps>
                    <ol>
                        <li>Go to <a href='https://app.aave.com/?marketName=proto_base_v3' target='_blank'>app.aave.com</a></li>
                        <li>Click Withdraw next to USDC</li>
                        <li>Enter the amount you want to withdraw</li>
                        <li>Click Withdraw and confirm the transaction</li>
                        <ListFinish>Done. Your USDC will be back in your wallet!</ListFinish>
                    </ol>
                </Steps>
            )}

            {activeTab === 'risks' && (
                <Steps>
                    <ul>
                        <li><span style={{fontWeight: 'bold'}}>Smart contract risk</span> - Aave smart conrtracts could have bugs, but it has had maybe audits and has secured billions of value with no issues</li>
                        <li><span style={{fontWeight: 'bold'}}>Liquidity risk</span> - available liquidity to withdraw could be low when demand to borrow is high, but interest rate mechanics will incentivize more supply to bring available liquidity back</li>
                        <li><span style={{fontWeight: 'bold'}}>Market risk</span> - USDC could lose its peg to $1 but Circle.com releases quarterly reports that prove its reserves are backed by cash and cash equivalents</li>
                        <li><span style={{fontWeight: 'bold'}}>Network risk</span> - the Base network could have issues, but it is a very popular and maintained by a publicly traded company Coinbase</li>
                    </ul>
                </Steps>
            )}

            {activeTab === 'faq' && (
                <FAQ>
                    <FAQItem question="What are the risks?" answer="There are 2 main risks: 1) Smart Contract bugs - there can be bugs, but Aave has had many audits and has secured billions of value with no issues. 2) Liquidity risk - available liquidity to withdraw could be low when demand to borrow is high, but interest rate mechanisms will incentivize more supply to bring available liquidity back"/>
                    <FAQItem question="Where does the yield come from?" answer="The yield comes from the interest paid by borrowers to lenders. The interest rate is determined by the supply and demand for the asset in the market."/>
                    <FAQItem question="Are there minimum deposits or lockup periods?" answer="There is no minimum amount to deposit. You can deposit any amount of USDC you want. There is no lockup period, you can withdraw your USDC anytime."/>
                    <FAQItem question="How does borrowing work?" answer="Aave enables users to supply assets as collateral to borrow other assets. If the value of the collateral falls below the borrowed amount, the borrower must repay the loan or the collateral will be liquidated."/>
                </FAQ>
            )}

            <NextButton title="Swap on LlamaSwap" target='/swap-on-llamaswap'/>

            <Spacer/>
        </div>
    )
}