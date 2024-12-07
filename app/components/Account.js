'use client'
import classes from './Account.module.css';
import { useAccount } from 'wagmi';
import AccountChain from './AccountChain';
import AccountAddress from './AccountAddress';
import { BlackCreateWalletButton } from './BlackCreateWalletButton';

const Account = () => {
    const { isConnected, isDisconnected, isConnecting, isReconnecting } = useAccount();
    

    return (
        <div className={classes.accountArea}>
            { (isConnecting||isReconnecting) && <><div style={{color:'rgba(255,255,255,.3)',marginBottom:'10px'}}>Connecting...</div></>}
            { isDisconnected && <BlackCreateWalletButton/> }
            { isConnected && (
                <>
                    <AccountAddress/>
                    <AccountChain/>
                </>
            )}
        </div>
    )
}

export default Account;