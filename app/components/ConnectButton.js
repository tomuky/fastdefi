import { useConnectModal } from "@rainbow-me/rainbowkit";
import classes from './ConnectButton.module.css';

const ConnectButton = () => {
    const { openConnectModal } = useConnectModal();
    return (
        <div className={classes.area}>
            <div className={classes.button} onClick={openConnectModal}>
                Connect Wallet
            </div>
        </div>
    )
}

export default ConnectButton;