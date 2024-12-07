'use client';
import classes from '@/app/(pages)/Pages.module.css';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { getBasename } from '@/app/_apis/basenames';
import ListNote from '@/app/components/ListNote';
import ListFinish from '@/app/components/ListFinish';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';

export default function UseBasescan() {

    const { address, isConnected } = useAccount();
    const [basename, setBasename] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!isConnected) return;
            const fetchedBasename = await getBasename(address);
            setBasename(fetchedBasename);
        }
        fetchData();
    }, [address, isConnected]);

    return (
        <div className={classes.container}>

            <div className={classes.title}>
                <img src="/images/logos/basescan-logo.png" alt="basescan logo" className={classes.titleImage} />
                Use Basescan
            </div>

            <div className={classes.intro}>
                <p>Basescan is a block explorer for the Base network</p>
                <p>See more info about transactions, addresses, and more</p>
            </div>

            <div className={classes.steps}>
                <ol>
                    <li>Go to <a href="https://basescan.org" target="_blank" rel="noopener noreferrer">Basescan.org</a> and search your address</li>
                    {basename && (
                        <ListNote>
                            You can use your Base username: <a href={`https://basescan.org/address/${basename}`} target="_blank" rel="noopener noreferrer">{basename}</a>
                        </ListNote>
                    )}
                    <li>Find your address as the Resolved Address you can click on</li>
                    <li>See a list of all your transactions you've made on the Base network</li>
                    <li>Click into a couple and see if you can decipher the details</li>
                    <ListFinish>Done. Basescan is a powerful tool for seeing what transactions are doing</ListFinish>
                </ol>
            </div>

            <NextButton title="Discover more apps" target='/discover-more-apps'/>

            <Spacer/>
        </div>
    );
}