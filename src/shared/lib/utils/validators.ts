export const validators = {
    name: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,50}$/,
    
    phone: /^\d{3}[- ]?\d{3}[- ]?\d{4}$/,
    
    jobTitle: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,50}$/,
    
    interests: /^[a-zA-Zа-яА-ЯёЁ0-9\s,.]{2,200}$/,
};

export const validateName = (value: string) => validators.name.test(value);
export const validatePhone = (value: string) => validators.phone.test(value);
export const validateJobTitle = (value: string) => validators.jobTitle.test(value);
export const validateInterests = (value: string) => validators.interests.test(value);

export const validateEmployeeForm = (formData: {
    name: string;
    phone_number: string;
    job_title: string;
    interests: string;
}) => {
    const errors: Record<string, string> = {};
    
    if (!validateName(formData.name)) {
        errors.name = 'Имя должно содержать только буквы (2-50 символов)';
    }
    
    if (!validatePhone(formData.phone_number)) {
        errors.phone_number = 'Телефон должен быть в формате: 1234567890 или 123-456-7890 или 123 456 7890';
    }
    
    if (!validateJobTitle(formData.job_title)) {
        errors.job_title = 'Должность должна содержать только буквы (2-50 символов)';
    }
    
    if (!validateInterests(formData.interests)) {
        errors.interests = 'Интересы должны содержать буквы, цифры, пробелы, запятые (2-200 символов)';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};