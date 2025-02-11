import ReportTable from "../features/ReportTable";
import ReportTableOperations from "../features/ReportTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useState } from "react";

export const Reports = () => {
  const [filteredReports, setFilteredReports] = useState([]);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Reports</Heading>
        <ReportTableOperations setFilteredReports={setFilteredReports} />
      </Row>

      <ReportTable reports={filteredReports} />
    </>
  );
};

export default Reports;
