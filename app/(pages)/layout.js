'use client';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import classes from './layout.module.css';
import { useState } from 'react';
export default function PagesLayout({ children }) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    }

    return (
        <div className={classes.container}>
            <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}