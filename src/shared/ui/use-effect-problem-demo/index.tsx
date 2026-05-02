import { useState, useEffect } from 'react';
import styles from './index.module.css';

export const UseEffectProblemDemo = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    useEffect(() => {
        console.log(`Эффект выполняется. Текст: "${text}", Счетчик: ${count}`);
    });

    return (
        <div className={styles.demo}>
            <h4 className={styles.title}>Демонстрация проблемы useEffect deps</h4>
            
            <div className={styles.section}>
                <p className={styles.label}>Счетчик: {count}</p>
                <button 
                    className={styles.button}
                    onClick={() => setCount(count + 1)}
                >
                    Увеличить счетчик
                </button>
            </div>
            
            <div className={styles.section}>
                <input
                    type="text"
                    placeholder="Введите текст..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={styles.input}
                />
            </div>
            
            <p className={styles.note}>
                Эффект срабатывает при каждом клике и каждом вводе символа.
                Исправление: добавить массив зависимостей [text] или [count].
            </p>
        </div>
    );
};