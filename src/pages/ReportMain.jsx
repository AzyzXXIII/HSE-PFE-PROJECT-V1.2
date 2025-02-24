import ReportCardComponent from "./ReportCardComponent";
import incidentImg from "../assets/incident.svg";
import hazardImg from "../assets/hazard.svg";
import observationImg from "../assets/observation.svg";
function ReportsPage() {
  const reports = [
    {
      type: "incident",
      count: 35,
      employees: 11,
      image: incidentImg,
    },
    { type: "hazard", count: 22, employees: 17, image: hazardImg },
    {
      type: "observation",
      count: 18,
      employees: 23,
      image: observationImg,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      {reports.map((report) => (
        <ReportCardComponent key={report.type} {...report} />
      ))}
    </div>
  );
}

export default ReportsPage;
