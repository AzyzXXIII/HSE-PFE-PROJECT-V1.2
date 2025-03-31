import ReportRow from "./ReportRow";
import Table from "../ui/Table";
import Menus from "../ui/Menus";
import Empty from "../ui/Empty";
import Pagination from "../ui/Pagination";
import Spinner from "../ui/Spinner";

const ReportTable = ({ reports, isLoading }) => {
  const count = reports.length;

  if (isLoading) return <Spinner />;

  if (!count) return <Empty resourceName="reports" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.5fr 1.2fr 1fr 1fr 1fr 1fr 1fr  5rem">
        <Table.Header>
          <div>Title</div>
          <div>Submitted By</div>
          <div>Type</div>
          <div>Date</div>
          <div>Location</div>
          <div>Status</div>
          <div>Severity</div>
          <div>Priority</div>
        </Table.Header>

        <Table.Body
          data={reports}
          render={(report) => <ReportRow key={report.id} report={report} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default ReportTable;
