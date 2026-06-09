import { useState, useDeferredValue } from 'react';
import { useEmployees } from '../../../../shared/api/queries/employee-query';
import { EmployeeCard } from '../employee-card';
import styles from './index.module.css';


export const EmployeeList = () => {
    const { data: employees, isLoading, isError } = useEmployees();
    const [searchQuery, setSearchQuery] = useState('');
    const deferredQuery = useDeferredValue(searchQuery);
    const isPending = searchQuery !== deferredQuery;
    const [selectedEmployeeName, setSelectedEmployeeName] = useState<string | null>(null);

    const handleListClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        const card = target.closest('[data-card-id]');

        if (!card) {
            return;
        }

        const isDeleteButton = target.closest('.card__delete') || target.closest('button');
        if (isDeleteButton) {
            return;
        }

        const employeeId = card.getAttribute('data-card-id');
        const employeeName = card.getAttribute('data-card-name');

        if (employeeId && employeeName) {
            setSelectedEmployeeName(employeeName);
            setTimeout(() => setSelectedEmployeeName(null), 2000);
        }
    };

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
        if (deferredQuery === '') return true;
        const query = deferredQuery.toLowerCase();
        return employee.name.toLowerCase().includes(query) ||
            employee.job_title.toLowerCase().includes(query);
    });

    return (
        <>
            {selectedEmployeeName && (
                <div className={styles.toast}>
                    Выбран сотрудник: {selectedEmployeeName}
                </div>
            )}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Поиск по имени или должности..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <span className={styles.searchResult}>
                    Найдено: {filteredEmployees.length} из {employees.length}
                    {isPending && <span className={styles.pending}> (поиск...)</span>}
                </span>
            </div>

            <div className={styles.list} onClick={handleListClick}>
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
