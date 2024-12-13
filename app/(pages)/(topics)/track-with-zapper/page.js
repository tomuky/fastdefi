import classes from '@/app/(pages)/Pages.module.css';
import ListFinish from '@/app/components/ListFinish';
import ListNote from '@/app/components/ListNote';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';
import PageTitle from '@/app/components/PageTitle';

export default function TrackWithZapper() {
    return (
        <div className={classes.container}>
            <PageTitle title="Track with Zapper" image="/images/logos/zapper-logo.png"/>
            <div className={classes.intro}>
                <p>Demonstrates the magic of DeFi</p>
                <p>Simply connect your wallet and all your balances show up</p>
            </div>
            <div className={classes.steps}>
                <ol>
                    <li>Go to <a href='https://zapper.xyz' target='_blank'>Zapper.xyz</a></li>
                    <li>Click Connect Wallet in top right corner</li>
                    <li>See your token balances on the <a href='https://zapper.xyz/dashboard?tab=dashboard' target='_blank'>Zapper Dashboard</a></li>
                    <li>See your Aave and Uniswap positions on the <a href='https://zapper.xyz/dashboard?tab=apps' target='_blank'>Zapper Positions</a></li>
                    <ListNote>No need to create an account</ListNote>
                    <ListNote style={{marginTop: '20px'}}>Zapper reads your balances from the blockchain</ListNote>
                    <ListFinish style={{marginTop: '20px'}}>Done. Bookmark your Zapper dashboard for easy tracking</ListFinish>
                </ol>
            </div>

            <NextButton title="Use Basescan" target='/use-basescan'/>

            <Spacer/>
        </div>
    )
}
