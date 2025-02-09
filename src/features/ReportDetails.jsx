import { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const StatusBadge = styled.span`
  background-color: ${(props) => props.bgColor || "#ccc"};
  color: ${(props) => props.textColor || "#fff"};
  padding: 6px 12px;
  font-size: 1.2rem;
  border-radius: 20px;
  font-weight: 600;
`;

const Container = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 6px 12px;
  font-size: 1.4rem;
  border-radius: 5px;
`;

const Actions = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background: ${(props) => props.bgColor || "#ccc"};
  color: white;
`;

function ReportDetails({ report }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(report.status);
  const [priority, setPriority] = useState(report.priority);

  const statusColors = {
    Open: "#3B82F6",
    "In Progress": "#6B7280",
    Closed: "#10B981",
  };

  const priorityColors = {
    Normal: "#22C55E",
    Medium: "#FACC15",
    Urgent: "#DC2626",
  };

  function handleUpdate() {
    console.log("Updating report:", { status, priority });
    // Send API request to update status/priority
  }

  return (
    <Container>
      <Header>
        <div>Report #{report.id}</div>
        <StatusBadge bgColor={statusColors[status]}>{status}</StatusBadge>
      </Header>

      <div style={{ marginTop: "1rem", fontSize: "1.4rem" }}>
        <p>
          <strong>Title:</strong> {report.title}
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
          <strong>Type:</strong> {report.type}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {format(new Date(report.date), "MMM dd yyyy, hh:mm a")}
        </p>
        <p>
          <strong>Observations:</strong> {report.observations || "None"}
        </p>

        <div style={{ marginTop: "1rem" }}>
          <label>Status: </label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            {Object.keys(statusColors).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Priority: </label>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {Object.keys(priorityColors).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Actions>
        <Button bgColor="#4F46E5" onClick={handleUpdate}>
          Update
        </Button>
        <Button bgColor="#DC2626">Delete Report</Button>
        <Button bgColor="#6B7280" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Actions>
    </Container>
  );
}

export default ReportDetails;
