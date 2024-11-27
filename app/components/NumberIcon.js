import classes from './NumberIcon.module.css';

const NumberIcon = ({n}) => {
    return (
        <div className={classes.number}>
            {n}
        </div>
    )
}

export default NumberIcon;