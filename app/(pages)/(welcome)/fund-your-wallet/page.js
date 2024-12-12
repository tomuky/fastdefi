'use client'
import classes from '@/app/(pages)/Pages.module.css';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';
import { useAccount } from 'wagmi';
import PageTitle from '@/app/components/PageTitle';
import ListCaution from '@/app/components/ListCaution';
import ListFinish from '@/app/components/ListFinish';

export default function FundYourWalletPage() {
    const { address, isConnected } = useAccount();

    return (
        <div className={classes.container}>

            <PageTitle title="Fund your wallet" image="/images/logos/coinbase-wallet-logo.png"/>

            <div className={classes.intro}>
                <p>Your wallet is ready to receive funds from Coinbase</p>
            </div>
            <div className={classes.steps}>
                <ol>
                    {!isConnected && (
                        <li>On this page, click Create Wallet to create your wallet</li>
                    )}
                    <li>Copy your wallet address by clicking the Address button</li>
                    <li>On Coinbase.com, click on Send Crypto</li>
                    <li>Choose ETH and type in amount (maybe do Max amount)</li>
                    <li>Click on &quot;To&quot; field and select Base network</li>
                    <ListCaution>Be sure to choose Base network</ListCaution>
                    <li>Paste in your wallet address and click Preview Send</li>
                    <li>Check all details once more and then hit Send now</li>
                    <li>Repeat process for your USDC, via Base network again</li>
                    <ListFinish>Your wallet is now funded and ready to use!</ListFinish>
                </ol>
            </div>
            <NextButton title="Earn on Aave" target='/earn-on-aave'/>

            <Spacer/>
        </div>
    )
}