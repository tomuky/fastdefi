import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import PageTitle from '@/app/components/PageTitle';

export default function HelloPage() {
    return (
        <div className={classes.container}>

            <PageTitle title="Hello" image="/images/ui/welcome-logo.png"/>

            <div className={classes.intro}>
                <p>Fast DeFi is a learn-by-trying tutorial.</p>
                <p>DeFi means decentralized finance.</p>
                <p>There are things you must know!</p>
            </div>
            <NextButton title='The must-knows' target={'/must-knows'}/>
        </div>
    )
}