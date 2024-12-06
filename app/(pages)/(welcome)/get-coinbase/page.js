'use client'
import classes from '@/app/(pages)/Pages.module.css';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';

export default function GetStarted() {
    const {address, isConnected} = useAccount();
    const { openConnectModal } = useConnectModal();

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/logos/coinbase-logo.png" alt="coinbase logo" className={classes.titleImage} />
                Get Coinbase
            </div>
            <div className={classes.intro}>
                <p>Coinbase is a great way to onramp money into crypto</p>
            </div>
            <div className={classes.steps}>
                <ol>
                    <li>Go to <a href='https://coinbase.com/join/6A22LF6?src=referral-link' target='_blank'>coinbase.com</a> and signup for an account</li>
                    <li>Go to My Assets page and click on Deposit Cash</li>
                    <li>Add payment method if needed, a bank account is best</li>
                    <li>Deposit $100 (or whatever you want) and click to continue</li>
                    <div className={classes.note}>
                        <img src="/images/ui/info-icon.png" alt="info icon" className={classes.noteIcon}/>
                        Takes about 4 days to clear your bank
                    </div>
                    <li>Once clear, use half to buy ETH and other half to buy USDC</li>
                </ol>
            </div>
            <NextButton title="Fund your wallet" target='/fund-your-wallet'/>

            <Spacer/>
        </div>
    )
}