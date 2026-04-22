import { useEmployees } from '../../../../shared/api/queries/employee-query';
import styles from './index.module.css';

export const EmployeeStatsGood = () => {
    const { data: employees, isLoading } = useEmployees();

    if (isLoading) return null;
    if (!employees || employees.length === 0) return null;

    const totalCount = employees.length;

    const uniqueJobTitles = [...new Set(employees.map(emp => emp.job_title))];

    const jobFrequency = employees.reduce((acc, emp) => {
        acc[emp.job_title] = (acc[emp.job_title] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const mostPopularJob = Object.entries(jobFrequency)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'нет данных';

    return (
        <div className={styles.stats}>
            <div className={styles.statCardGood}>
                <span className={styles.statLabel}>Всего сотрудников</span>
                <span className={styles.statValue}>{totalCount}</span>
            </div>

            <div className={styles.statCardGood}>
                <span className={styles.statLabel}>Количество должностей</span>
                <span className={styles.statValue}>{uniqueJobTitles.length}</span>
                <span className={styles.statDetail}>{uniqueJobTitles.join(', ')}</span>
            </div>

            <div className={styles.statCardGood}>
                <span className={styles.statLabel}>Самая популярная должность</span>
                <span className={styles.statValue}>{mostPopularJob}</span>
            </div>
        </div>
    );
};