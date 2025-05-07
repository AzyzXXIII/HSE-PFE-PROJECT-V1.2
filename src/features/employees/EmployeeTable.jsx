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
  console.log(employees);

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
    if (field === "fullName") {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB) * modifier;
    }

    // Special handling for department sorting (compare by numeric departmentId)
    if (field === "departmentId") {
      const deptA = a.department?.name || String(a.departmentId);
      const deptB = b.department?.name || String(b.departmentId);
      if (typeof deptA === "number" && typeof deptB === "number") {
        return (deptA - deptB) * modifier; // Compare as numbers if they are numeric
      }
      return deptA.localeCompare(deptB) * modifier; // Fallback to string comparison
    }

    // Special handling for title/role sorting (compare by numeric titleId)
    if (field === "titleId") {
      const roleA = a.role || String(a.titleId);
      const roleB = b.role || String(b.titleId);
      return roleA.localeCompare(roleB) * modifier; // Compare roles as strings
    }

    // Default sorting for other fields
    const valA = a[field]?.toString().toLowerCase() || "";
    const valB = b[field]?.toString().toLowerCase() || "";
    return valA.localeCompare(valB) * modifier;
  });

  return (
    <Menus>
      <Table columns="1.2fr 1.5fr 2.5fr 1.2fr 1.2fr 1.5fr 1fr 0.8fr">
        <Table.Header>
          <div>USERNAME</div>
          <div>FULL NAME</div>
          <div>EMAIL</div>
          <div>PHONE</div>
          <div>ROLE</div>
          <div>Department</div>
          <div>STATUS</div>
          <div></div>
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
