import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineExclamationCircle,
  HiOutlineShieldCheck,
  HiOutlineEye,
} from "react-icons/hi";
import { IoPeople } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import Button from "../ui/Button";
import DataItem from "../ui/DataItem";
import { mockData } from "../data/mockReports"; // Import mock data

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
  background-color: ${(props) => props.$bgColor || "#ddd"};
  color: white;
  font-size: 1.2rem;
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

const ReportStats = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #555;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Icon = styled.span`
  font-size: 1.8em;
  color: ${(props) => props.color || "#333"};
`;

function ReportCardComponent({ type, image }) {
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
    nearMiss: {
      tag: "Near Miss",
      bgColor: "#007BFF",
      icon: <HiOutlineShieldCheck />, // Change icon if needed
      color: "#007BFF",
    },
  };

  const { tag, bgColor, icon, color } = reportData[type] || {};
  const reports = mockData[type] || [];
  const reportCount = reports.length;
  const uniqueEmployees = new Set(reports.map((r) => r.submittedBy)).size;

  return (
    <ReportCard onClick={() => navigate(`/reports?type=${type}`)}>
      <ReportImage src={image} alt={tag} />
      <ReportTag $bgColor={bgColor}>{tag}</ReportTag>
      <ReportTitle>
        <strong>{tag} </strong>Reports
      </ReportTitle>
      <ReportStats>
        <Icon color={color}>{icon}</Icon> <strong>{reportCount} Reports</strong>
      </ReportStats>
      <ReportStats>
        <span>
          <DataItem
            icon={<IoPeople />}
            label={`${uniqueEmployees} Employees`}
          />
        </span>
      </ReportStats>
      <ReportStats>
        <DataItem
          icon={<MdOutlinePendingActions />}
          label={`${reportCount} in Pending`}
        />
      </ReportStats>

      <Button $variation="primary" $size="medium">
        View Reports
      </Button>
    </ReportCard>
  );
}

export default ReportCardComponent;
