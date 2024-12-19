import classes from '@/app/(pages)/Pages.module.css';
import Image from 'next/image';

const ListRemember = ({children, style}) => {  
    return (
        <div className={classes.note} style={style}>
            <Image 
                src="/images/ui/push-pin.png" 
                alt="push pin" 
                className={classes.noteIcon}
                width={24}
                height={24}
            />
            <span>{children}</span>
        </div>
    )
}

export default ListRemember;