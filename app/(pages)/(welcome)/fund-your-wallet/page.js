'use client'
import classes from '@/app/(pages)/Pages.module.css';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';
import { useAccount } from 'wagmi';

export default function GetStarted() {
    const { address, isConnected } = useAccount();

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/logos/coinbase-wallet-logo.png" alt="coinbase logo" className={classes.titleImage} />
                Fund your wallet
            </div>
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
                    <li>Click on "To" field and select Base network</li>
                    <div className={classes.note}>
                        <img src="/images/ui/caution.png" alt="info icon" className={classes.noteIcon}/>
                        Be sure to choose Base network
                    </div>
                    <li>Paste in your wallet address and click Preview Send</li>
                    <li>Check all details once more and then hit Send now</li>
                    <li>Repeat process for your USDC, via Base network again</li>
                </ol>
                <p>Your wallet is now funded and ready to use!</p>
            </div>
            <NextButton title="Earn on Aave" target='/earn-on-aave'/>

            <Spacer/>
        </div>
    )
}