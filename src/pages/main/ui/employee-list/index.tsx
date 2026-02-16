import { useEmployees } from '../../../../shared/api/queries/employee-query';
import { EmployeeCard } from '../employee-card';
import styles from './index.module.css';


export const EmployeeList = () => {

    const {data: employees, isLoading, isError} = useEmployees();
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

    return (
        <div className={styles.list}>
            {employees.map((employee) => (
                <EmployeeCard 
                    key={employee.id}
                    employee={employee}
                />
            ))}
        </div>
    );
};
