import classes from '@/app/(pages)/Pages.module.css';
import Image from 'next/image';

const ListFinish = ({children,style}) => {  
    return (
        <div className={classes.finish} style={style}>
            <Image 
                src="/images/ui/finish.png" 
                alt="finish icon" 
                width={20}
                height={20}
                className={`${classes.noteIcon}`}
            />
            {children}
        </div>
    )
}

export default ListFinish;