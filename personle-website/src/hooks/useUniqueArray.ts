import { useState } from 'react';

interface UniqueArray<T> {
    array: T[];
    addElement: (newItem: T) => boolean;
    removeElement: (itemToRemove: T) => boolean;
}

export function useUniqueArray<T>(initialArray: T[] = []): UniqueArray<T> {
    const [uniqueArray, setUniqueArray] = useState<T[]>(() => Array.from(new Set(initialArray)));

    const addUniqueItem = (newItem: T) => {
        if (uniqueArray.includes(newItem)) {
            return false;
        }

        setUniqueArray(prevArray => [...prevArray, newItem]);
        return true;
    };

    const removeItem = (itemToRemove: T) => {
        if (!uniqueArray.includes(itemToRemove)) {
            return false;
        }

        setUniqueArray(prevArray => prevArray.filter((item) => item !== itemToRemove));
        return true;
    };

    return {
        array: uniqueArray,
        addElement: addUniqueItem,
        removeElement: removeItem
    };
}