import { useEffect, useRef, useState } from "react";
import { useAddEmployee } from "../../shared/api/mutations/add-employee";
import { useShowModal } from "../../app/provider";
import styles from "./index.module.css";

export const AddEmployeeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        job_title: '',
        interests: ''
    });

    const { setShowModal } = useShowModal();
    const addEmployee = useAddEmployee();
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        nameInputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addEmployee.mutate(formData, {
            onSuccess: () => {
                setFormData({
                    name: '',
                    phone_number: '',
                    job_title: '',
                    interests: ''
                });
                setShowModal(false);
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.form__title}>Добавить сотрудника</h2>

            <input
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={addEmployee.isPending}
                ref={nameInputRef}
                className={styles.form__input}
            />

            <input
                type="tel"
                name="phone_number"
                placeholder="Телефон"
                value={formData.phone_number}
                onChange={handleChange}
                required
                disabled={addEmployee.isPending}
                className={styles.form__input}
            />

            <input
                type="text"
                name="job_title"
                placeholder="Должность"
                value={formData.job_title}
                onChange={handleChange}
                required
                disabled={addEmployee.isPending}
                className={styles.form__input}
            />

            <input
                type="text"
                name="interests"
                placeholder="Интересы"
                value={formData.interests}
                onChange={handleChange}
                required
                disabled={addEmployee.isPending}
                className={styles.form__input}
            />

            <button
                type="submit"
                disabled={addEmployee.isPending}
                className={styles.form__button}
            >
                Добавить
            </button>

            {addEmployee.isError && (
                <p className={styles.form__error}>
                    Ошибка: {addEmployee.error?.message}
                </p>
            )}
        </form>
    );
};