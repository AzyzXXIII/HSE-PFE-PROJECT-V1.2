import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineExclamationCircle,
  HiOutlineShieldCheck,
  HiOutlineEye,
} from "react-icons/hi";
import Button from "../ui/Button";

const ReportCard = styled.div`
  width: 300px;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  text-align: center;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ReportImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ReportTag = styled.span`
  display: inline-block;
  background-color: ${(props) => props.bgColor || "#ddd"};
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.4rem 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const ReportTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ReportStats = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Icon = styled.span`
  font-size: 1.5rem;
  color: ${(props) => props.color || "#333"};
`;

function ReportCardComponent({ type, count, employees, image }) {
  const navigate = useNavigate();

  const reportData = {
    incident: {
      tag: "Incident",
      bgColor: "#FF6347",
      icon: <HiOutlineExclamationCircle />,
      color: "#FF6347",
    },
    hazard: {
      tag: "Hazard",
      bgColor: "#FFA500",
      icon: <HiOutlineShieldCheck />,
      color: "#FFA500",
    },
    observation: {
      tag: "Observation",
      bgColor: "#28A745",
      icon: <HiOutlineEye />,
      color: "#28A745",
    },
  };

  const { tag, bgColor, icon, color } = reportData[type] || {};

  return (
    <ReportCard onClick={() => navigate(`/reports/${type}`)}>
      <ReportImage src={image} alt={tag} />
      <ReportTag bgColor={bgColor}>{tag}</ReportTag>
      <ReportTitle>
        <strong>{tag} </strong>Reports
      </ReportTitle>
      <ReportStats>
        <Icon color={color}>{icon}</Icon> <strong>{count} reports</strong>
      </ReportStats>
      <ReportStats>
        <strong>{employees} Employees</strong>
      </ReportStats>
      <Button variation="primary" size="medium">
        View Reports
      </Button>
    </ReportCard>
  );
}

export default ReportCardComponent;
