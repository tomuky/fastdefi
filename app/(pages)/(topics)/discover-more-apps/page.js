'use client';
import classes from '@/app/(pages)/Pages.module.css';
import ListNote from '@/app/components/ListNote';
import ListFinish from '@/app/components/ListFinish';
import NextButton from '@/app/components/NextButton';
import Spacer from '@/app/components/Spacer';

export default function GetAUsername() {

    return (
        <div className={classes.container}>

            <div className={classes.title}>
                <img src="/images/ui/blockchain.png" alt="blockchain logo" className={classes.titleImage} />
                Discover more apps
            </div>

            <div className={classes.intro}>
                <p>Explore the ecosystem of apps on Base</p>
            </div>

            <div className={classes.steps}>
                <ol>
                    <li>Go to <a href="https://www.base.org/ecosystem" target="_blank" rel="noopener noreferrer">base.org/ecosystem</a></li>
                    <li>You can filter by category, or just scroll through the list</li>
                    <li>Let us know what app we should cover here next!</li>
                </ol>
            </div>

            <Spacer/>

        </div>
    );
}