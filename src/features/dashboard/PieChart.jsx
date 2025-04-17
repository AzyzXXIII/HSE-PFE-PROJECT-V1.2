import styled from "styled-components";
import { PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Heading from "../../ui/Heading";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const COLORS = {
  Incidents: "#ef4444",
  Hazards: "#facc15",
  Observations: "#3b82f6",
  "Near Misses": "#10b981",
};

const renderLabel = ({ name, value }) => {
  if (value === 0) return null;
  return `${name}: ${value}`;
};

const PieChart = ({
  incidentsStats,
  hazardsStats,
  observationsStats,
  nearMissStats,
}) => {
  const data = [
    {
      name: "Incidents",
      value: Number(incidentsStats?.total_reports || 0),
      color: COLORS["Incidents"],
    },
    {
      name: "Hazards",
      value: Number(hazardsStats?.total_reports || 0),
      color: COLORS["Hazards"],
    },
    {
      name: "Observations",
      value: Number(observationsStats?.total_reports || 0),
      color: COLORS["Observations"],
    },
    {
      name: "Near Misses",
      value: Number(nearMissStats?.total_reports || 0),
      color: COLORS["Near Misses"],
    },
  ];

  return (
    <ChartBox>
      <Heading as="h2">Summary of Submitted Reports</Heading>
      <RePieChart width={500} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          labelLine={true}
          label={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </ChartBox>
  );
};

export default PieChart;
