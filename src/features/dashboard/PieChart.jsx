import styled from "styled-components";
import { PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Heading from "../../ui/Heading";

const ChartBox = styled.div`
  /* Box */
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

const data = [
  { name: "Incidents", value: 35, color: "#ef4444" },
  { name: "Hazards", value: 50, color: "#facc15" },
  { name: "Observations", value: 30, color: "#3b82f6" },
  { name: "Near Misses", value: 18, color: "#10b981" },
];

export const PieChart = () => {
  return (
    <ChartBox>
      <Heading as="h2">Summary of Submitted Reports</Heading>
      <RePieChart width={500} height={270}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
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
