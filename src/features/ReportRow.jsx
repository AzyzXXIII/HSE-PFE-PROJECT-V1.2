import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { HiEye, HiTrash } from "react-icons/hi2";
import { toast } from "react-toastify";

import Table from "../ui/Table";
import Modal from "../ui/Modal";
import Menus from "../ui/Menus";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useDeleteReport } from "../hooks/useDeleteReports";

const Pill = styled.div`
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: capitalize;
  color: ${(props) => props.$textColor || "white"};
  background-color: ${(props) => props.$bgColor || "gray"};
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reportType = searchParams.get("type");

  const { mutate: deleteReport } = useDeleteReport();

  const isValidDate = report.date && !isNaN(new Date(report.date));
  const reportStatus = report.status || "Unknown";

  const handleDelete = () => {
    deleteReport(
      { id: report.id, type: reportType },
      {
        onSuccess: (data) => {
          console.log("Report deleted successfully!", data);
          toast.success("Report deleted successfully! ✅ ");
        },
        onError: (error) => {
          console.error("Error deleting report:", error.message);
          toast.error("Failed to delete report. ❌");
        },
      }
    );
  };

  return (
    <Table.Row>
      <div style={{ fontSize: "1.6rem", fontWeight: 600 }}>{report.title}</div>

      <div>
        <div>
          {report.first_name} {report.last_name}
        </div>
        <div style={{ color: "gray", fontSize: "1.2rem" }}>{report.email}</div>
      </div>

      <div>
        <strong>{report.type || "No type"}</strong>
      </div>

      <div>
        <div>
          {isValidDate
            ? format(new Date(report.date), "MMM dd yyyy")
            : "Invalid date"}
        </div>
        <div style={{ color: "gray", fontSize: "1.2rem" }}>
          {isValidDate
            ? format(new Date(report.date), "hh:mm a")
            : "Invalid time"}
        </div>
      </div>

      <div>
        <div>{report.location_name || "Unknown Location"}</div>
        <div style={{ color: "gray", fontSize: "1.2rem" }}>
          {report.assignedTo?.email || "No assignee"}
        </div>
      </div>

      <Pill
        $bgColor={statusColors[reportStatus]?.bg}
        $textColor={statusColors[reportStatus]?.text}
      >
        {reportStatus.replace("-", " ")}
      </Pill>

      <Pill
        $bgColor={severityColors[report.severity]?.bg}
        $textColor={severityColors[report.severity]?.text}
      >
        {report.severity || "Unknown"}
      </Pill>

      <Pill
        $bgColor={priorityColors[report.priority]?.bg}
        $textColor={priorityColors[report.priority]?.text}
      >
        {report.priority || "Normal"}
      </Pill>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={report.id} />
          <Menus.List id={report.id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() =>
                navigate(`/reports/${report.id}`, {
                  state: { report, reportType },
                })
              }
            >
              See details
            </Menus.Button>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} onClick={handleDelete}>
                Delete report
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete resourceName="report" onConfirm={handleDelete} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ReportRow;
