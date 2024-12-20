import { useState, useEffect } from 'react';

export default function useAnimatedBalance(targetBalance, duration=1000) {
    const [animatedBalance, setAnimatedBalance] = useState(0);
    
    useEffect(() => {
        if (!targetBalance) return;
        
        const startBalance = animatedBalance;
        const targetValue = Number(targetBalance) / 1000000;
        const startTime = Date.now();
        const effectiveDuration = startBalance === 0 ? 2000 : duration;
        
        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / effectiveDuration, 1);
            
            const currentBalance = startBalance + (targetValue - startBalance) * progress;
            setAnimatedBalance(currentBalance);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }, [targetBalance, duration, animatedBalance]);
    
    return animatedBalance;
}