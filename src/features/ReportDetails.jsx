import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { HiOutlineClock } from "react-icons/hi2";
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
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Normal");
  const { mutate: deleteReport } = useDeleteReport();

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

  const addHistoryAction = (actionText) => {
    const newAction = {
      action: actionText,
      performed_by: "Admin", // replace with actual user if available
      timestamp: new Date().toISOString(),
    };

    setReport((prev) => ({
      ...prev,
      history_actions: [...(prev.history_actions || []), newAction],
    }));
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    addHistoryAction(`Status changed to ${newStatus}`);
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
    addHistoryAction(`Priority changed to ${newPriority}`);
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
      near_miss: <NearMissInfo report={report} />,
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
