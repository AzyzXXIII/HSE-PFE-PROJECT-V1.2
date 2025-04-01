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

const DescriptionBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hasDescription", // This ensures `hasDescription` is not forwarded
})`
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

  ${(props) =>
    props.hasDescription &&
    `
    background-color: var(--color-green-100);
    color: var(--color-green-700);
  `}
`;

const ReportDataBox = ({
  report,
  status,
  setStatus,
  priority,
  setPriority,
}) => {
  return (
    console.log(report.history_actions),
    (
      <div>
        <DataItem icon={<HiOutlineUser />} label="Submitted By">
          {report.first_name
            ? `${report.first_name} ${report.last_name} (${report.email})`
            : "No name or email provided"}
        </DataItem>

        <DataItem icon={<HiOutlineChatBubbleBottomCenterText />} label="Type">
          {report.type || "No type provided"}
        </DataItem>

        <DataItem icon={<HiOutlineTag />} label="Severity">
          {report.severity || "No severity provided"}
        </DataItem>

        <DataItem icon={<HiOutlineChatBubbleBottomCenterText />} label="Cause">
          {report.cause || "No casue provided"}
        </DataItem>
        <DataItem icon={<HiOutlineTag />} label="Action Taken">
          {Array.isArray(report.action_taken)
            ? report.action_taken.join(", ") // Join array elements into a string
            : report.action_taken || "No action taken"}
        </DataItem>

        <DataItem
          icon={<HiOutlineChatBubbleBottomCenterText />}
          label="Recommendations"
        >
          {Array.isArray(report.recommendation)
            ? report.recommendation.join(", ") // Join array elements into a string
            : report.recommendation || "No recommendation provided"}
        </DataItem>

        <DescriptionBox hasDescription={!!report.description}>
          <DataItem icon={<HiOutlineDocumentText />}>
            {report.description
              ? report.description
              : "No description provided."}
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
    )
  );
};

export default ReportDataBox;
