import ReportRow from "./ReportRow";
import Table from "../ui/Table";
import Menus from "../ui/Menus";
import Empty from "../ui/Empty";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";

export const ReportTable = () => {
  const reports = [
    {
      id: 1,
      title: "Server Downtime",
      type: "Technical",
      severity: "High",
      priority: "Urgent",
      date: "2025-02-09T14:30:00Z",
      status: "Open",
      submittedBy: { name: "Ahmed", email: "Ahmed@example.com" },
      assignedTo: { name: "Belgacem", email: "Belgacem@example.com" },
    },
    {
      id: 2,
      title: "Data Breach",
      type: "Security",
      severity: "Critical",
      priority: "Normal",
      date: "2025-02-10T10:15:00Z",
      status: "In Progress",
      description: "A security breach was detected in the system.",
      submittedBy: { name: "Azyz Hcini", email: "Azyz@example.com" },
      assignedTo: { name: "Crush", email: "Sarrour@example.com" },
    },
  ];

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
