'use client'
import NextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import Spacer from '@/app/components/Spacer';
import { useAccount } from 'wagmi';
import { useBalance } from 'wagmi';

export default function CreateAWallet() {
    const { address } = useAccount();
    const { data, isError, isLoading } = useBalance({
        address: address,
        chainId: 8453, 
    });

    console.log('data', data);

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/logos/coinbase-wallet-logo.png" alt="coinbase wallet icon" className={classes.titleImage}/>
                Create a wallet
            </div>
            <div className={classes.intro}>
                <p>Create a wallet in seconds with Coinbase Smart Wallet</p>
            </div>
            <div className={classes.steps}>
                <ul>
                    <li>Click on Create Wallet on this page</li>
                    <li>Done! Get your wallet address by clicking the address</li>
                    <div className={classes.note} style={{marginLeft: '-24px'}}>
                        <img src="/images/ui/caution.png" alt="info icon" className={classes.noteIcon}/>
                        You should eventually add Account Recovery for better security
                    </div>
                    {Number(data?.value) === 0 && (
                        <>
                            <li>You need some ETH in your wallet first</li>
                            <li>Go get a <a href='/get-coinbase'>coinbase.com account</a> to buy some ETH</li>
                        </>
                    )}
                    {Number(data?.value) > 0 && (
                        <>
                            <li>Go to <a href='https://wallet.coinbase.com/' target='_blank'>wallet.coinbase.com</a></li>
                            <li>Click on the gears icon</li>
                            <li>Click Settings for your Smart Wallet</li>
                            <li>Click on Generate Recovery key</li>
                        </>
                    )}
                </ul>
            </div>
            

            <NextButton title="Get Coinbase" target='/get-coinbase'/>

            <Spacer/>
        </div>
    )
}