import { useSearchParams, useNavigate } from "react-router-dom";
import ReportTable from "../features/ReportTable";
import ReportTableOperations from "../features/ReportTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useState, useEffect } from "react";
import { mockData } from "../data/mockReports.js";
import Button from "../ui/Button";
import ButtonGroup from "../ui/ButtonGroup.jsx";

export const Reports = () => {
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const reportType = searchParams.get("type");
  const filterStatus = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "";

  useEffect(() => {
    let reports =
      reportType && mockData[reportType] ? [...mockData[reportType]] : [];

    // Apply Filtering
    if (filterStatus !== "all") {
      reports = reports.filter((report) => report.status === filterStatus);
    }

    // Apply Sorting
    if (sortBy) {
      reports.sort((a, b) => {
        if (sortBy === "startDate-desc") {
          return new Date(b.date) - new Date(a.date);
        } else if (sortBy === "startDate-asc") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortBy === "priority-desc") {
          return b.priority.localeCompare(a.priority);
        } else if (sortBy === "priority-asc") {
          return a.priority.localeCompare(b.priority);
        }
        return 0;
      });
    }

    setFilteredReports(reports);
  }, [reportType, filterStatus, sortBy]);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          {reportType ? `${reportType} Reports` : "All Reports"}
        </Heading>
        <ReportTableOperations />
      </Row>

      <ReportTable reports={filteredReports} />
      <ButtonGroup>
        <Button
          $variation="primary"
          $size="medium"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Reports;
