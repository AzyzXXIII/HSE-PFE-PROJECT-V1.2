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
import { useTimelineData } from "../../hooks/useTimelineData";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";

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
  height: 400px;
  padding: 20px;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function ReportsChart() {
  const [searchParams] = useSearchParams();
  const last = searchParams.get("last") || "all";

  const { data: incidents, isLoading: isLoadingIncidents } = useTimelineData(
    "incidents",
    last
  );
  const { data: hazards, isLoading: isLoadingHazards } = useTimelineData(
    "hazards",
    last
  );
  const { data: observations, isLoading: isLoadingObservations } =
    useTimelineData("observations", last);
  const { data: nearMisses, isLoading: isLoadingNearMisses } = useTimelineData(
    "nearMiss",
    last
  );

  const isLoading =
    isLoadingIncidents ||
    isLoadingHazards ||
    isLoadingObservations ||
    isLoadingNearMisses;

  const rawMonths = [
    ...new Set([
      ...(incidents || []).map((d) => d.month),
      ...(hazards || []).map((d) => d.month),
      ...(observations || []).map((d) => d.month),
      ...(nearMisses || []).map((d) => d.month),
    ]),
  ].sort();

  const formatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
  });

  const months = rawMonths;
  const monthLabels = rawMonths.map((month) => {
    const [year, monthIndex] = month.split("-");
    const date = new Date(year, parseInt(monthIndex) - 1);
    return formatter.format(date);
  });

  const formatDataset = (data, label, color) => ({
    label,
    data: months.map((month) => {
      const entry = data?.find((d) => d.month === month);
      return entry ? entry.count : 0;
    }),
    borderColor: color,
    backgroundColor: `${color}33`,
    pointBackgroundColor: color,
    pointRadius: 5,
    pointHoverRadius: 8,
    pointHitRadius: 10,
    tension: 0.3,
    fill: true,
  });

  const chartData = {
    labels: monthLabels,
    datasets: [
      formatDataset(incidents, "Incidents", "#ef4444"),
      formatDataset(hazards, "Hazards", "#facc15"),
      formatDataset(observations, "Observations", "#3b82f6"),
      formatDataset(nearMisses, "Near Misses", "#10b981"),
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
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
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <StyledReportsChart>
      <h3 className="text-lg font-semibold mb-2">Reports Over Time</h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </StyledReportsChart>
  );
}

export default ReportsChart;
