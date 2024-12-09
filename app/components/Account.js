'use client'
import classes from './Account.module.css';
import { useAccount, useSwitchChain } from 'wagmi';
import AccountAddress from './AccountAddress';
import { BlackCreateWalletButton } from './BlackCreateWalletButton';
import { useChainId } from 'wagmi';
const Account = () => {
    const { isConnected, isDisconnected, isConnecting, isReconnecting } = useAccount();
    const { switchChain, isPending: isSwitchingChain } = useSwitchChain();
    const chainId = useChainId();

    return (
        <div className={classes.accountArea}>
            {(isConnecting || isReconnecting) && <><div style={{color:'rgba(255,255,255,.3)',marginBottom:'10px'}}>Connecting...</div></>}
            {isDisconnected && <BlackCreateWalletButton/>}
            {isConnected && <AccountAddress/> }
            { (isConnected && chainId !== 8453) && (
                <button 
                    onClick={() => switchChain({ chainId: 8453 })}
                    className={classes.switchButton}
                    disabled={isSwitchingChain}
            >
                {isSwitchingChain ? 'Switching...' : 'Switch to Base Network'}
            </button>
            )}
        </div>
    )
}

export default Account;