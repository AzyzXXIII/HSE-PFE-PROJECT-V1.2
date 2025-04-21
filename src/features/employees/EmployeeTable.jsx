import Spinner from "../../ui/Spinner";
import EmployeeRow from "./EmployeeRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useEmployees } from "../../hooks/Users/useEmployees";

function EmployeeTable() {
  const [searchParams] = useSearchParams();
  const { data: employees = [], isLoading } = useEmployees();

  if (isLoading) return <Spinner />;
  if (!employees.length) return <Empty resourceName="employees" />;

  // Filter
  const statusFilter = searchParams.get("status") || "all";
  let filteredEmployees = employees;
  if (statusFilter !== "all") {
    filteredEmployees = employees.filter(
      (employee) => employee.status === statusFilter
    );
  }

  // Sort
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
          <div>USERNAME</div>
          <div>FULL NAME</div>
          <div>EMAIL</div>
          <div>PHONE</div>
          <div>LOCATION</div>
          <div>TITLE</div>
          <div>DEPARTMENT</div>
          <div>STATUS</div>
          <div>QR CODE</div>
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
