'use client';
import { useRef, useLayoutEffect } from 'react';

/**
 * Hook that animates an element's width with an elastic effect when dependencies change.
 * @param {React.RefObject} ref - Ref to the element to animate
 * @param {any} deps - Value(s) that when changed trigger the animation (will be stringified)
 */
export function useElasticWidth(ref, deps) {
    const lastWidthRef = useRef(null);
    const animationKey = JSON.stringify(deps);
    const prevKeyRef = useRef(animationKey);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;
        
        // Store initial width on mount
        if (lastWidthRef.current === null) {
            lastWidthRef.current = element.offsetWidth;
            return;
        }
        
        // Check if deps actually changed
        if (prevKeyRef.current === animationKey) return;
        prevKeyRef.current = animationKey;
        
        const startWidth = lastWidthRef.current;
        const endWidth = element.offsetWidth;
        
        // Only animate if width actually changed
        if (startWidth === endWidth) return;
        
        // Set to start width instantly
        element.style.transition = 'none';
        element.style.width = `${startWidth}px`;
        
        // Force reflow
        element.offsetHeight;
        
        // Re-enable transition and animate to end width
        element.style.transition = '';
        element.style.width = `${endWidth}px`;
        
        // Clean up after animation and store new width
        const cleanup = () => {
            element.style.width = '';
            lastWidthRef.current = element.offsetWidth;
        };
        element.addEventListener('transitionend', cleanup, { once: true });
        
        // Safety cleanup in case transitionend doesn't fire
        const timeout = setTimeout(cleanup, 500);
        
        return () => {
            element.removeEventListener('transitionend', cleanup);
            clearTimeout(timeout);
        };
    }, [ref, animationKey]);
    
    // Update stored width after each stable render (when not animating)
    useLayoutEffect(() => {
        const element = ref.current;
        if (element && !element.style.width) {
            lastWidthRef.current = element.offsetWidth;
        }
    });
}

