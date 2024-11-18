'use client'
import classes from './Account.module.css';
import { useAccount, useEnsName } from 'wagmi';
import { ConnectButton, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';
import { useTokenPrice } from '../_hooks/useTokenPrice';

const Account = () => {
    const { isConnected, isDisconnected, isConnecting, isReconnecting, address, chain } = useAccount();
    const { data: ensName, isLoading } = useEnsName({
        address: address,
        chainId: 1, // Always query mainnet for ENS
    });
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();

    const usdcToken = useTokenPrice('0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',address,2);
    const ethToken = useTokenPrice('',address,4);

    return (
        <div className={classes.accountArea}>
            { isConnecting && <>Connecting...</>}
            { isReconnecting && <>Reconnecting...</>}
            { isDisconnected && <ConnectButton showBalance={false} /> }
            { isConnected && (
                <>
                    <div className={classes.addressArea} onClick={openAccountModal}>
                        <div className={classes.addressLabel}>
                            <img src="/images/ui/user.png" alt="User" className={classes.accountImage} />
                            Address
                        </div>
                        <span className={classes.address}>
                            {ensName || `${address.slice(0, 5)}...${address.slice(-4)}`}
                        </span>
                    </div>
                    <div className={classes.chainArea} onClick={openChainModal}>
                        <div className={classes.chainLabel}>
                            <img src="/images/ui/flash.png" alt="Network" className={classes.accountImage} />
                            Network
                        </div>
                        <span>
                            {chain && chain.name}
                            {!chain && 'Wrong network'}
                        </span>
                    </div>
                    <div className={classes.balanceArea}>
                        <div className={classes.walletArea}>
                            <div className={classes.walletLabel}>
                                <img src="/images/ui/wallet.png" alt="Wallet" className={classes.accountImage} />
                                Wallet
                            </div>
                        </div>
                        <table className={classes.tokens}>
                            <thead>
                                <tr>
                                    <th>Token</th><th>Balance</th><th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={classes.tokenName}>
                                            <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png" alt="ETH" className={classes.tokenImage} />
                                            ETH
                                        </div>
                                    </td>
                                    <td>
                                        { ethToken?.data?.userFormattedBalance || '0' }
                                    </td>
                                    <td>
                                        { ethToken?.data?.userFormattedValue || '$0.00' }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={classes.tokenName}>
                                            <img src="https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png" alt="USDC" className={classes.tokenImage} />
                                            USDC
                                        </div>
                                    </td>
                                    <td>
                                        { usdcToken?.data?.userFormattedBalance || '0' }
                                    </td>
                                    <td>
                                        { usdcToken?.data?.userFormattedValue || '$0.00' }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}

export default Account;