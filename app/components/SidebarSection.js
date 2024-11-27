import classes from './Sidebar.module.css';
import { useRouter, usePathname } from 'next/navigation';
import NumberIcon from './NumberIcon';
import { useState, useEffect } from 'react';

const SidebarSection = ({paths,completed, toggleSidebar}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [show, setShow] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);

    const handleTouchStart = () => setIsSwiping(false);
    const handleTouchMove = () => setIsSwiping(true);

    const handleClick = (path) => {
        if (!isSwiping) {
            toggleSidebar(false);
            router.push(path);
        }
    };

    useEffect(() => {
        // Show steps if we're on any of the paths or if not completed
        const isOnPath = paths.some(p => p.path === pathname);
        setShow(isOnPath || !completed);
    }, [pathname, paths, completed]);

    return (
        <div className={classes.stepsArea}>
            <div 
                className={`${classes.step} ${completed && !show ? classes.completedStep : ''} ${pathname === paths[0].path ? classes.stepActive :''}`}
                onClick={() => handleClick(paths[0].path)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                {paths[0].icon && <img className={classes.icon} src={paths[0].icon} alt={paths[0].title}/>}
                <span>{paths[0].title}</span>
                {completed && <img className={classes.completedIcon} src="/images/ui/check-mark.png" alt="completed"/>}
            </div>
            {show && (
                <>
                    {
                        paths.filter(p=>p.role!=='header').map((p,i)=>(
                            <div 
                                key={`sw_${i}`} 
                                className={`${classes.indentStep} ${classes.step} ${pathname === p.path ? classes.stepActive :''}`}
                                onClick={() => handleClick(p.path)}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                            >
                                <NumberIcon n={i+1}/>
                                <span>{p.title}</span>
                            </div>
                        ))
                    }
                </>
            )}
            
        </div>
    )
}

export default SidebarSection;