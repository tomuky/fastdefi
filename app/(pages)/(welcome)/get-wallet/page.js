import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';

export default function GetStarted() {
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/ui/wallet-brown.png" alt="wallet icon" className={classes.titleImage}/>
                Get a wallet
            </div>
            <div className={classes.intro}>
                <p>Coinbase Wallet is a great option for your first wallet</p>
            </div>
            <div className={classes.steps}>
                <ol>
                    <li>Go to <a href='https://www.coinbase.com/wallet' target='_blank'>coinbase.com/wallet</a> and download the mobile app</li>
                    <li>Follow the onscreen instructions for creating a new wallet</li>
                    <li>Go back to <a href='https://www.coinbase.com/wallet' target='_blank'>coinbase.com/wallet</a> and install the Chrome extension</li>
                    <li>Load existing wallet from previous step by entering its recovery phrase</li>
                    <li>Click on the copy button near top of wallet to get your wallet address</li>
                    <div className={classes.note}>
                        <img src="/images/ui/info-icon.png" alt="info icon" className={classes.noteIcon}/>
                        Don't confuse Coinbase Wallet with Coinbase.com
                    </div>
                </ol>
            </div>

            <NextButton title="Get Coinbase" target='/get-coinbase'/>
        </div>
    )
}