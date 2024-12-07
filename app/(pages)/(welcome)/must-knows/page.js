import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import Spacer from '@/app/components/Spacer';

export default function GetStarted() {
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/ui/exclamation.png" alt="info icon" className={classes.titleImage} />
                Must-Knows
            </div>
            <div className={classes.intro}>
                <p>Just a few things you absolutely need to know</p>
            </div>
            <div className={classes.steps}>
                <ul>
                    <li>Try things with small amounts of money before going bigger</li>
                    <li>Never ever share your seed phrase with anyone, ever</li>
                    <li>Save your seed phrase in a safe place</li>
                    <li>Double and triple check an address when sending crypto to it</li>
                    <li>You need ETH (Ether) as gas to pay for transactions</li>
                    <li>Don't confuse your Coinbase.com account with your Coinbase Wallet</li>
                </ul>
            </div>
            <NextButton title="Create a wallet" target='/create-a-wallet'/>

            <Spacer/>
        </div>
    )
}