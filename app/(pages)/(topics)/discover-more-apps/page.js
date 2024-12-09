'use client';
import classes from '@/app/(pages)/Pages.module.css';
import Spacer from '@/app/components/Spacer';
import Image from 'next/image';
import PageTitle from '@/app/components/PageTitle';

export default function DiscoverMoreApps() {

    return (
        <div className={classes.container}>

            <PageTitle title="Discover more apps" image="/images/ui/blockchain.png"/>
            
            <div className={classes.intro}>
                <p>Explore the Base ecosystem of apps</p>
            </div>

            <div className={classes.steps}>
                <ol>
                    <li>Go to <a href="https://www.base.org/ecosystem" target="_blank" rel="noopener noreferrer">base.org/ecosystem</a></li>
                    <li>You can filter by category, or just scroll through the list</li>
                    <li>Let us know what app we should cover here next!</li>
                </ol>
                <p>Connect with us: <a href="https://x.com/fastdefi" target="_blank" rel="noopener noreferrer">x.com/fastdefi</a></p>
            </div>

            <Spacer/>

        </div>
    );
}