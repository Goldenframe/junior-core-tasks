import { useRef } from 'react';

// Хук для подсчета открытий модального окна
// Использует замыкание через useRef, который сохраняет значение между рендерами
export const useModalCounter = () => {
    const countRef = useRef(0);
    
    const increment = () => {
        countRef.current = countRef.current + 1;
        console.log(`Модальное окно открывалось ${countRef.current} раз`);
        return countRef.current;
    };
    
    const getCount = () => {
        return countRef.current;
    };
    
    const reset = () => {
        countRef.current = 0;
        console.log('Счетчик сброшен');
    };
    
    return { increment, getCount, reset };
};