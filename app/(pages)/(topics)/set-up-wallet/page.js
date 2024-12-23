'use client';
import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import { useAccount } from 'wagmi';
import ListIcon from '@/app/components/ListIcon';
import Spacer from '@/app/components/Spacer';
import PageTitle from '@/app/components/PageTitle';
import { useTabs } from '@/app/_hooks/useTabs';
import Steps from '@/app/components/Steps';
import Tabs from '@/app/components/Tabs';
import Intro from '@/app/components/Intro';
import FAQ from '@/app/components/FAQ';
import FAQItem from '@/app/components/FAQItem';

export default function SetUpWallet() {

    const { isConnected } = useAccount();
    const TABS = ['wallet', 'coinbase', 'fund it','faq'];
    const { activeTab, setActiveTab } = useTabs(TABS);
    console.log('activeTab',activeTab);

    return (
        <div className={classes.container}>

            <PageTitle title="Set Up Wallet" image="/images/ui/wallet-color-5.png"/>

            <Intro>
                <p>Create your first wallet and fund it using Coinbase</p>
            </Intro>
            
            <Tabs 
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === 'wallet' && (
                <>
                    <Steps>
                        <ol>
                            <li>Click on Create Wallet and go through the steps</li>
                            <li>Your wallet passkeys will be stored on your device</li>
                            <ListIcon type='caution'>
                                Eventually you need to set up <a href="https://keys.coinbase.com/settings/account-recovery" target="_blank">Account Recovery</a> so you can recover your wallet if you lose your device
                            </ListIcon>
                            <li>Notice the new Account button after connecting your wallet</li>
                            <li>Click on the Account button to do things like copying your wallet address for pasting into Coinbase later</li>
                        </ol>
                    </Steps>
                    <NextButton title="Next" type='tab' setActiveTab={setActiveTab} targetTab='coinbase'/>
                </>
            )}

            {activeTab === 'coinbase' && (
                <>
                    <Steps>
                        <ol>
                            <li>Go to <a href='https://coinbase.com/join/6A22LF6?src=referral-link' target='_blank'>coinbase.com</a> and signup</li>
                            <li>Go to My Assets page and click on Deposit Cash</li>
                            <li>Add payment method if needed, a bank account is best</li>
                            <li>Deposit $100 (or any amount you want) and click to continue</li>
                            <ListIcon type='note'>Takes ~4 days to clear your bank (blame your bank)</ListIcon>
                            <li>Once clear, use half to buy ETH and other half to buy USDC</li>
                        </ol>
                    </Steps>
                    <NextButton title="Next" type='tab' setActiveTab={setActiveTab} targetTab='fund it'/>
                </>
            )}

            {activeTab === 'fund it' && (
                <>
                    <Steps>
                        <ol>
                        <li>On Coinbase.com, click Send Crypto</li>
                        <li>Choose ETH and type in amount</li>
                        <li>Click on &quot;To&quot; field and select Base network</li>
                        <ListIcon type='caution'>Be sure to choose Base network</ListIcon>
                        <li>Paste in your wallet address and click Send</li>
                        <li>Repeat process with USDC and on Base network again</li>
                            <ListIcon type='finish'>Your wallet is now funded and ready to use!</ListIcon>
                        </ol>
                    </Steps>
                    <NextButton title="Next" type='tab' setActiveTab={setActiveTab} targetTab='faq'/>
                </>
            )}

            {activeTab === 'faq' && (
                <>
                    <FAQ>
                        <FAQItem question="What is a wallet?" answer="A wallet allows you to store, send, receive, and use crypto. It is self-custodial, meaning you are in control of your own funds."/>
                        <FAQItem question="What are the risks?" answer="If you lose your device without setting up Account Recvoery, you could lose your funds forever if you lose access to your device."/>
                        <FAQItem question="What is Account Recovery?" answer="Account Recovery allows you to create a secret recovery key you write down on paper and keep in a safe place. This key can be used to recover your wallet on a new device."/>
                        <FAQItem question="What is ETH?" answer="ETH (Ether) is the native currency of the Ethereum blockchain. It is used to pay for transactions on the network."/>
                        <FAQItem question="What is USDC?" answer="USDC is a stablecoin pegged to the US dollar and is backed by cash reserves in a bank."/>
                        <FAQItem question="What is the Base network?" answer="Base is a Layer 2 blockchain that is compatible with Ethereum. It is cheaper to use, making it a great place to start."/>
                    </FAQ>
                    <NextButton title="Earn on Aave" target='/earn-on-aave'/>
                </>
            )}

            {/* <NextButton title="Earn on Aave" target='/earn-on-aave'/> */}

            <Spacer/>
        </div>
    )
}