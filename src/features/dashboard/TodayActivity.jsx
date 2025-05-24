import styled from "styled-components";
import { useState, useEffect } from "react";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow-y: auto;
  max-height: 300px;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to detect report type based on data structure
  const detectReportType = (report) => {
    if (
      report.pi_description !== undefined ||
      report.primary_incident_type !== undefined
    ) {
      return "incidents";
    }
    if (
      report.potential_consequences !== undefined &&
      report.corrective_actions !== undefined
    ) {
      return "hazards";
    }
    if (report.title !== undefined && report.type_id !== undefined) {
      return "observations";
    }
    if (
      report.potential_consequences !== undefined &&
      report.contributing_factor !== undefined
    ) {
      return "nearmiss";
    }

    // Fallback: check if there's a report_category field from your unified query
    if (report.report_category) {
      return report.report_category;
    }

    return "report"; // default fallback
  };

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch("/api/reports/recent");
        if (!response.ok) throw new Error("Failed to fetch reports");

        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("❌ Error fetching recent submissions:", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReports();
  }, []);

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Recent Submissions</Heading>
      </Row>

      {isLoading ? (
        <Spinner />
      ) : activities.length > 0 ? (
        <TodayList>
          {activities.map((activity) => (
            <TodayItem
              report={activity}
              reportType={detectReportType(activity)}
              key={activity.id}
            />
          ))}
        </TodayList>
      ) : (
        <NoActivity>No activity today...</NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
