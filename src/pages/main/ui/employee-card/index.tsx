import type { Employee } from '../../../../shared/api/api';
import { useDeleteEmployee } from '../../../../shared/api/mutations/delete-employee';
import styles from './index.module.css';

type EmployeeCardProps = {
    employee: Employee,
}

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
    const deleteEmployee = useDeleteEmployee();

    const handleDelete = () => {
        if (!employee.id) {
            return;
        }

        deleteEmployee.mutate(employee.id);

        const logger = {
            name: 'EmployeeLogger',
            logDelete(id: number) {
                console.log(`${this.name} удаляет сотрудника ${id}`);
            }
        };

        // контекст this теряется
        // const badCallback = logger.logDelete;
        // badCallback(employee.id); // this.name будет undefined

        // bind сохраняет контекст
        const boundLogDelete = logger.logDelete.bind(logger);
        boundLogDelete(employee.id); // this.name = 'EmployeeLogger'
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.card__name}>{employee.name}</h3>
            <p className={styles.card__job}>{employee.job_title}</p>
            <p className={styles.card__phone}>{employee.phone_number}</p>
            <p className={styles.card__interests}>{employee.interests}</p>
            <button
                className={styles.card__delete}
                onClick={handleDelete}
                disabled={deleteEmployee.isPending || !employee.id}
            >
                Удалить
            </button>
        </div>
    );
};