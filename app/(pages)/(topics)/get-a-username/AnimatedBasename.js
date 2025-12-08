import classes from './AnimatedBasename.module.css';

const AnimatedBasename = ({ children }) => {
    return <span className={classes.shimmer}>{children}</span>;
};

export default AnimatedBasename;
