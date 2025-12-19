import classes from './Home.module.css';
import Image from 'next/image';
import Link from 'next/link';

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

        <Link href="/set-up-wallet" className={classes.startButton}>
          Start
        </Link>

      </div>
    </div>
  );
}
