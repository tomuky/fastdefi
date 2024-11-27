import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';

export default function GetStarted() {
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/ui/welcome-logo.png" alt="welcome logo" className={classes.titleImage} />
                Welcome
            </div>
            <div className={classes.intro}>
                <p>Fast DeFi is a learn-by-trying tutorial.</p>
                <p>DeFi means decetralized finance.</p>
                <p>Let's first cover the must-knows!</p>
            </div>
            <NextButton title='The must-knows' target={'/must-knows'}/>
        </div>
    )
}