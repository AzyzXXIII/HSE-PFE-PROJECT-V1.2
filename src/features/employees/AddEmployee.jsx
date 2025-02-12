import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateEmployeeForm from "./CreateEmployeeForm";

export const AddEmployee = ({ setEmployees }) => {
  return (
    <div>
      <Modal>
        {/* Open the modal when button is clicked */}
        <Modal.Open opens="employee-form">
          <Button>Add new employee</Button>
        </Modal.Open>

        {/* Modal content */}
        <Modal.Window name="employee-form">
          <CreateEmployeeForm setEmployees={setEmployees} />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddEmployee;
