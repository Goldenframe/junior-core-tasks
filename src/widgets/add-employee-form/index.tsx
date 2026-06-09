import { useEffect, useRef, useState } from "react";
import { useAddEmployee } from "../../shared/api/mutations/add-employee";
import { useShowModal } from "../../app/provider";
import { validateEmployeeForm } from "../../shared/lib/utils/validators";
import styles from "./index.module.css";

export const AddEmployeeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        job_title: '',
        interests: ''
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const { setShowModal } = useShowModal();
    const addEmployee = useAddEmployee();
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        nameInputRef.current?.focus();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        
        const validation = validateEmployeeForm(formData);
        if (validation.errors[name]) {
            setErrors(prev => ({ ...prev, [name]: validation.errors[name] }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const validation = validateEmployeeForm(formData);
        
        if (!validation.isValid) {
            setErrors(validation.errors);
            setTouched({
                name: true,
                phone_number: true,
                job_title: true,
                interests: true,
            });
            return;
        }
        
        addEmployee.mutate(formData, {
            onSuccess: () => {
                setFormData({
                    name: '',
                    phone_number: '',
                    job_title: '',
                    interests: ''
                });
                setErrors({});
                setTouched({});
                setShowModal(false);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.form__title}>Добавить сотрудника</h2>

            <div className={styles.field}>
                <input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={addEmployee.isPending}
                    ref={nameInputRef}
                    className={`${styles.form__input} ${errors.name && touched.name ? styles.form__inputError : ''}`}
                />
                {errors.name && touched.name && (
                    <p className={styles.form__error}>{errors.name}</p>
                )}
            </div>

            <div className={styles.field}>
                <input
                    type="tel"
                    name="phone_number"
                    placeholder="Телефон (например: 1234567890 или 123-456-7890)"
                    value={formData.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={addEmployee.isPending}
                    className={`${styles.form__input} ${errors.phone_number && touched.phone_number ? styles.form__inputError : ''}`}
                />
                {errors.phone_number && touched.phone_number && (
                    <p className={styles.form__error}>{errors.phone_number}</p>
                )}
            </div>

            <div className={styles.field}>
                <input
                    type="text"
                    name="job_title"
                    placeholder="Должность"
                    value={formData.job_title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={addEmployee.isPending}
                    className={`${styles.form__input} ${errors.job_title && touched.job_title ? styles.form__inputError : ''}`}
                />
                {errors.job_title && touched.job_title && (
                    <p className={styles.form__error}>{errors.job_title}</p>
                )}
            </div>

            <div className={styles.field}>
                <input
                    type="text"
                    name="interests"
                    placeholder="Интересы (через запятую)"
                    value={formData.interests}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={addEmployee.isPending}
                    className={`${styles.form__input} ${errors.interests && touched.interests ? styles.form__inputError : ''}`}
                />
                {errors.interests && touched.interests && (
                    <p className={styles.form__error}>{errors.interests}</p>
                )}
            </div>

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