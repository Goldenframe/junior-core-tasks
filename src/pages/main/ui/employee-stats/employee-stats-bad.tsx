/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import styles from './index.module.css';
import { useEmployees } from '../../../../shared/api/queries/employee-query';

export const EmployeeStatsBad = () => {
    const { data: employees, isLoading } = useEmployees();

    // Эти значения можно вычислить напрямую из данных employees, но здесь они хранятся в state, что приводит к лишним рендерам
    const [totalCount, setTotalCount] = useState(0);
    const [uniqueJobTitles, setUniqueJobTitles] = useState<string[]>([]);
    const [mostPopularJob, setMostPopularJob] = useState('');

    // useEffect нужен только потому что данные хранятся в state
    useEffect(() => {
        if (!employees) return;
        let count = 0;
        for (let i = 0; i < employees.length; i++) {
            count++;
        }
        setTotalCount(count);

        const uniqueJobs: string[] = [];
        for (let i = 0; i < employees.length; i++) {
            const job = employees[i].job_title;
            let alreadyExists = false;
            for (let j = 0; j < uniqueJobs.length; j++) {
                if (uniqueJobs[j] === job) {
                    alreadyExists = true;
                    break;
                }
            }
            if (!alreadyExists) {
                uniqueJobs.push(job);
            }
        }
        setUniqueJobTitles(uniqueJobs);

        const frequency: Record<string, number> = {};
        for (let i = 0; i < employees.length; i++) {
            const job = employees[i].job_title;
            if (frequency[job]) {
                frequency[job] = frequency[job] + 1;
            } else {
                frequency[job] = 1;
            }
        }

        let maxCount = 0;
        let mostPopular = '';
        const jobNames = Object.keys(frequency);
        for (let i = 0; i < jobNames.length; i++) {
            const jobName = jobNames[i];
            const countValue = frequency[jobName];
            if (countValue > maxCount) {
                maxCount = countValue;
                mostPopular = jobName;
            }
        }
        setMostPopularJob(mostPopular);

    }, [employees]);

    if (isLoading) return null;
    if (!employees || employees.length === 0) return null;

    return (
        <div className={styles.stats}>
            <div className={styles.statCardBad}>
                <span className={styles.statLabel}>Всего сотрудников</span>
                <span className={styles.statValue}>{totalCount}</span>
            </div>
            <div className={styles.statCardBad}>
                <span className={styles.statLabel}>Количество должностей</span>
                <span className={styles.statValue}>{uniqueJobTitles.length}</span>
                <span className={styles.statDetail}>{uniqueJobTitles.join(', ')}</span>
            </div>
            <div className={styles.statCardBad}>
                <span className={styles.statLabel}>Самая популярная должность</span>
                <span className={styles.statValue}>{mostPopularJob}</span>
            </div>
        </div>
    );
};