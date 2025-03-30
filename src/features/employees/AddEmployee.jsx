import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateEmployeeForm from "./CreateEmployeeForm";

export const AddEmployee = ({ setEmployees }) => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="employee-form">
          <Button $variation="primary" $size="medium">
            Add Employee
          </Button>
        </Modal.Open>

        <Modal.Window name="employee-form">
          <CreateEmployeeForm setEmployees={setEmployees} />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddEmployee;
