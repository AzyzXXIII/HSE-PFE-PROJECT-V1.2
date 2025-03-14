import styled from "styled-components";
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
  overflow: scroll;
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

// Hardcoded data for recent reports
const activities = [
  {
    id: 1,
    type: "Incident",
    title: "Equipment malfunction",
    status: "pending",
  },
  { id: 2, type: "Hazard", title: "Slippery floor", status: "resolved" },
  {
    id: 3,
    type: "Observation",
    title: "Improper storage",
    status: "escalated",
  },
  {
    id: 4,
    type: "Near Miss",
    title: "Falling object avoided",
    status: "pending",
  },
  {
    id: 5,
    type: "Incident",
    title: "Chemical spill in lab",
    status: "resolved",
  },
];

function TodayActivity() {
  const isLoading = false; // Simulating a non-loading state

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Recent Submissions</Heading>
      </Row>

      {!isLoading ? (
        activities.length > 0 ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem report={activity} key={activity.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
