import classes from './Sidebar.module.css';

const SidebarLinkGroup = ({children}) => {
    return (
        <div className={classes.linksGroup}>
            {children}
        </div>
    )
}

export default SidebarLinkGroup;