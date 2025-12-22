'use client'
import { useState } from 'react';
import classes from './Footer.module.css';
import Image from 'next/image';

const Footer = ({message, onClick, isNextTopic}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        if (isNextTopic && !isLoading) {
            setIsLoading(true);
        }
        onClick?.();
    };

    return (
        <div className={`${classes.footer} ${isLoading ? classes.loading : ''}`}>
            <div 
                className={`${classes.button} ${isNextTopic ? classes.nextTopic : ''}`} 
                onClick={handleClick}
            >
                <span>{message}</span>
                <Image src="/images/ui/right-arrow.png" alt="right arrow" className={classes.icon} width={20} height={20} />
            </div>
        </div>
    )
}

export default Footer;

