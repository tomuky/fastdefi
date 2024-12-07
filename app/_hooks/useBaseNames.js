import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getBasename } from '@/app/_apis/basenames';

export function useBasename() {
    const { address, isConnected } = useAccount();
    const [basename, setBasename] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (!isConnected) return;
            setLoading(true);
            const fetchedBasename = await getBasename(address);
            setBasename(fetchedBasename);
            setLoading(false);
        }
        fetchData();
    }, [address, isConnected]);

    return { basename, loading };
}