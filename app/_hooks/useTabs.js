'use client';
import { useState } from 'react';

export function useTabs(tabs) {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    
    const getTabIndex = (tab) => {
        return tabs.indexOf(tab);
    };
    
    return {
        activeTab,
        setActiveTab,
        getTabIndex
    };
}