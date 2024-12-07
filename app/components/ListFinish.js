import classes from '@/app/(pages)/Pages.module.css';

const ListFinish = ({children,style}) => {  
    return (
        <div className={classes.finish} style={style}>
            <img src="/images/ui/finish.png" alt="finish icon" className={`${classes.noteIcon} ${classes.invert}`}/>
            {children}
        </div>
    )
}

export default ListFinish;