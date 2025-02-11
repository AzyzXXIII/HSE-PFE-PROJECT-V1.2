import styled from "styled-components";
import {
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineTag,
  HiChevronDown,
  HiOutlineChatBubbleBottomCenterText,
} from "react-icons/hi2";
import DataItem from "../ui/DataItem";

const Dropdown = styled.select`
  padding: 0.5rem;
  font-size: 1.4rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const DescriptionBox = styled.div`
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;
  background-color: ${(props) =>
    props.hasDescription ? "var(--color-green-100)" : "var(--color-grey-100)"};
  color: ${(props) =>
    props.hasDescription ? "var(--color-green-700)" : "var(--color-grey-800)"};
  font-size: 1.6rem;
  line-height: 1.5;
  font-weight: 400;
`;

const ReportDataBox = ({
  report,
  status,
  setStatus,
  priority,
  setPriority,
}) => {
  return (
    <div>
      <DataItem icon={<HiOutlineUser />} label="Submitted By">
        {report.submittedBy.name} ({report.submittedBy.email})
      </DataItem>

      <DataItem icon={<HiOutlineUser />} label="Assigned To">
        {report.assignedTo.name} ({report.assignedTo.email})
      </DataItem>

      <DataItem icon={<HiOutlineChatBubbleBottomCenterText />} label="Type">
        {report.type}
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="Severity">
        {report.severity}
      </DataItem>

      <DescriptionBox hasDescription={!!report.description}>
        <DataItem icon={<HiOutlineDocumentText />}>
          {report.description ? report.description : "No description provided."}
        </DataItem>
      </DescriptionBox>

      <DataItem icon={<HiOutlineTag />} label="Status">
        <Dropdown value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </Dropdown>
      </DataItem>

      <DataItem icon={<HiChevronDown />} label="Priority">
        <Dropdown
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Normal">Normal</option>
          <option value="Medium">Medium</option>
          <option value="Urgent">Urgent</option>
        </Dropdown>
      </DataItem>
    </div>
  );
};

export default ReportDataBox;
