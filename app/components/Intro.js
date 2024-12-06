import classes from '@/app/(pages)/Pages.module.css';

const Intro = ({children}) => {
    return (
        <div className={classes.intro}>
            {children}
        </div>
    )
}

export default Intro;