import classes from '@/app/(pages)/Pages.module.css';

const Steps = ({children}) => {
    return (
        <div className={classes.steps}>
            {children}
        </div>
    )
}

export default Steps;