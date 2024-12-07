import classes from '@/app/(pages)/Pages.module.css';
import ListFinish from '@/app/components/ListFinish';
import ListNote from '@/app/components/ListNote';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';

export default function TrackWithZapper() {
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/logos/zapper-logo.png" alt="zapper logo" className={classes.titleImage} />
                Track with Zapper
            </div>
            <div className={classes.intro}>
                <p>Zapper demonstrates the magic of DeFi</p>
                <p>Simply connect your wallet and all your balances show up</p>
            </div>
            <div className={classes.steps}>
                <ol>
                    <li>Go to <a href='https://zapper.xyz' target='_blank'>Zapper.xyz</a></li>
                    <li>Click Connect Wallet in top right corner</li>
                    <li>See your token balances on the <a href='https://zapper.xyz/dashboard?tab=dashboard' target='_blank'>Zapper Dashboard</a></li>
                    <li>See your Aave and Uniswap positions on the <a href='https://zapper.xyz/dashboard?tab=apps' target='_blank'>Zapper Positions</a></li>
                    <ListNote>You didn't need to create an account, your money is on the blockchain</ListNote>
                    <ListFinish style={{marginTop: '20px'}}>Done. Zapper reads all your balances from the blockchain</ListFinish>
                </ol>
            </div>

            <NextButton title="Get a username" target='/get-a-username'/>

            <Spacer/>
        </div>
    )
}
