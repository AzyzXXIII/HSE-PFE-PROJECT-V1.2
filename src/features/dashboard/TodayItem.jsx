import styled from "styled-components";
import { Link } from "react-router-dom";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 10rem 10rem;
  gap: 0rem;
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
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TypeAndStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
  min-width: 8rem;
`;

const ReportType = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-brand-500);
  text-transform: uppercase;
  background-color: var(--color-brand-100);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  text-align: center;
  min-width: 7rem;
`;

function TodayItem({ report = {}, reportType }) {
  if (!report || Object.keys(report).length === 0) {
    return null;
  }

  // Function to get the right title based on report type
  const getTitle = (report, type) => {
    let title = "";

    switch (type) {
      case "incidents":
        title = report.pi_description || "No description";
        break;
      case "hazard":
        title = report.description || "No description";
        break;
      case "observation":
        title = report.title || report.description || "No description";
        break;
      case "nearmiss":
        title = report.description || "No description";
        break;
      default:
        title = report.description || report.title || "No description";
    }

    // Truncate to 25 characters for shorter display
    return title.length > 25 ? title.substring(0, 25) + "..." : title;
  };

  const { id, status } = report;
  const displayTitle = getTitle(report, reportType);
  const displayType = reportType || "report";

  return (
    <StyledTodayItem>
      <ReportTitle>
        {(status === "pending" ||
          status === "resolved" ||
          status === "escalated") && (
          <>
            {status === "pending" && <Tag type="yellow">Pending</Tag>}
            {status === "resolved" && <Tag type="green">Resolved</Tag>}
            {status === "escalated" && <Tag type="red">Escalated</Tag>}
          </>
        )}
        {displayTitle}
      </ReportTitle>

      <TypeAndStatus>
        <ReportType>{displayType}</ReportType>
      </TypeAndStatus>

      <Button
        $size="small"
        $variation="primary"
        as={Link}
        to={`/reports?type=${displayType}`}
      >
        View Reports
      </Button>
    </StyledTodayItem>
  );
}

export default TodayItem;
