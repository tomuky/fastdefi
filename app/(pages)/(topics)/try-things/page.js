import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';

export default function TryThings(){
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/ui/magic-2.png" alt="magic icon" className={classes.titleImage}/>
                Try things
            </div>
            <div className={classes.intro}>
                <p>With your wallet set up and funded, you can start trying things</p>
            </div>
            <div className={classes.steps}>
                <ul>
                    <li>We'll be trying things on the Base network</li>
                    <li>Base network is an Layer 2 network built on Ethereum</li>
                    <li>This unlocks fast and cheap transactions for Ethereum</li>
                </ul>
            </div>

            <NextButton title="Next: Save with Aave" target='/save-with-aave'/>
        </div>
    )
}