import styled from "styled-components";
import { format } from "date-fns";
import { HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Table from "../ui/Table";
import Modal from "../ui/Modal";
import Menus from "../ui/Menus";
import ConfirmDelete from "../ui/ConfirmDelete";
import ReportDetails from "./ReportDetails";

// Styled pill for status, severity, and priority
const Pill = styled.div`
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: capitalize;
  color: ${(props) => props.textColor || "white"};
  background-color: ${(props) => props.bgColor || "gray"};
`;

const statusColors = {
  Open: { bg: "#3B82F6", text: "#FFFFFF" },
  "In Progress": { bg: "#6B7280", text: "#FFFFFF" },
  Closed: { bg: "#10B981", text: "#FFFFFF" },
};

const severityColors = {
  Critical: { bg: "#22C55E", text: "#FFFFFF" },
  Medium: { bg: "#FACC15", text: "#000000" },
  High: { bg: "#DC2626", text: "#FFFFFF" },
};

const priorityColors = {
  Normal: { bg: "#22C55E", text: "#FFFFFF" },
  Medium: { bg: "#FACC15", text: "#000000" },
  Urgent: { bg: "#DC2626", text: "#FFFFFF" },
};

function ReportRow({ report }) {
  const navigate = useNavigate();

  return (
    <Table.Row>
      <div style={{ fontSize: "1.6rem", fontWeight: 600 }}>{report.title}</div>

      <div>
        <div>{report.submittedBy.name}</div>
        <div style={{ color: "gray", fontSize: "1.2rem" }}>
          {report.submittedBy.email}
        </div>
      </div>

      <div>
        <div>{report.assignedTo.name}</div>
        <div style={{ color: "gray", fontSize: "1.2rem" }}>
          {report.assignedTo.email}
        </div>
      </div>

      <div>
        <div>{format(new Date(report.date), "MMM dd yyyy")}</div>
        <div style={{ color: "gray", fontSize: "1.2rem" }}>
          {format(new Date(report.date), "hh:mm a")}
        </div>
      </div>

      <div>{report.type}</div>

      <Pill
        bgColor={statusColors[report.status]?.bg}
        textColor={statusColors[report.status]?.text}
      >
        {report.status.replace("-", " ")}
      </Pill>

      <Pill
        bgColor={severityColors[report.severity]?.bg}
        textColor={severityColors[report.severity]?.text}
      >
        {report.severity}
      </Pill>

      <Pill
        bgColor={priorityColors[report.priority]?.bg}
        textColor={priorityColors[report.priority]?.text}
      >
        {report.priority}
      </Pill>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={report.id} />
          <Menus.List id={report.id}>
            <Modal.Open opens="details">
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/reports/${report.id}`)}
              >
                See details
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete report</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        {/* Modal for Report Details */}
        <Modal.Window name="details">
          <ReportDetails report={report} />
        </Modal.Window>

        {/* Modal for Confirm Delete */}
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="report"
            onConfirm={() => console.log("Deleting report", report.id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

// Component for displaying report details in a modal
/* function ReportDetails({ report }) {
  return (
    <div style={{ padding: "2rem", fontSize: "1.4rem" }}>
      <h2 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{report.title}</h2>
      <p>
        <strong>Type:</strong> {report.type}
      </p>
      <p>
        <strong>Status:</strong> {report.status}
      </p>
      <p>
        <strong>Severity:</strong> {report.severity}
      </p>
      <p>
        <strong>Priority:</strong> {report.priority}
      </p>
      <p>
        <strong>Submitted By:</strong> {report.submittedBy.name} (
        {report.submittedBy.email})
      </p>
      <p>
        <strong>Assigned To:</strong> {report.assignedTo.name} (
        {report.assignedTo.email})
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {format(new Date(report.date), "MMM dd yyyy, hh:mm a")}
      </p>
    </div>
  );
} */

export default ReportRow;
