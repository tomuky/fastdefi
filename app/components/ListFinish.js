import classes from '@/app/(pages)/Pages.module.css';

const ListFinish = ({children}) => {  
    return (
        <div className={classes.finish}>
            <img src="/images/ui/finish.png" alt="finish icon" className={`${classes.noteIcon} ${classes.invert}`}/>
            {children}
        </div>
    )
}

export default ListFinish;