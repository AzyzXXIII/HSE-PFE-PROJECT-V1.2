import SortBy from "../ui/SortBy";
import Filter from "../ui/Filter";
import TableOperations from "../ui/TableOperations";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const mockData = [
  {
    id: 1,
    title: "Server Downtime",
    type: "Technical",
    severity: "High",
    priority: "Urgent",
    date: "2025-02-09T14:30:00Z",
    status: "Open",
    submittedBy: { name: "Ahmed", email: "Ahmed@example.com" },
    assignedTo: { name: "Belgacem", email: "Belgacem@example.com" },
  },
  {
    id: 2,
    title: "Data Breach",
    type: "Security",
    severity: "Critical",
    priority: "Normal",
    date: "2025-02-10T10:15:00Z",
    status: "In Progress",
    description: "A security breach was detected in the system.",
    submittedBy: { name: "Azyz Hcini", email: "Azyz@example.com" },
    assignedTo: { name: "Crush", email: "Sarrour@example.com" },
  },
];

export const ReportTableOperations = ({ setFilteredReports }) => {
  const [searchParams] = useSearchParams();
  const filterStatus = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "";

  useEffect(() => {
    let filteredData = [...mockData];

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
  }, [filterStatus, sortBy, setFilteredReports]);

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
