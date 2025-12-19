'use client'
import classes from './FooterMobile.module.css';
import Image from 'next/image';

const FooterMobile = ({message, onClick, isNextTopic}) => {
    return (
        <div className={classes.footer}>
            <div 
                className={`${classes.button} ${isNextTopic ? classes.nextTopic : ''}`} 
                onClick={onClick}
            >
                <span>{message}</span>
                <Image src="/images/ui/right-arrow.png" alt="right arrow" className={classes.icon} width={20} height={20} />
            </div>
        </div>
    )
}

export default FooterMobile;