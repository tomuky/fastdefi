'use client'
import classes from './Home.module.css';
import Image from 'next/image';
import { BlackCreateWalletButton } from './components/BlackCreateWalletButton';

export default function Home() {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.title}>
          <Image 
            src="/images/fdt.png" 
            alt="Fast DeFi Tutorial" 
            className={classes.titleImage}
            width={50}
            height={70}
          />
          Fast DeFi
        </div>
        <div className={classes.intro}>
          <p>Do things with money on the blockchain.</p>
          <p>Learn by trying.</p>
        </div>

        <BlackCreateWalletButton 
          style={{marginTop: '10px',padding: '14px 36px'}}
          title='Create Wallet' 
        />

      </div>
    </div>
  );
}
