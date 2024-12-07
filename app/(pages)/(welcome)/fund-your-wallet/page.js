'use client'
import classes from '@/app/(pages)/Pages.module.css';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';

export default function GetStarted() {

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
                    <li>On this page, click Connect Wallet to connect your wallet</li>
                    <div className={classes.note}>
                        <img src="/images/ui/info-icon.png" alt="info icon" className={classes.noteIcon}/>
                        Connect your wallet to make things easier in these tutorials
                    </div>
                    <li>Copy your wallet address by clicking the Address button</li>
                    <li>In Coinbase.com, click on Send Crypto</li>
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