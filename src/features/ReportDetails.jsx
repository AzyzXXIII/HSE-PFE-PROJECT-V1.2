import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { HiOutlineClock } from "react-icons/hi2";

import Button from "../ui/Button";
import ButtonGroup from "../ui/ButtonGroup";
import Tag from "../ui/Tag";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import DataItem from "../ui/DataItem";
import ReportTabs from "../features/ReportTabs";
import ReportDataBox from "./ReportDataBox";

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

  const { reportType } = location.state || {};

  const [activeTab, setActiveTab] = useState("Report Details");

  useEffect(() => {
    if (location.state?.report) {
      setReport(location.state.report);
      setStatus(location.state.report.status || "Open");
      setPriority(location.state.report.priority || "Normal");
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [location.state?.report]);

  if (isLoading) return <Spinner />;
  if (!report) return <Empty resourceName="report" />;

  const statusToTagName = {
    Open: "blue",
    Closed: "green",
    "In Progress": "silver",
  };

  const tabTitles = ["Report Details", "Additional Information", "History"];

  const renderReportDetails = () => {
    return (
      <ReportDataBox
        report={report}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />
    );
  };

  const renderAdditionalInformation = () => {
    switch (reportType) {
      case "observations":
        return (
          <div>
            <p>
              <strong>No further informations for Observation Report</strong>{" "}
            </p>
          </div>
        );
      case "Hazard":
        return (
          <div>
            <h3>Additional Information</h3>
            <p>
              <strong>Hazard description:</strong>{" "}
              {report.hazardDescription || "No description available"}
            </p>
            <p>
              <strong>Risk level:</strong> {report.riskLevel || "No risk level"}
            </p>
          </div>
        );
      case "Incident":
        return (
          <div>
            <h3>Additional Information</h3>
            <p>
              <strong>Incident location:</strong>{" "}
              {report.incidentLocation || "No location available"}
            </p>
            <p>
              <strong>Incident cause:</strong>{" "}
              {report.incidentCause || "No cause provided"}
            </p>
          </div>
        );
      case "Near Miss":
        return (
          <div>
            <h3>Additional Information</h3>
            <p>
              <strong>Near miss details:</strong>{" "}
              {report.nearMissDetails || "No details available"}
            </p>
            <p>
              <strong>Preventative measures:</strong>{" "}
              {report.preventativeMeasures || "No measures listed"}
            </p>
          </div>
        );
      default:
        return (
          <div>No additional information available for this report type.</div>
        );
    }
  };

  const renderHistory = () => {
    return (
      <div>
        <h3>History</h3>
        <p>{report.history_actions || "No history available."}</p>
      </div>
    );
  };

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
  };

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

      {/* ReportTabs will handle the tabbed interface */}
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
                console.log("Deleted", report.id);
                navigate(-1);
              }}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </div>
  );
}

export default ReportDetails;
