import Sidebar from "../components/Sidebar";
import classes from './layout.module.css';

export default function PagesLayout({ children }) {
    return (
        <div className={classes.container}>
            <Sidebar/>
            {children}
        </div>
    )
}