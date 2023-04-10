import { useEffect, useRef, useState } from 'react';

export const useRunFirst = () => {
    const ref = useRef(false);
    const [runFirst, setRunFirst] = useState(true);
    useEffect(() => {
        if (!ref.current) {
            ref.current = true;
            setRunFirst(false);
        }
    }, [ref.current]);
    return { runFirst };
};
