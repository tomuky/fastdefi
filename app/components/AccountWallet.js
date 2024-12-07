'use client'
import { useTokenPrice } from '../_hooks/useTokenPrice';
import classes from './Account.module.css';
import { useAccount } from 'wagmi';
import { openChainModal, openAccountModal } from '@rainbow-me/rainbowkit';

const AccountWallet = () => {
    
    const { isConnected, isDisconnected, isConnecting, isReconnecting, address, chain } = useAccount();
    const usdcToken = useTokenPrice('0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',address,2);
    const ethToken = useTokenPrice('',address,4);

    return (
        <div className={classes.balanceArea}>
            <div className={classes.walletArea}>
                <div className={classes.walletLabel}>
                    <img src="/images/ui/wallet.png" alt="Wallet" className={classes.accountImage} />
                    Wallet
                </div>
                <div className={classes.chain} onClick={openChainModal}>
                    {chain && chain.name}
                    {!chain && 'Wrong network'}
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
    )
}

export default AccountWallet;