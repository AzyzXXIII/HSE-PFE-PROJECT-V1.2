import styled from "styled-components";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardBox from "./DashboardBox";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const StyledReportsChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  width: 100%;
  height: 400px; /* Increase the height */
  padding: 20px;

  /* Ensure the chart fills the box */
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

function ReportsChart() {
  // Sample data for reports over time
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Incidents",
        data: [5, 10, 15, 25, 20, 30, 35],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        pointBackgroundColor: "#ef4444",
        pointRadius: 5, // Increases the point size
        pointHoverRadius: 8, // Enlarges point when hovered
        pointHitRadius: 10, // Expands clickable area
        tension: 0.3, // Smooth curve
      },
      {
        label: "Hazards",
        data: [8, 12, 20, 28, 35, 40, 50],
        borderColor: "#facc15",
        backgroundColor: "rgba(250, 204, 21, 0.2)",
        pointBackgroundColor: "#facc15",
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHitRadius: 10,
        tension: 0.3,
      },
      {
        label: "Observations",
        data: [3, 7, 12, 18, 22, 25, 30],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        pointBackgroundColor: "#3b82f6",
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHitRadius: 10,
        tension: 0.3,
      },
      {
        label: "Near Misses",
        data: [2, 5, 8, 10, 12, 15, 18],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        pointBackgroundColor: "#10b981",
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHitRadius: 10,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
        mode: "nearest", // Ensures tooltips activate when close to a point
        intersect: false, // Allows tooltips to appear even if not directly over the point
      },
    },
    interaction: {
      mode: "nearest", // Improves hover detection
      intersect: false, // Detects nearest point instead of requiring direct overlap
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Reports",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <StyledReportsChart>
      <h3 className="text-lg font-semibold mb-2">Reports Over Time</h3>
      <Line data={data} options={options} width={700} height={500} />
    </StyledReportsChart>
  );
}

export default ReportsChart;
