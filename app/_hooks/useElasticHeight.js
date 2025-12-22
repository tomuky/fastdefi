'use client';
import { useRef, useLayoutEffect } from 'react';

/**
 * Hook that animates an element's height with an elastic effect when expanding/collapsing.
 * @param {React.RefObject} ref - Ref to the element to animate
 * @param {boolean} isOpen - Whether the element should be expanded
 */
export function useElasticHeight(ref, isOpen) {
    const isFirstRender = useRef(true);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;
        
        // Skip animation on first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            element.style.height = isOpen ? 'auto' : '0px';
            return;
        }
        
        if (isOpen) {
            // EXPANDING: elastic bounce effect
            element.style.transition = 'height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            element.style.height = 'auto';
            const endHeight = element.scrollHeight;
            element.style.height = '0px';
            
            // Force reflow
            element.offsetHeight;
            
            // Animate to full height
            element.style.height = `${endHeight}px`;
            
            // After animation, set to auto for responsive sizing
            const cleanup = () => {
                element.style.height = 'auto';
            };
            element.addEventListener('transitionend', cleanup, { once: true });
            const timeout = setTimeout(cleanup, 500);
            
            return () => {
                element.removeEventListener('transitionend', cleanup);
                clearTimeout(timeout);
            };
        } else {
            // COLLAPSING: smooth ease-out (no bounce, would look weird going negative)
            element.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            const startHeight = element.scrollHeight;
            element.style.height = `${startHeight}px`;
            
            // Force reflow
            element.offsetHeight;
            
            // Animate to 0
            element.style.height = '0px';
        }
    }, [ref, isOpen]);
}

