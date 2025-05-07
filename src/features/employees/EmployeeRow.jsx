import styled from "styled-components";
import {
  HiPencil,
  HiTrash,
  HiCheck,
  HiX,
  HiLockClosed,
  HiLockOpen,
} from "react-icons/hi";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CreateEmployeeForm from "./CreateEmployeeForm";

import { useUpdateEmployeeStatus } from "../../hooks/Users/useUpdateEmployeeStatus";
import { useDeleteEmployee } from "../../hooks/Users/useDeleteEmployee";

const EmployeeName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  font-family: "Sono";
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const Role = styled.div`
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
      : $status === "blocked"
      ? "#f3f4f6"
      : "#e5e7eb"};
  color: ${({ $status }) =>
    $status === "active"
      ? "#047857"
      : $status === "rejected"
      ? "#b91c1c"
      : $status === "pending"
      ? "#92400e"
      : $status === "blocked"
      ? "#1f2937"
      : "#374151"};
  display: inline-block;
  width: fit-content;
`;

function EmployeeRow({ employee }) {
  const { id, username, fullName, email, phone, role, location, status } =
    employee;

  const { mutate: updateStatus } = useUpdateEmployeeStatus();
  const { mutate: deleteEmployee } = useDeleteEmployee();

  const handleAccept = () => updateStatus({ id, action: "accept" });
  const handleReject = () => updateStatus({ id, action: "reject" });
  const handleBlockToggle = () =>
    updateStatus({ id, action: status === "active" ? "block" : "unblock" });

  return (
    <Table.Row>
      <div>{username}</div>
      <EmployeeName>{fullName}</EmployeeName>
      <div style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>
        {email}
      </div>
      <div>{phone}</div>
      <Role>{role}</Role>
      <Department>{location}</Department>
      <StatusBadge $status={status}>{status}</StatusBadge>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
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

              {status === "active" && (
                <Menus.Button
                  icon={<HiLockClosed />}
                  onClick={handleBlockToggle}
                >
                  Block
                </Menus.Button>
              )}

              {status === "inactive" && (
                <Menus.Button icon={<HiLockOpen />} onClick={handleBlockToggle}>
                  Unblock
                </Menus.Button>
              )}
            </Menus.List>

            <Modal.Window name="edit">
              <CreateEmployeeForm employeeToEdit={employee} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="employee"
                onConfirm={() => deleteEmployee(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default EmployeeRow;
