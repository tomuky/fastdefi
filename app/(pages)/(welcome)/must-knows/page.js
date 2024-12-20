'use client'
import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import Spacer from '@/app/components/Spacer';
import PageTitle from '@/app/components/PageTitle';
import { useAccount } from 'wagmi';

export default function GetStarted() {
    const { isConnected } = useAccount();

    return (
        <div className={classes.container}>

            <PageTitle title="Must-Knows" image="/images/ui/exclamation.png"/>

            <div className={classes.intro}>
                <p>Some things you really need to know</p>
            </div>
            <div className={classes.steps}>
                <ul>
                    <li>Try things with small amounts of money before going bigger</li>
                    <li>Never share your private seed phrase with anyone, ever</li>
                    <li>Double and triple check an address when sending crypto to it</li>
                    <li>You need ETH (Ether) as gas to pay for transactions</li>
                    <li>Don&apos;t confuse your Coinbase.com account with your Coinbase Wallet</li>
                    <li>We&apos;ll be using the Base network for cheaper transactions</li>
                </ul>
            </div>

            {isConnected ? (
                <NextButton title="Get Coinbase" target='/get-coinbase'/>
            ) : (
                <NextButton title="Create a wallet" target='/create-a-wallet'/>
            )}

            <Spacer/>
        </div>
    )
}