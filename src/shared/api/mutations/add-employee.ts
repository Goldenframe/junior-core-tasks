import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type Employee } from '../api';
import { queryKeys } from '../query-keys';

export const useAddEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (employee: Employee) => {
            if (!employee) {
                throw new Error('Данные сотрудника не указаны');
            }

            await api.addEmployee(employee);
            return employee;
        },

        onMutate: async (newEmployee) => {
            await queryClient.cancelQueries({ 
                queryKey: [queryKeys.getEmployees] 
            });

            const previousEmployees = queryClient.getQueryData<Employee[]>([queryKeys.getEmployees]);    
            queryClient.setQueryData<Employee[]>(
                [queryKeys.getEmployees],
                (old) => old ? [newEmployee, ...old] : [newEmployee]
            );

            return { previousEmployees };
        },

        onError: (_err, _newEmployee, context) => {
            if (context?.previousEmployees) {
                queryClient.setQueryData(
                    [queryKeys.getEmployees], 
                    context.previousEmployees
                );
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.getEmployees],
            });
        },

        onSuccess: (employee) => {
            console.log(`Сотрудник ${employee.name} добавлен`);
        },
    });
};