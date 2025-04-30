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

const EmailColumn = styled.div`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  color: gray;
`;

const statusColors = {
  Open: { bg: "#3B82F6", text: "#FFFFFF" },
  "In Progress": { bg: "#6B7280", text: "#FFFFFF" },
  Resolved: { bg: "#10B981", text: "#FFFFFF" },
};

const severityColors = {
  Minor: { bg: "#22C55E", text: "#FFFFFF" },
  Moderate: { bg: "#FACC15", text: "#000000" },
  High: { bg: "#DC2626", text: "#FFFFFF" },
};

const priorityColors = {
  Low: { bg: "#22C55E", text: "#FFFFFF" },
  Medium: { bg: "#FACC15", text: "#000000" },
  High: { bg: "#DC2626", text: "#FFFFFF" },
  Critical: { bg: "#6B7280", text: "#FFFFFF" },
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
          toast.success("Report deleted successfully! ✅");
        },
        onError: (error) => {
          toast.error("Failed to delete report. ❌");
        },
      }
    );
  };

  return (
    <Table.Row>
      <div
        style={{
          fontSize: "1.6rem",
          fontWeight: 600,
          maxWidth: "150px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={report.title}
      >
        {report.title}
      </div>

      <div>
        <div>
          {report.first_name} {report.last_name}
        </div>
        <EmailColumn title={report.email}>{report.email}</EmailColumn>
      </div>

      <div
        style={{
          fontSize: "1.6rem",
          fontWeight: 600,
          maxWidth: "150px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={report.type}
      >
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
              aria-label="See report details"
              onClick={() =>
                navigate(`/reports/${report.id}`, {
                  state: { report, reportType },
                })
              }
            >
              See details
            </Menus.Button>

            <Modal.Open opens="delete">
              <Menus.Button
                icon={<HiTrash />}
                onClick={handleDelete}
                aria-label="Delete report"
              >
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
