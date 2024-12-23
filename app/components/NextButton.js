'use client'
import { useRouter } from 'next/navigation';
import classes from './NextButton.module.css';
import Image from 'next/image';

const NextButton = ({title,target,type='big',setActiveTab,targetTab}) => {
    
    const router = useRouter();

    // Helper function to handle click only when target is provided
    const handleClick = target ? () => router.push(target) : undefined;

    if (type === 'big') {
        return (
            <div className={classes.button} onClick={handleClick}>
                <Image src="/images/ui/right-arrow.png" alt="right arrow" className={`${classes.icon} ${classes.invert}`} width={20} height={20} />
                {`Next: ${title}`}
            </div>
        )
    }
    if (type === 'tab') {
        return (
            <div className={classes.smallButton} onClick={()=>setActiveTab(targetTab)}>
                {title}
            </div>
        )
    }
}

export default NextButton;