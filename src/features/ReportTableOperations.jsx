import SortBy from "../ui/SortBy";
import Filter from "../ui/Filter";
import TableOperations from "../ui/TableOperations";

export const ReportTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "Open", label: "Open" },
          { value: "Closed", label: "Closed" },
          { value: "In Progress", label: "In Progress" },
        ]}
      />

      <SortBy
        options={[
          { value: "date-desc", label: "Sort by date (recent first)" },
          { value: "date-asc", label: "Sort by date (earlier first)" },
          { value: "priority-desc", label: "Sort by priority (high first)" },
          { value: "priority-asc", label: "Sort by priority (low first)" },
        ]}
      />
    </TableOperations>
  );
};

export default ReportTableOperations;
