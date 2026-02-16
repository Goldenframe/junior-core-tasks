
import axios from 'axios';

export type Employee = {
    id?: number,
    name: string,
    phone_number: string,
    job_title: string,
    interests: string,

}

const getEmployee = async () =>{
        const response = await axios.get(import.meta.env.VITE_BASE_URL);
        return response.data;

}

const addEmployee = async (newEmployee:Employee) =>{
        const response = await axios.post(import.meta.env.VITE_BASE_URL, newEmployee);
        return response.data;

}

const deleteEmployee = async (id: number) =>{
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/${id}`);
        return response.data;

}

export const api = {
    getEmployee,
    addEmployee,
    deleteEmployee,
}