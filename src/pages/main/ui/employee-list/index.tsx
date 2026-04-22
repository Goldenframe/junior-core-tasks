import { useState, useTransition } from 'react';
import { useEmployees } from '../../../../shared/api/queries/employee-query';
import { EmployeeCard } from '../employee-card';
import styles from './index.module.css';


export const EmployeeList = () => {
    const { data: employees, isLoading, isError } = useEmployees();
    const [searchQuery, setSearchQuery] = useState('');
    const [isPending, startTransition] = useTransition();
    
    if (isLoading) {
        return (
            <div className={styles.list}>
                <p className={styles.list__empty}>Загрузка...</p>
            </div>
        );
    } 
    if (isError) {
        return (
            <div className={styles.list}>
                <p className={styles.list__empty}>Возникла ошибка...</p>
            </div>
        );
    }
    
    if (!employees || employees.length === 0) {
        return (
            <div className={styles.list}>
                <p className={styles.list__empty}>Список сотрудников пуст</p>
            </div>
        );
    }
    const filteredEmployees = employees.filter(employee => {
        if (searchQuery === '') return true;
        const query = searchQuery.toLowerCase();
        return employee.name.toLowerCase().includes(query) ||
               employee.job_title.toLowerCase().includes(query);
    });
    
    const handleSearch = (value: string) => {
        startTransition(() => {
            setSearchQuery(value);
        });
    };
    
    return (
        <>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Поиск по имени или должности..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className={styles.searchInput}
                />
                <span className={styles.searchResult}>
                    Найдено: {filteredEmployees.length} из {employees.length}
                    {isPending && <span className={styles.pending}> (поиск...)</span>}
                </span>
            </div>
            <div className={styles.list}>
                {filteredEmployees.map((employee) => (
                    <EmployeeCard 
                        key={employee.id}
                        employee={employee}
                    />
                ))}
            </div>
        </>
    );
};
