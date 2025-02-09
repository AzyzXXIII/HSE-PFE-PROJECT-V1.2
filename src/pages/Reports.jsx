import ReportTable from "../features/ReportTable";
import ReportTableOperations from "../features/ReportTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export const Reports = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Reports</Heading>
        <ReportTableOperations />
      </Row>

      <ReportTable />
    </>
  );
};
export default Reports;
