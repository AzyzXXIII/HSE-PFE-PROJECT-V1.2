import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { HiOutlineClock } from "react-icons/hi2";

import Button from "../ui/Button";
import ButtonGroup from "../ui/ButtonGroup";
import Tag from "../ui/Tag";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import ReportDataBox from "./ReportDataBox";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function ReportDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Normal");

  useEffect(() => {
    setTimeout(() => {
      if (location.state?.report) {
        setReport(location.state.report);
        setStatus(location.state.report.status || "Open");
        setPriority(location.state.report.priority || "Normal");
      }
      setIsLoading(false);
    }, 1000);
  }, [location.state?.report]);

  if (isLoading) return <Spinner />;
  if (!report) return <Empty resourceName="report" />;

  const statusToTagName = {
    Open: "blue",
    Closed: "green",
    "In Progress": "silver",
  };

  return (
    <>
      <Header>
        <HeadingGroup>
          <Heading as="h1">Report #{report.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          <span>{report.title}</span>
          <HiOutlineClock />
          <span>{format(new Date(report.date), "MMM dd yyyy, hh:mm a")}</span>
        </HeadingGroup>
      </Header>
      <ReportDataBox
        report={report}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" size="medium">
              Delete Report
            </Button>
          </Modal.Open>

          <Button
            variation="secondary"
            size="medium"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="report"
              onConfirm={() => {
                console.log("Deleted", report.id);
                navigate(-1);
              }}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default ReportDetails;
