import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import {
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineChatBubbleBottomCenterText,
} from "react-icons/hi2";
import { toast } from "react-toastify";

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
import LocationMap from "./components/LocationMap";

import { useDeleteReport } from "../hooks/useDeleteReports";

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
              <strong>No further information for Observation Report</strong>
            </p>
          </div>
        );
      case "hazards":
        return (
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Additional Information
            </h3>

            {report.picture ? (
              <div className="mb-4">
                <img
                  src={report.picture}
                  alt="Hazard"
                  className="w-full max-w-md rounded-lg shadow-md"
                />
              </div>
            ) : (
              <p className="text-sm italic mb-4">No picture available</p>
            )}

            <DataItem
              icon={<HiOutlineChatBubbleBottomCenterText />}
              label="Equipment Involved:"
            >
              {report.equipment_name || "No equipment specified"}
            </DataItem>

            <DataItem icon={<HiOutlineTag />} label="Hazard Group:">
              {report.type || "No hazard group specified"}
            </DataItem>

            <DataItem
              icon={<HiOutlineChatBubbleBottomCenterText />}
              label="Risk Level:"
            >
              {report.risk_level || "No risk level provided"}
            </DataItem>

            <DataItem icon={<HiOutlineTag />} label="Preventive Measures:">
              {report.lt_preventive_measures?.join(", ") ||
                "No preventive measures provided"}
            </DataItem>

            <DataItem icon={<HiOutlineTag />} label="Temperature:">
              {report.temperature || "No temperature provided"}
            </DataItem>

            <DataItem icon={<HiOutlineTag />} label="Noise Level:">
              {report.noise_level || "No noise level provided"}
            </DataItem>

            <DataItem icon={<HiOutlineTag />} label="Lighting:">
              {report.lighting || "No lighting provided"}
            </DataItem>

            <DataItem icon={<HiOutlineTag />} label="Weather Condition:">
              {report.weather_condition || "No weather condition provided"}
            </DataItem>

            <h4 className="font-semibold text-md mt-4 mb-2">Location Info:</h4>
            {report.location ? (
              <div className="pl-4 space-y-1 text-sm">
                <p>
                  <strong>Name:</strong> {report.location.name}
                </p>
                <p>
                  <strong>Department:</strong> {report.location.department}
                </p>
                <p>
                  <strong>Area Type:</strong> {report.location.area_type}
                </p>
                <p>
                  <strong>Floor:</strong> {report.location.floor}
                </p>
                <p>
                  <strong>Location Code:</strong>{" "}
                  {report.location.location_code}
                </p>
                <p>
                  <strong>Capacity:</strong> {report.location.capacity}
                </p>
                <p>
                  <strong>Hazard Level:</strong> {report.location.hazard_level}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {report.location.loc_description}
                </p>

                {/* Map Label */}
                <DataItem icon={<HiOutlineTag />} label="Map Location:" />

                {/* Embedded Map */}
                {report.location.latitude && report.location.longitude ? (
                  <LocationMap
                    lat={parseFloat(report.location.latitude)}
                    lng={parseFloat(report.location.longitude)}
                    label={report.location.name}
                  />
                ) : (
                  <p className="pl-8 text-sm italic">
                    Coordinates not available
                  </p>
                )}
              </div>
            ) : (
              <p className="italic text-sm">No location data available</p>
            )}
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
                      toast.success("Report deleted successfully! ✅ ");
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
