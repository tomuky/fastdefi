'use client'
import { useRouter } from 'next/navigation';
import classes from './NextButton.module.css';

const NextButton = ({title,target}) => {
    
    const router = useRouter();

    return (
        <div className={classes.button} onClick={()=>router.push(target)}>
            <img src="/images/ui/right-arrow.png" alt="right arrow" className={`${classes.icon} ${classes.invert}`}/>
            {title}
        </div>
    )
}

export default NextButton;