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
  if (employees.length === 0) return <Empty resourceName="employees" />;

  // Filter by status
  const statusFilter = searchParams.get("status") || "all";
  const filteredEmployees =
    statusFilter === "all"
      ? employees
      : employees.filter((emp) => emp.status === statusFilter);

  // Sort
  const sortBy = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const valA = a[field]?.toString().toLowerCase() || "";
    const valB = b[field]?.toString().toLowerCase() || "";
    return valA.localeCompare(valB) * modifier;
  });

  return (
    <Menus>
      <Table columns="1fr 1.5fr 2fr 1.5fr 1.5fr 1.5fr 1fr 1fr">
        <Table.Header>
          <div>USERNAME</div>
          <div>FULL NAME</div>
          <div>EMAIL</div>
          <div>PHONE</div>
          <div>ROLE</div>
          <div>DEPARTMENT</div>
          <div>STATUS</div>
          <div>ACTIONS</div>
        </Table.Header>

        <Table.Body
          data={sortedEmployees}
          render={(employee) => (
            <EmployeeRow key={employee.id} employee={employee} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default EmployeeTable;
