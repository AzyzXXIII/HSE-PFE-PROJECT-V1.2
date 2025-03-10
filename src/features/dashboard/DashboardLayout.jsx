import styled from "styled-components";
import Stats from "./Stats";
import ReportsChart from "./ReportsChart"; // Import the new chart

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const reports = [
    { incident: 25 },
    { hazard: 40 },
    { observation: 15 },
    { nearMiss: 10 },
  ];
  const confirmedStays = [{ numNights: 3 }, { numNights: 5 }, { numNights: 2 }];
  const numEmployees = 30;
  const numHighSeverity = 10;

  return (
    <StyledDashboardLayout>
      <Stats
        reports={reports}
        confirmedStays={confirmedStays}
        numEmployees={numEmployees}
        numHighSeverity={numHighSeverity}
      />
      <ReportsChart /> {/* Add Reports Chart after Stats */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
