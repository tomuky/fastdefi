'use client'
import classes from '@/app/(pages)/Pages.module.css';
import NextButton from '@/app/components/NextButton';
export default function GetStarted() {

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/ui/magic-2.png" alt="magic icon" className={classes.titleImage} />
                See the magic
            </div>
            <div className={classes.intro}>
                <p>Welcome to your first self-custodial wallet!</p>
            </div>
            <div className={classes.steps}>
                <ul>
                    <li>Funds in your Coinbase account are under Coinbase's control</li>
                    <li>Funds in your wallet are under your control alone</li>
                    
                </ul>
            </div>
            <NextButton title="Own your account" target='/own-your-account'/>
        </div>
    )
}