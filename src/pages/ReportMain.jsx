import ReportCardComponent from "./ReportCardComponent";
import incidentImg from "../assets/incident.svg";
import hazardImg from "../assets/hazard.svg";
import observationImg from "../assets/observation.svg";
import nearMissImg from "../assets/nearmiss.svg";

function ReportsPage() {
  const reports = [
    {
      type: "incident",
      count: 35,
      employees: 11,
      image: incidentImg,
    },
    {
      type: "hazards",
      count: 22,
      employees: 17,
      image: hazardImg,
    },
    {
      type: "observations",
      count: 18,
      employees: 23,
      image: observationImg,
    },
    {
      type: "nearMiss",
      count: 12,
      employees: 8,
      image: nearMissImg,
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
