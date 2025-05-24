import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { HiOutlineClock, HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { toast } from "react-toastify";

import Button from "../ui/Button";
import ButtonGroup from "../ui/ButtonGroup";
import Tag from "../ui/Tag";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import ReportTabs from "../features/ReportTabs";
import ReportDataBox from "./ReportDataBox";
import ReportLocationInfo from "./components/ReportLocationInfo";

import { useDeleteReport } from "../hooks/useDeleteReports";
import { useUpdateReport } from "../hooks/useUpdateReport";

// ReportTypes
import ObservationsInfo from "./components/reportDetails/ObservationInfo";
import HazardsInfo from "./components/reportDetails/HazardsInfo";
import IncidentInfo from "./components/reportDetails/IncidentInfo";
import NearMissInfo from "./components/reportDetails/NearMissInfo";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function ReportDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Normal");
  const { mutate: deleteReport } = useDeleteReport();
  const { mutate: updateReport } = useUpdateReport();

  const { reportType } = location.state || {};
  const [activeTab, setActiveTab] = useState("Report Details");

  useEffect(() => {
    if (location.state?.report) {
      setReport(location.state.report);
      setStatus(location.state.report.status || "Open");
      setPriority(location.state.report.priority || "Normal");
    }
    setIsLoading(false);
  }, [location.state?.report]);

  const handleStatusChange = (newStatus) => {
    const historyAction = {
      action: `Status changed to ${newStatus}`,
      performed_by: "Admin",
      timestamp: new Date().toISOString(),
    };

    // Update local UI
    setStatus(newStatus);
    setReport((prev) => ({
      ...prev,
      status: newStatus,
      history_actions: [...(prev.history_actions || []), historyAction],
    }));

    // Backend update with toast
    updateReport(
      {
        id: report.id,
        type: reportType,
        status: newStatus,
        priority,
        historyAction,
      },
      {
        onSuccess: () => {
          toast.success("Status updated successfully ✅");
        },
        onError: () => {
          toast.error("Failed to update status ❌");
        },
      }
    );
  };

  const handlePriorityChange = (newPriority) => {
    const historyAction = {
      action: `Priority changed to ${newPriority}`,
      performed_by: "Admin",
      timestamp: new Date().toISOString(),
    };

    setPriority(newPriority);
    setReport((prev) => ({
      ...prev,
      priority: newPriority,
      history_actions: [...(prev.history_actions || []), historyAction],
    }));

    updateReport(
      {
        id: report.id,
        type: reportType,
        status,
        priority: newPriority,
        historyAction,
      },
      {
        onSuccess: () => {
          toast.success("Priority updated successfully ✅");
        },
        onError: () => {
          toast.error("Failed to update priority ❌");
        },
      }
    );
  };

  // CSV Export Handler
  const handleExportCSV = async () => {
    if (!report || !reportType) {
      toast.error("Cannot export: Missing report data");
      return;
    }

    setIsExporting(true);

    try {
      const response = await fetch(
        `/api/reports/${report.id}/export/csv?type=${encodeURIComponent(
          reportType
        )}`,
        {
          method: "GET",
          headers: {
            Accept: "text/csv",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to export CSV");
      }

      // Get the filename from the response headers
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `report_${report.id}_${reportType}_${
        new Date().toISOString().split("T")[0]
      }.csv`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Get the CSV content
      const csvContent = await response.text();

      // Create and trigger download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      toast.success("Report exported to CSV successfully! 📄");
    } catch (error) {
      console.error("Export error:", error);
      toast.error(`Failed to export CSV: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (!report) return <Empty resourceName="report" />;

  const statusToTagName = {
    Open: "blue",
    Closed: "green",
    "In Progress": "silver",
  };

  const tabTitles = ["Report Details", "Additional Information", "History"];

  const renderReportDetails = () => (
    <ReportDataBox
      report={report}
      status={status}
      setStatus={handleStatusChange}
      priority={priority}
      setPriority={handlePriorityChange}
    />
  );

  const renderAdditionalInformation = () => {
    const normalizedType = (reportType || "")
      .toLowerCase()
      .replace(/\s+/g, "_");

    const reportComponents = {
      observations: <ObservationsInfo report={report} />,
      hazards: <HazardsInfo report={report} />,
      nearmiss: <NearMissInfo report={report} />,
      incidents: <IncidentInfo report={report} />,
    };

    return (
      <div>
        {reportComponents[normalizedType] || (
          <div>No additional information available for this report type.</div>
        )}
        <ReportLocationInfo location={report.location} />
      </div>
    );
  };

  const renderHistory = () => (
    <div>
      <h3 className="text-lg font-semibold mb-2">History</h3>
      {Array.isArray(report.history_actions) &&
      report.history_actions.length > 0 ? (
        <ul className="space-y-2">
          {report.history_actions.map((entry, idx) => (
            <li key={idx} className="text-sm border-b pb-1">
              <strong>{entry.performed_by}</strong>: {entry.action}
              <br />
              <span className="text-xs text-gray-500">
                {format(new Date(entry.timestamp), "PPpp")}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );

  const handleTabClick = (tabTitle) => setActiveTab(tabTitle);

  return (
    <div>
      <Header>
        <HeadingGroup>
          <Heading as="h1">Report #{report.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          <span>{report.title}</span>
          <HiOutlineClock />
          <span>{format(new Date(report.date), "MMM dd yyyy, hh:mm a")}</span>
        </HeadingGroup>
      </Header>

      <ReportTabs
        tabTitles={tabTitles}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        renderReportDetails={renderReportDetails}
        renderAdditionalInformation={renderAdditionalInformation}
        renderHistory={renderHistory}
      />

      <ButtonGroup>
        <Button
          $variation="primary"
          $size="medium"
          onClick={() => navigate(-1)}
        >
          VALIDATE
        </Button>

        <Button
          $variation="export"
          $size="medium"
          onClick={handleExportCSV}
          disabled={isExporting}
        >
          <HiOutlineDocumentArrowDown />
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>

        <Modal>
          <Modal.Open opens="delete">
            <Button $variation="danger" $size="medium">
              Delete Report
            </Button>
          </Modal.Open>

          <Button
            $variation="secondary"
            $size="medium"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="report"
              onConfirm={() => {
                deleteReport(
                  { id: report.id, type: reportType },
                  {
                    onSuccess: () => {
                      toast.success("Report deleted successfully! ✅");
                      navigate(-1);
                    },
                    onError: () => {
                      toast.error("Failed to delete report. ❌");
                    },
                  }
                );
              }}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </div>
  );
}

export default ReportDetails;
