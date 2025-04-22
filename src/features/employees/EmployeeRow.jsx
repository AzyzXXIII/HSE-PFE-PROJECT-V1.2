import styled from "styled-components";
import { HiPencil, HiTrash, HiCheck, HiX } from "react-icons/hi";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CreateEmployeeForm from "./CreateEmployeeForm";

import { useUpdateEmployeeStatus } from "../../hooks/Users/useUpdateEmployeeStatus";
import { useDeleteEmployee } from "../../hooks/Users/useDeleteEmployee";

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

const StatusBadge = styled.div`
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: capitalize;
  background-color: ${({ $status }) =>
    $status === "active"
      ? "#d1fae5"
      : $status === "rejected"
      ? "#fee2e2"
      : $status === "pending"
      ? "#fef9c3"
      : "#e5e7eb"};
  color: ${({ $status }) =>
    $status === "active"
      ? "#047857"
      : $status === "rejected"
      ? "#b91c1c"
      : $status === "pending"
      ? "#92400e"
      : "#374151"};
  display: inline-block;
  width: fit-content;
`;

function EmployeeRow({ employee }) {
  const {
    id: employeeId,
    username,
    firstName,
    lastName,
    fullName,
    email,
    phone,
    roleTitle,
    department,
    status,
  } = employee;

  const { mutate: updateStatus } = useUpdateEmployeeStatus();
  const { mutate: deleteEmployee } = useDeleteEmployee();

  const handleAccept = () => updateStatus({ id: employeeId, action: "accept" });
  const handleReject = () => updateStatus({ id: employeeId, action: "reject" });

  return (
    <Table.Row>
      <div>{username}</div>
      <Employee>{fullName}</Employee>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{department || "-"}</div> {/* Now labeled as Location */}
      <Title>{roleTitle}</Title>
      <Department>{department}</Department>
      <StatusBadge $status={status}>{status}</StatusBadge>
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
                  <Menus.Button icon={<HiCheck />} onClick={handleAccept}>
                    Accept
                  </Menus.Button>
                  <Menus.Button icon={<HiX />} onClick={handleReject}>
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
                resourceName="employee"
                onConfirm={() => deleteEmployee(employeeId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default EmployeeRow;
