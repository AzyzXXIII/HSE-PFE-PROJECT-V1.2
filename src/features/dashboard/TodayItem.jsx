import styled from "styled-components";
import { Link } from "react-router-dom";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 10rem 1fr 10rem 10rem;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const ReportTitle = styled.div`
  font-weight: 600;
  color: var(--color-grey-900);
  flex: 1;
`;

const ReportType = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-brand-500);
  text-transform: uppercase;
  background-color: var(--color-brand-100);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  text-align: center;
  min-width: 8rem;
`;

function TodayItem({ report = {} }) {
  if (!report || Object.keys(report).length === 0) {
    return null; // Prevents rendering if report is undefined or empty
  }

  const { id, type, title, status } = report;

  return (
    <StyledTodayItem>
      {status === "pending" && <Tag type="yellow">Pending</Tag>}
      {status === "resolved" && <Tag type="green">Resolved</Tag>}
      {status === "escalated" && <Tag type="red">Escalated</Tag>}

      <ReportTitle>{title}</ReportTitle>
      <ReportType>{type}</ReportType>

      <Button
        $size="small"
        $variation="primary"
        as={Link}
        to={`/reports/${id}`}
      >
        View Report
      </Button>
    </StyledTodayItem>
  );
}

export default TodayItem;
