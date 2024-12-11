import classes from './Home.module.css';
import Button from "./components/Button";
import Image from 'next/image';

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

        <Button 
          style={{marginTop: '30px',padding: '14px 36px'}}
          title='Start' 
          target={'/welcome'}
        />

      </div>
    </div>
  );
}
