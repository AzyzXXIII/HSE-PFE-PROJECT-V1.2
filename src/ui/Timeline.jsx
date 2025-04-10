import styled from "styled-components";
import { format } from "date-fns";

const TimelineContainer = styled.ul`
  list-style: none;
  padding-left: 1.5rem;
  border-left: 2px solid var(--color-brand-600);
`;

const TimelineItem = styled.li`
  margin-bottom: 1.5rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -10px;
    top: 4px;
    width: 10px;
    height: 10px;
    background-color: var(--color-brand-600);
    border-radius: 50%;
  }
`;

const Action = styled.p`
  margin: 0;
  font-weight: 500;
`;

const DateText = styled.span`
  font-size: 0.85rem;
  color: var(--color-grey-600);
`;

function Timeline({ actions }) {
  return (
    <TimelineContainer>
      {actions.map((item, index) => (
        <TimelineItem key={index}>
          <Action>{item.action}</Action>
          {item.date && (
            <DateText>
              {format(new Date(item.date), "MMM dd yyyy, hh:mm a")}
            </DateText>
          )}
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
}

export default Timeline;
