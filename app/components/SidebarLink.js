import classes from './Sidebar.module.css';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

const SidebarLink = ({title, path, icon, completed, toggleSidebar}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isSwiping, setIsSwiping] = useState(false);

    const handleTouchStart = () => setIsSwiping(false);
    const handleTouchMove = () => setIsSwiping(true);

    const handleClick = (path) => {
        if (!isSwiping) {
            toggleSidebar(false);
            router.push(path);
        }
    };

    return (
        <div className={classes.stepsArea} style={{paddingBottom:'0px',paddingTop:'0px'}}>
            <div 
                className={`${classes.step} ${completed && !show ? classes.completedStep : ''} ${pathname === path ? classes.stepActive :''}`}
                onClick={() => handleClick(path)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                {icon && <img className={classes.icon} src={icon} alt={title}/>}
                <span>{title}</span>
                {completed && <img className={classes.completedIcon} src="/images/ui/check-mark.png" alt="completed"/>}
            </div>
        </div>
    )
}

export default SidebarLink;