'use client'
import classes from './HamburgerButton.module.css';

const HamburgerButton = ({ isOpen, onClick }) => {
    return (
        <button 
            className={`${classes.hamburger} ${isOpen ? classes.open : ''}`}
            onClick={onClick}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
        >
            <span className={classes.line}></span>
            <span className={classes.line}></span>
            <span className={classes.line}></span>
        </button>
    );
};

export default HamburgerButton;

