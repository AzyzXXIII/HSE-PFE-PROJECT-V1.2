import Spinner from "../../ui/Spinner";
import EmployeeRow from "./EmployeeRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function EmployeeTable({ employees }) {
  const [searchParams] = useSearchParams();

  if (!employees.length) return <Empty resourceName="employees" />;

  // 1) FILTER by status
  const statusFilter = searchParams.get("status") || "all";
  let filteredEmployees = employees;
  if (statusFilter !== "all") {
    filteredEmployees = employees.filter(
      (employee) => employee.status === statusFilter
    );
  }

  // 2) SORT employees
  const sortBy = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (a[field] && b[field]) {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return 0;
  });

  return (
    <Menus>
      <Table columns="1fr 1.5fr 2fr 1.5fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Username</div>
          <div>Full Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Address</div>
          <div>Title</div>
          <div>Department</div>
          <div>Status</div>
          <div>QR Code</div>
        </Table.Header>

        <Table.Body
          data={sortedEmployees}
          render={(employee) => (
            <EmployeeRow employee={employee} key={employee.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default EmployeeTable;
