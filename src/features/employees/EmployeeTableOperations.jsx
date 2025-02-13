import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export const EmployeeTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "accepted", label: "Accepted" },
          { value: "rejected", label: "Rejected" },
        ]}
      />

      <SortBy
        options={[
          { value: "fullName-asc", label: "Sort by Name (A-Z)" },
          { value: "fullName-desc", label: "Sort by Name (Z-A)" },
          { value: "departmentId-asc", label: "Sort by Department (A-Z)" },
          { value: "departmentId-desc", label: "Sort by Department (Z-A)" },
          { value: "titleId-asc", label: "Sort by Title (A-Z)" },
          { value: "titleId-desc", label: "Sort by Title (Z-A)" },
        ]}
      />
    </TableOperations>
  );
};

export default EmployeeTableOperations;
