'use client';
import classes from '@/app/(pages)/Pages.module.css';
import { useAccount, useEnsName } from 'wagmi';
import { base } from 'wagmi/chains';
//import { useBaseNames } from '@/app/_hooks/useBaseNames';

export default function GetAUsername() {
    const { address, isConnected } = useAccount();
    const result = useEnsName({
        address: address,
        chainId: base.id,
        universalResolverAddress: '0xc6d566a56a1aff6508b41f6c90ff131615583bcd',
    });
    console.log('result', result);
    console.log('name', result.data)

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/logos/base.png" alt="base logo" className={classes.titleImage} />
                Get a username
            </div>
            <div className={classes.intro}>
                <p>Register a Base username and make your address easy to remember</p>
            </div>
            <div className={classes.steps}>
                <ol>
                    <li>Connect your wallet</li>
                    <li>Click the "Get a username" button below</li>
                </ol>
            </div>
            
            {/* {isConnected && (
                <div>
                    {isLoading ? (
                        <p>Loading your Base name...</p>
                    ) : (
                        <p>Your Base name: {baseName || 'No Base name found'}</p>
                    )}
                </div>
            )} */}
        </div>
    );
}