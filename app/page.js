'use client'
import classes from './Home.module.css';
import Image from 'next/image';
import { BlackCreateWalletButton } from './components/BlackCreateWalletButton';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      router.push('/hello');
    }
  }, [isConnected, router]);

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
