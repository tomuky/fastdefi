'use client'
import classes from '@/app/(pages)/Pages.module.css';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';
import PageTitle from '@/app/components/PageTitle';
import ListNote from '@/app/components/ListNote';

export default function CoinbasePage() {

    return (
        <div className={classes.container}>
            
            <PageTitle title="Get Coinbase" image="/images/logos/coinbase-logo.png"/>

            <div className={classes.intro}>
                <p>Coinbase is a great way to onramp money into crypto</p>
            </div>
            <div className={classes.steps}>
                <ol>
                    <li>Go to <a href='https://coinbase.com/join/6A22LF6?src=referral-link' target='_blank'>coinbase.com</a> and signup</li>
                    <li>Go to My Assets page and click on Deposit Cash</li>
                    <li>Add payment method if needed, a bank account is best</li>
                    <li>Deposit $100 (or any amount you want) and click to continue</li>
                    <ListNote>Takes ~4 days to clear your bank (blame your bank)</ListNote>
                    <li>Once clear, use half to buy ETH and other half to buy USDC</li>
                </ol>
            </div>

            <div className={classes.closer}>
                <p>Now let&apos;s send some ETH to your wallet</p>
            </div>

            <NextButton title="Fund your wallet" target='/fund-your-wallet'/>

            <Spacer/>
        </div>
    )
}