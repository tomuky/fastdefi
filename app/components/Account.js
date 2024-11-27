'use client'
import classes from './Account.module.css';
import { useAccount } from 'wagmi';
import ConnectButton from './ConnectButton';
import AccountWallet from './AccountWallet';
import AccountChain from './AccountChain';
import AccountAddress from './AccountAddress';

const Account = () => {
    const { isConnected, isDisconnected, isConnecting, isReconnecting } = useAccount();
    

    return (
        <div className={classes.accountArea}>
            { (isConnecting||isReconnecting) && <><div style={{color:'rgba(255,255,255,.3)'}}>Connecting...</div></>}
            { isDisconnected && <ConnectButton/> }
            { isConnected && (
                <>
                    <AccountAddress/>
                    <AccountChain/>
                    {/* <AccountWallet/> */}
                </>
            )}
        </div>
    )
}

export default Account;