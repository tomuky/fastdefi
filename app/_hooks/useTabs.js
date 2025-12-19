'use client';
import { useState } from 'react';

export function useTabs(tabs) {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    
    const currentIndex = tabs.indexOf(activeTab);
    const isLastTab = currentIndex === tabs.length - 1;
    
    const goToNextTab = () => {
        if (!isLastTab) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };
    
    return {
        activeTab,
        setActiveTab,
        isLastTab,
        goToNextTab
    };
}