import classes from '../Pages.module.css';

export default function Test() {
    return (
        <div className={classes.container}>
            <div className={classes.titleArea}>
                <img src="/images/ui/play.png" alt="start icon" className={classes.titleImage} />
                Test Page
            </div>
        </div>
    )
}