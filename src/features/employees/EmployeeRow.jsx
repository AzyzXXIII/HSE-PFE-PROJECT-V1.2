import styled from "styled-components";
import { HiPencil, HiTrash, HiCheck, HiX } from "react-icons/hi";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CreateEmployeeForm from "./CreateEmployeeForm";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Employee = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Title = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const Department = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-blue-700);
`;

const Status = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: ${(props) =>
    props.$status === "accepted"
      ? "var(--color-green-700)"
      : props.$status === "rejected"
      ? "var(--color-red-700)"
      : "var(--color-grey-700)"};
`;

function EmployeeRow({ employee, onAccept, onReject }) {
  const {
    id: employeeId,
    username,
    fullName,
    email,
    phone,
    address,
    titleId,
    departmentId,
    status,
  } = employee;

  return (
    <Table.Row>
      <div>{username}</div>
      <Employee>{fullName}</Employee>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{address}</div>
      <Title>{titleId}</Title>
      <Department>{departmentId}</Department>
      <Status $status={status}>{status}</Status>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={employeeId} />

            <Menus.List id={employeeId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>

              {status === "pending" && (
                <>
                  <Menus.Button
                    icon={<HiCheck />}
                    onClick={() => onAccept(employeeId)}
                  >
                    Accept
                  </Menus.Button>
                  <Menus.Button
                    icon={<HiX />}
                    onClick={() => onReject(employeeId)}
                  >
                    Reject
                  </Menus.Button>
                </>
              )}
            </Menus.List>

            <Modal.Window name="edit">
              <CreateEmployeeForm employeeToEdit={employee} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="employees"
                onConfirm={() => console.log(`Delete employee ${employeeId}`)} // Implement delete action as needed
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default EmployeeRow;
