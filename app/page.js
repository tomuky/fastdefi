import classes from './Home.module.css';
import Button from "./components/Button";

export default function Home() {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.title}>
          <img src="/images/fdt.png" alt="Fast DeFi Tutorial" className={classes.titleImage} />
          Fast DeFi
        </div>
        <div className={classes.intro}>
          <p>Do things with money on the blockchain.</p>
          <p>Learn by trying.</p>
        </div>

        <Button 
          title='Get started' 
          style={{marginTop:'20px'}}
          target={'/get-started'}
        />

      </div>
    </div>
  );
}
