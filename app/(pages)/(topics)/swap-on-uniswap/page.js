'use client';
import NextNextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';

export default function SaveWithAave() {

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/logos/uniswap-logo.png" alt="uniswap logo" className={classes.titleImage} />
                Swap on Uniswap
            </div>
            <div className={classes.intro}>
                <p>Swap tokens directly from your wallet</p>
            </div>
            <div className={classes.steps}>
                <ol>
                    
                </ol>
            </div>

            

            {/* <NextNextButton title="Get a wallet" target='/get-wallet'/> */}
        </div>
    )
}