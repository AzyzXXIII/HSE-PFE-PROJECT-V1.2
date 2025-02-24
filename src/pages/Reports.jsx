import { useSearchParams } from "react-router-dom";
import ReportTable from "../features/ReportTable";
import ReportTableOperations from "../features/ReportTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useState, useEffect } from "react";
import { mockData } from "../data/mockReports";
export const Reports = () => {
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchParams] = useSearchParams();
  const reportType = searchParams.get("type");

  useEffect(() => {
    if (reportType && mockData[reportType]) {
      setFilteredReports(mockData[reportType]);
    } else {
      setFilteredReports([]);
    }
  }, [reportType]);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          {reportType ? `${reportType} Reports` : "All Reports"}
        </Heading>
        <ReportTableOperations
          reports={filteredReports}
          setFilteredReports={setFilteredReports}
        />
      </Row>
      <ReportTable reports={filteredReports} />
    </>
  );
};

export default Reports;
