'use client'
import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import Spacer from '@/app/components/Spacer';
import { useAccount, useBalance } from 'wagmi';
import PageTitle from '@/app/components/PageTitle';
import ListIcon from '@/app/components/ListIcon';

export default function CreateAWalletPage() {
    const { address } = useAccount();
    const { data, isError, isLoading } = useBalance({
        address: address,
        chainId: 8453, 
    });

    console.log('data', data);

    return (
        <div className={classes.container}>
            
            <PageTitle title="Create a wallet" image="/images/logos/coinbase-wallet-logo.png"/>

            <div className={classes.intro}>
                <p>Create a wallet in seconds with Coinbase Smart Wallet</p>
            </div>
            <div className={classes.steps}>
                <ol>
                    <li>Click on Create Wallet on this page</li>
                    <li>Done! Your wallet passkeys are stored on your device or browser</li>
                    <ListIcon type='caution'>
                        Eventually you need to set up <a href="https://keys.coinbase.com/settings/account-recovery" target="_blank">Account Recovery</a> so you can recover your wallet if you lose a device
                    </ListIcon>
                </ol>
            </div>

            <div className={classes.closer}>
                <p>Now we need to get some ETH and USDC on Coinbase</p>
            </div>

            <NextButton title="Get Coinbase" target='/get-coinbase'/>

            <Spacer/>
        </div>
    )
}