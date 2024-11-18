'use client'
import { useRouter } from 'next/navigation';
import classes from './Button.module.css';

const Button = ({title,style,target}) => {
    
    const router = useRouter();

    return (
        <div 
            className={classes.button} 
            style={style}
            onClick={()=>router.push(target)}
        >
            {title}
        </div>
    )
}

export default Button;