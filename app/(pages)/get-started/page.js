import classes from '../Pages.module.css';

export default function GetStarted() {
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/ui/play.png" alt="start icon" className={classes.titleImage} />
                Get started
            </div>
            <div className={classes.intro}>
                <p>You need 2 things to get started</p>
            </div>
        </div>
    )
}