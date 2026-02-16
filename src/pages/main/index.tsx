import { useShowModal } from "../../app/provider";
import { AddEmployeeForm } from "../../widgets/add-employee-form";
import { Header } from "../../widgets/header";
import { Modal } from "../../widgets/modal";
import { EmployeeList } from "./ui/employee-list";

export const MainPage = () => {
    const { showModal, setShowModal } = useShowModal();

    return (
        <div>
            <Header />
            <EmployeeList />
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <AddEmployeeForm />
            </Modal>
        </div>
    );
};