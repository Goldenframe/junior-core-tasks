import { useQuery } from "@tanstack/react-query";
import { api, type Employee } from "../api";
import { queryKeys } from "../query-keys";

const employeeOptions = {
    queryKey: [queryKeys.getEmployees],
    queryFn: api.getEmployee,
    enabled: true,
}

export const useEmployees = () => {
    return useQuery<Employee[]>(employeeOptions)
}