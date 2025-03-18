import ReportCardComponent from "./ReportCardComponent";
import incidentImg from "../assets/incident.svg";
import hazardImg from "../assets/hazard.svg";
import observationImg from "../assets/observation.svg";
import nearMissImg from "../assets/nearmiss.svg"; // ✅ Add Near Miss image

function ReportsPage() {
  const reports = [
    {
      type: "incident",
      count: 35,
      employees: 11,
      image: incidentImg,
    },
    {
      type: "hazard",
      count: 22,
      employees: 17,
      image: hazardImg,
    },
    {
      type: "observation",
      count: 18,
      employees: 23,
      image: observationImg,
    },
    {
      type: "nearMiss", // ✅ Add Near Miss
      count: 12, // Example count
      employees: 8, // Example employees
      image: nearMissImg, // ✅ Use the correct image
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
