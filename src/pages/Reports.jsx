import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReportTable from "../features/ReportTable";
import ReportTableOperations from "../features/ReportTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import ButtonGroup from "../ui/ButtonGroup.jsx";
import Spinner from "../ui/Spinner.jsx";

export const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const reportType = searchParams.get("type");
  const filterStatus = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "";

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/reports?type=${reportType}`
        );
        const data = await response.json();

        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [reportType]);

  useEffect(() => {
    let filtered = [...reports];

    if (filterStatus !== "all") {
      filtered = filtered.filter((report) => report.status === filterStatus);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
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

    setFilteredReports(filtered);
  }, [reports, filterStatus, sortBy]);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          {reportType ? `${reportType} Reports` : "All Reports"}
        </Heading>
        <ReportTableOperations />
      </Row>

      {loading ? <Spinner /> : <ReportTable reports={filteredReports} />}

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
