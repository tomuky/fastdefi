'use client';
import classes from './Sidebar.module.css';
import { useRouter } from "next/navigation";
import Image from 'next/image';

const SidebarTitle = () => {
    const router = useRouter();

    return (
        <div className={classes.title} onClick={()=>router.push('/')}>
            <Image src="/images/fdt.png" alt="Fast DeFi Tutorial" className={classes.titleImage} width={26} height={26} />
            Fast DeFi
        </div>
    )
}

export default SidebarTitle;