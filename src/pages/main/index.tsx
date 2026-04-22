import { useEffect } from 'react';
import { useShowModal } from "../../app/provider";
import { AddEmployeeForm } from "../../widgets/add-employee-form";
import { Header } from "../../widgets/header";
import { Modal } from "../../widgets/modal";
import { EmployeeList } from "./ui/employee-list";
import { useModalCounter } from '../../shared/lib/hooks/use-modal-counter';
import { EmployeeStatsGood } from './ui/employee-stats/employee-stats-good';

export const MainPage = () => {
    const { showModal, setShowModal } = useShowModal();
    const { increment, getCount } = useModalCounter();
    
    const handleOpenModal = () => {
        increment();
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
        console.log(`Модалка открывалась ${getCount()} раз`);
    };
    
    useEffect(() => {
        console.log('=== Задание 6: Event Loop ===');
        console.log('1. Синхронный код');
        
        setTimeout(() => {
            console.log('4. setTimeout - макрозадача');
        }, 0);
        
        Promise.resolve().then(() => {
            console.log('3. Promise - микрозадача');
        });
        
        async function asyncFunc() {
            console.log('2. Начало async функции - синхронный код');
            await Promise.resolve();
            console.log('3.5 Продолжение async - микрозадача');
        }
        
        asyncFunc();
        
        console.log('1.5 Синхронный код продолжается');
        console.log('=== Конец ===');
    }, []);

    return (
        <div>
            <Header onOpenModal={handleOpenModal} />
            <EmployeeStatsGood />
            <EmployeeList />
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <AddEmployeeForm />
            </Modal>
        </div>
    );
};