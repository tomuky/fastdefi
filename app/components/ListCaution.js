import classes from '@/app/(pages)/Pages.module.css';
import Image from 'next/image';

const ListCaution = ({children}) => {  
    return (
        <div className={classes.note}>
            <Image 
                src="/images/ui/caution.png" 
                alt="caution icon" 
                className={classes.noteIcon}
                width={24}
                height={24}
            />
            <span>{children}</span>
        </div>
    )
}

export default ListCaution;