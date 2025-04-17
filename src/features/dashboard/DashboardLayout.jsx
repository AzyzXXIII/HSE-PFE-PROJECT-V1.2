import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Stats from "./Stats";
import ReportsChart from "./ReportsChart";
import TodayActivity from "./TodayActivity";
import PieChart from "./PieChart";
import { useReportStats } from "../../hooks/useReportStats";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("last") || "all";

  const {
    data: incidentsStats,
    isLoading: loadingIncidents,
    error: errorIncidents,
  } = useReportStats("incidents", filter);

  const {
    data: hazardsStats,
    isLoading: loadingHazards,
    error: errorHazards,
  } = useReportStats("hazards", filter);

  const {
    data: observationsStats,
    isLoading: loadingObservations,
    error: errorObservations,
  } = useReportStats("observations", filter);

  const {
    data: nearMissStats,
    isLoading: loadingNearMiss,
    error: errorNearMiss,
  } = useReportStats("nearMiss", filter);

  const isLoading =
    loadingIncidents ||
    loadingHazards ||
    loadingObservations ||
    loadingNearMiss;

  const hasError =
    errorIncidents || errorHazards || errorObservations || errorNearMiss;

  if (isLoading) return <Spinner />;
  if (hasError) return <p>Error loading dashboard stats :(</p>;

  const numReports =
    Number(incidentsStats?.total_reports || 0) +
    Number(hazardsStats?.total_reports || 0) +
    Number(observationsStats?.total_reports || 0) +
    Number(nearMissStats?.total_reports || 0);

  const pendingReports =
    Number(incidentsStats?.pending_reports || 0) +
    Number(hazardsStats?.pending_reports || 0) +
    Number(observationsStats?.pending_reports || 0) +
    Number(nearMissStats?.pending_reports || 0);

  const numEmployees = incidentsStats?.unique_employees || 0;

  const numHighSeverity =
    Number(incidentsStats?.high_severity_count || 0) +
    Number(hazardsStats?.high_severity_count || 0) +
    Number(observationsStats?.high_severity_count || 0) +
    Number(nearMissStats?.high_severity_count || 0);

  return (
    <StyledDashboardLayout>
      <Stats
        numReports={numReports}
        pendingReports={pendingReports}
        numEmployees={numEmployees}
        numHighSeverity={numHighSeverity}
      />
      <TodayActivity />
      <PieChart
        incidentsStats={incidentsStats}
        hazardsStats={hazardsStats}
        observationsStats={observationsStats}
        nearMissStats={nearMissStats}
      />
      <ReportsChart />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
