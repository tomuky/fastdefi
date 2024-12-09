'use client'
import { useRouter } from 'next/navigation';
import classes from './NextButton.module.css';
import Image from 'next/image';

const NextButton = ({title,target}) => {
    
    const router = useRouter();

    return (
        <div className={classes.button} onClick={()=>router.push(target)}>
            <Image src="/images/ui/right-arrow.png" alt="right arrow" className={`${classes.icon} ${classes.invert}`} width={20} height={20} />
            {`Next: ${title}`}
        </div>
    )
}

export default NextButton;