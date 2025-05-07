import styled from "styled-components";
import { useState, useEffect } from "react";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
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

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReports() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/reports/recent");

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setActivities(data);
      } catch (error) {
        setError(error.message);
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
      ) : error ? (
        <NoActivity>{error}</NoActivity>
      ) : activities.length > 0 ? (
        <TodayList>
          {activities.map((activity) => (
            <TodayItem report={activity} key={activity.id} />
          ))}
        </TodayList>
      ) : (
        <NoActivity>No recent submissions...</NoActivity>
      )}
    </StyledToday>
  );
}

export default RecentActivity;
