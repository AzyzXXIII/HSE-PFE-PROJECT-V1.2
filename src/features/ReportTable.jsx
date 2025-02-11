import ReportRow from "./ReportRow";
import Table from "../ui/Table";
import Menus from "../ui/Menus";
import Empty from "../ui/Empty";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";

export const ReportTable = ({ reports }) => {
  const isLoading = false;
  const count = reports.length;

  if (isLoading) return <Spinner />;

  if (!reports.length) return <Empty resourceName="reports" />;

  return (
    <Menus>
      <Table columns="0.8fr 1.5fr 1.5fr 1.2fr 1fr 1fr 1fr 1fr 5rem">
        <Table.Header>
          <div>Title</div>
          <div>Submitted By</div>
          <div>Assigned To</div>
          <div>Date</div>
          <div>Type</div>
          <div>Status</div>
          <div>Severity</div>
          <div>Priority</div>
          <div>Actions</div>
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
