'use client';
import classes from '@/app/(pages)/Pages.module.css';

export default function Tabs({ tabs, activeTab, onTabChange, className }) {
    const getTabIndex = (tab) => tabs.indexOf(tab);

    return (
        <div 
            className={`${classes.tabs} ${className || ''}`}
            style={{ '--tab-index': getTabIndex(activeTab) }}
        >
            {tabs.map(tab => (
                <button 
                    key={tab}
                    className={`${classes.tab} ${activeTab === tab ? classes.activeTab : ''}`}
                    onClick={() => onTabChange(tab)}>
                        {tab.length <= 3 ? tab.toUpperCase() : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
}