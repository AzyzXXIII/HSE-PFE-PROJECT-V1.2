import { useState, useEffect } from "react";
import axios from "axios";
import { HiPencil, HiTrash, HiEye } from "react-icons/hi";
import Table from "../ui/Table";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

function Reports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");

  useEffect(() => {
    async function fetchReports() {
      try {
        const mockData = [
          {
            id: 1,
            title: "Report 1",
            type: "Near Miss",
            severity: "Low",
            date: "2025-02-09",
            status: "Open",
          },
          {
            id: 2,
            title: "Report 2",
            type: "Incident",
            severity: "High",
            date: "2025-02-10",
            status: "Closed",
          },
          {
            id: 3,
            title: "Report 3",
            type: "Observation",
            severity: "Medium",
            date: "2025-02-11",
            status: "Open",
          },
        ];
        setReports(mockData);
        setFilteredReports(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let filtered = reports;

    if (search) {
      filtered = filtered.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter((r) => r.type === filterType);
    }

    if (filterSeverity) {
      filtered = filtered.filter((r) => r.severity === filterSeverity);
    }

    setFilteredReports(filtered);
  }, [search, filterType, filterSeverity, reports]);

  // Delete report
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await axios.delete(`/api/reports/${id}`);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  }

  const columns = "1fr 1fr 1fr 1fr 1fr 2fr"; // Adjusted to include actions column

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>

      {/* Filters & Search */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Near Miss">Near Miss</option>
          <option value="Incident">Incident</option>
          <option value="Observation">Observation</option>
        </Select>
        <Select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
        >
          <option value="">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Select>
      </div>

      {/* Reports Table */}
      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <Table columns={columns}>
          <Table.Header>
            <Table.Row>
              <div>ID</div>
              <div>Type</div>
              <div>Severity</div>
              <div>Date</div>
              <div>Status</div>
              <div>Actions</div>
            </Table.Row>
          </Table.Header>
          <Table.Body
            data={filteredReports}
            render={(report) => (
              <Table.Row key={report.id}>
                <div>{report.id}</div>
                <div>{report.type}</div>
                <div>{report.severity}</div>
                <div>{new Date(report.date).toLocaleDateString()}</div>
                <div>{report.status}</div>
                <div>
                  <Button
                    icon={<HiEye />}
                    onClick={() => console.log("View", report.id)}
                  >
                    View
                  </Button>
                  <Button
                    icon={<HiPencil />}
                    className="ml-2"
                    onClick={() => console.log("Edit", report.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    icon={<HiTrash />}
                    className="ml-2"
                    onClick={() => handleDelete(report.id)}
                    danger
                  >
                    Delete
                  </Button>
                </div>
              </Table.Row>
            )}
          />
        </Table>
      )}
    </div>
  );
}

export default Reports;
