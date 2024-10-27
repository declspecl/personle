import { useState } from 'react';

interface UseSet<T> {
    set: Set<T>;
    addElement: (newItem: T) => boolean;
    removeElement: (itemToRemove: T) => boolean;
}

export function useSet<T>(initialSet: T[] = []): UseSet<T> {
    const [values, setValues] = useState<Set<T>>(() => new Set(initialSet));

    const addUniqueItem = (item: T) => {
        if (values.has(item)) {
            return false;
        }

        setValues(prev => {
            const newSet = new Set(prev);
            newSet.add(item);
            return newSet;
        });
        return true;
    };

    const removeItem = (item: T) => {
        if (!values.has(item)) {
            return false;
        }

        setValues(prev => {
            const newSet = new Set(prev);
            newSet.delete(item);
            return newSet;
        });
        return true;
    };

    return {
        set: values,
        addElement: addUniqueItem,
        removeElement: removeItem
    };
}