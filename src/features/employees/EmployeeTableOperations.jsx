import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
export const EmployeeTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "accepted", label: "Accepted" },
          { value: "rejected", label: "Rjected" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name (A-Z)" },
          { value: "name-desc", label: "Sort by Name (Z-A)" },
          { value: "department", label: "By Department" },
          { value: "title", label: "Sort by Title" },
        ]}
      />
    </TableOperations>
  );
};

export default EmployeeTableOperations;
