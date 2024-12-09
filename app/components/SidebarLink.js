import classes from './Sidebar.module.css';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const SidebarLink = ({title, path, url, icon, completed, toggleSidebar}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isSwiping, setIsSwiping] = useState(false);

    const handleTouchStart = () => setIsSwiping(false);
    const handleTouchMove = () => setIsSwiping(true);

    const handleClick = (path, url) => {
        if (!isSwiping) {
            if (url) {
                window.open(url, '_blank');
            } else {
                toggleSidebar(false);
                router.push(path);
            }
        }
    };

    return (
        <div className={classes.stepsArea} style={{paddingBottom:'0px',paddingTop:'0px'}}>
            <div 
                className={`${classes.step} ${completed && !show ? classes.completedStep : ''} ${pathname === path ? classes.stepActive :''}`}
                onClick={() => handleClick(path, url)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                {icon && <Image className={classes.icon} src={icon} alt={title} width={20} height={20} />}
                <span>{title}</span>
                {completed && <Image className={classes.completedIcon} src="/images/ui/check-mark.png" alt="completed" width={20} height={20} />}
            </div>
        </div>
    )
}

export default SidebarLink;