import { useSearchParams, useNavigate } from "react-router-dom";
import { useReports } from "../hooks/useReports"; // Import our React Query hook
import ReportTable from "../features/ReportTable";
import ReportTableOperations from "../features/ReportTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import ButtonGroup from "../ui/ButtonGroup.jsx";
import Spinner from "../ui/Spinner.jsx";

export const Reports = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const reportType = searchParams.get("type");
  const filterStatus = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "";

  // Use React Query hook
  const { data: reports = [], isLoading, error } = useReports(reportType);

  // Handle filtering and sorting
  const filteredReports = reports
    .filter((report) =>
      filterStatus === "all" ? true : report.status === filterStatus
    )
    .sort((a, b) => {
      if (sortBy === "startDate-desc")
        return new Date(b.date) - new Date(a.date);
      if (sortBy === "startDate-asc")
        return new Date(a.date) - new Date(b.date);
      if (sortBy === "priority-desc")
        return b.priority.localeCompare(a.priority);
      if (sortBy === "priority-asc")
        return a.priority.localeCompare(b.priority);
      return 0;
    });

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          {reportType ? `${reportType} Reports` : "All Reports"}
        </Heading>
        <ReportTableOperations />
      </Row>

      {isLoading && <Spinner />}
      {error && <p style={{ color: "red" }}>❌ Error: {error.message}</p>}
      {!isLoading && !error && <ReportTable reports={filteredReports} />}

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
