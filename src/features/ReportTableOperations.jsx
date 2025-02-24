import SortBy from "../ui/SortBy";
import Filter from "../ui/Filter";
import TableOperations from "../ui/TableOperations";
import { useSearchParams } from "react-router-dom";

export const ReportTableOperations = () => {
  const [setSearchParams] = useSearchParams();

  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "Open", label: "Open" },
          { value: "In Progress", label: "In Progress" },
          { value: "Closed", label: "Closed" },
        ]}
        setSearchParams={setSearchParams}
      />
      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          { value: "priority-desc", label: "Sort by priority (high first)" },
          { value: "priority-asc", label: "Sort by priority (low first)" },
        ]}
        setSearchParams={setSearchParams}
      />
    </TableOperations>
  );
};

export default ReportTableOperations;
