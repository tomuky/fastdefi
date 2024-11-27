'use client'
import { useRouter } from 'next/navigation';
import classes from './Button.module.css';

const Button = ({title,target,style}) => {
    
    const router = useRouter();

    return (
        <div style={style} className={classes.button} onClick={()=>router.push(target)}>
            {title}
        </div>
    )
}

export default Button;