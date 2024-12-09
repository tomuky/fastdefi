import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import PageTitle from '@/app/components/PageTitle';

export default function GetStarted() {
    return (
        <div className={classes.container}>

            <PageTitle title="Welcome" image="/images/ui/welcome-logo.png"/>

            <div className={classes.intro}>
                <p>Fast DeFi is a learn-by-trying tutorial.</p>
                <p>DeFi means decetralized finance.</p>
                <p>Let's first cover the must-knows!</p>
            </div>
            <NextButton title='The must-knows' target={'/must-knows'}/>
        </div>
    )
}