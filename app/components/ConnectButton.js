import classes from './ConnectButton.module.css';

const ConnectButton = () => {
    return (
        <div className={classes.area}>
            <div className={classes.button} onClick={''}>
                Connect Wallet
            </div>
        </div>
    )
}

export default ConnectButton;