import ReportRow from "./ReportRow";
import Table from "../ui/Table";
import Menus from "../ui/Menus";
import Empty from "../ui/Empty";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";

export const ReportTable = () => {
  // Mock data for reports with additional fields
  const reports = [
    {
      id: 1,
      title: "Server Downtime",
      type: "Technical",
      severity: "High",
      priority: "Urgent",
      date: "2025-02-09T14:30:00Z",
      status: "Open",
      submittedBy: { name: "John Doe", email: "john@example.com" },
      assignedTo: { name: "Jane Smith", email: "jane@example.com" },
    },
    {
      id: 2,
      title: "Data Breach",
      type: "Security",
      severity: "Critical",
      priority: "Normal",
      date: "2025-02-10T10:15:00Z",
      status: "In Progress",
      submittedBy: { name: "Alice Brown", email: "alice@example.com" },
      assignedTo: { name: "Bob Johnson", email: "bob@example.com" },
    },
    {
      id: 3,
      title: "Network Latency",
      type: "Performance",
      severity: "Medium",
      priority: "Medium",
      date: "2025-02-11T09:00:00Z",
      status: "Closed",
      submittedBy: { name: "Emily Davis", email: "emily@example.com" },
      assignedTo: { name: "Michael Wilson", email: "michael@example.com" },
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
