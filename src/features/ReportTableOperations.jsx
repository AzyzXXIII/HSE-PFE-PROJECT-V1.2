import SortBy from "../ui/SortBy";
import Filter from "../ui/Filter";
import TableOperations from "../ui/TableOperations";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const ReportTableOperations = ({ reports, setFilteredReports }) => {
  const [searchParams] = useSearchParams();
  const filterStatus = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "";

  useEffect(() => {
    let filteredData = [...reports]; // Use the passed reports instead of mockData

    if (filterStatus !== "all") {
      filteredData = filteredData.filter(
        (report) => report.status === filterStatus
      );
    }

    filteredData = filteredData.sort((a, b) => {
      if (sortBy === "startDate-desc") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "startDate-asc") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === "priority-desc") {
        return a.priority > b.priority ? -1 : 1;
      } else if (sortBy === "priority-asc") {
        return a.priority < b.priority ? -1 : 1;
      }
      return 0;
    });

    setFilteredReports(filteredData);
  }, [filterStatus, sortBy, setFilteredReports]); // Remove reports from the dependency array

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
        currentFilter={filterStatus}
      />
      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          { value: "priority-desc", label: "Sort by priority (high first)" },
          { value: "priority-asc", label: "Sort by priority (low first)" },
        ]}
        currentSort={sortBy}
      />
    </TableOperations>
  );
};

export default ReportTableOperations;
