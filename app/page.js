'use client'
import classes from './Home.module.css';
import Image from 'next/image';
import { BlackCreateWalletButton } from './components/BlackCreateWalletButton';
import NextButton from '@/app/components/NextButton';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();

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

        { !isConnected ? (
          <>
            <BlackCreateWalletButton 
              style={{marginTop: '10px',padding: '14px 36px'}}
              title='Create Wallet' 
            />
            <Link 
              href="/set-up-wallet" 
              className={classes.subtleLink}
              style={{
                marginTop: '20px',
                opacity: '0.4',
                fontSize: '0.9rem',
                textDecoration: 'underline'
              }}
            >
              Look around first
            </Link>
          </>
        ) : (
          <NextButton
            title='Try DeFi' 
            target='/set-up-wallet'
          />
        )}

      </div>
    </div>
  );
}
