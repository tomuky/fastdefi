'use client';
import classes from '@/app/(pages)/Pages.module.css';

const ACRONYMS = ['faq'];

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
                        {ACRONYMS.includes(tab) 
                            ? tab.toUpperCase() 
                            : tab.split(/[\s-_]/)
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')}
                </button>
            ))}
        </div>
    );
}