'use client';
import classes from './Sidebar.module.css';
import { useRouter } from "next/navigation";

const SidebarTitle = () => {
    const router = useRouter();

    return (
        <div className={classes.title} onClick={()=>router.push('/')}>
            <img src="/images/fdt.png" alt="Fast DeFi Tutorial" className={classes.titleImage} />
            Fast DeFi
        </div>
    )
}

export default SidebarTitle;