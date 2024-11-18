'use client'
import { useRouter } from 'next/navigation';
import classes from './Sidebar.module.css';
import Account from './Account';

const Sidebar = () => {
    const router = useRouter();

    return (
        <div className={classes.sidebarArea}>

            <div className={classes.title} onClick={()=>router.push('/')}>
                <img src="/images/fdt.png" alt="Fast DeFi Tutorial" className={classes.titleImage} />
                Fast DeFi
            </div>

            <div className={classes.titleDivider}/>

            <Account/>

            <div className={classes.titleDivider}/>

            <div className={classes.pagesArea} onClick={()=>router.push('/get-started')}>
                <div className={classes.page}>
                    <img src="/images/ui/play.png" alt="start icon" className={classes.icon}/>
                    Get Started
                </div>
            </div>

            <div className={classes.pagesArea} onClick={()=>router.push('/test')}>
                <div className={classes.page}>
                    <img src="/images/ui/play.png" alt="start icon" className={classes.icon}/>
                    Test Page
                </div>
            </div>

        </div>
    )
}

export default Sidebar;