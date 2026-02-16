import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type Employee,  } from '../api';
import { queryKeys } from '../query-keys';

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (employeeId: number) => {
            if (!employeeId) {
                throw new Error('ID сотрудника не указан');
            }

            await api.deleteEmployee(employeeId);
            return employeeId;
        },

        onMutate: async (employeeId) => {
            await queryClient.cancelQueries({ 
                queryKey: [queryKeys.getEmployees] 
            });

            const previousEmployees = queryClient.getQueryData<Employee[]>([queryKeys.getEmployees]);
            queryClient.setQueryData<Employee[]>(
                [queryKeys.getEmployees],
                (old) => old?.filter(emp => emp.id !== employeeId)
            );

            return { previousEmployees };
        },

        onError: (_err, _, context) => {
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

        onSuccess: (deletedId) => {
            console.log(`Сотрудник с id ${deletedId} удален`);
        },
    });
};