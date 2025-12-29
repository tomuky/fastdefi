'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useTabs(tabs, nextTopic, footerMessages) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(tabs[0]);
    
    const currentIndex = tabs.indexOf(activeTab);
    const isLastTab = currentIndex === tabs.length - 1;
    const footerMessage = footerMessages?.[activeTab] || '';
    
    const goToNextTab = () => {
        if (!isLastTab) {
            setActiveTab(tabs[currentIndex + 1]);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    };

    const handleFooterClick = () => {
        if (isLastTab) {
            router.push(nextTopic);
        } else {
            goToNextTab();
        }
    };
    
    return {
        tabs,
        activeTab,
        setActiveTab,
        isLastTab,
        goToNextTab,
        footerMessage,
        handleFooterClick
    };
}