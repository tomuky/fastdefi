'use client';
import classes from '@/app/(pages)/Pages.module.css';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { getBasename, getBasenameAvatar, getBasenameTextRecord, BasenameTextRecordKeys } from '@/app/_apis/basenames';
import ListNote from '@/app/components/ListNote';
import ListFinish from '@/app/components/ListFinish';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';

export default function GetAUsername() {
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
                <img src="/images/logos/base.png" alt="base logo" className={classes.titleImage} />
                Get a username
            </div>

            <div className={classes.intro}>
                <p>Claim a Base username like fastdefi.base.eth</p>
                <p>Makes your address easy to use</p>
            </div>

            <div className={classes.steps}>
                <ol>
                    <li>Go to <a href="https://base.org/names" target="_blank" rel="noopener noreferrer">Base.org/names</a> and click Connect</li>
                    <li>Use the search field to find an available username</li>
                    <li>Click on a result that you like</li>
                    <li>Make sure "Set as primary" is checked</li>
                    <ListNote>This allows your username to be used as your address</ListNote>
                    <li>Click Register Name and confirm the popup in your wallet</li>
                    {basename && <li>Complete more of your profile on <a href={`https://www.base.org/name/${basename}`} target="_blank" rel="noopener noreferrer">base.org/name/{basename}</a></li>}
                    {basename && <ListFinish>Done! Your new username on Base is {basename}</ListFinish>}
                </ol>
            </div>

            <NextButton title="Use Basescan" target='/use-basescan'/>

            <Spacer/>

        </div>
    );
}