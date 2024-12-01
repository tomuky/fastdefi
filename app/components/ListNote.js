import classes from '@/app/(pages)/Pages.module.css';

const ListNote = ({children}) => {  
    return (
        <div className={classes.note}>
            <img src="/images/ui/info-icon.png" alt="info icon" className={classes.noteIcon}/>
            {children}
        </div>
    )
}

export default ListNote;