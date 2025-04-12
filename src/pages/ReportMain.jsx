import ReportCardComponent from "./ReportCardComponent";
import incidentImg from "../assets/incident.svg";
import hazardImg from "../assets/hazard.svg";
import observationImg from "../assets/observation.svg";
import nearMissImg from "../assets/nearmiss.svg";
import { useReportStats } from "../hooks/useReportStats";

function ReportsPage() {
  const incidentStats = useReportStats("incidents");
  const hazardStats = useReportStats("hazards");
  const observationStats = useReportStats("observations");
  const nearMissStats = useReportStats("nearMiss");

  const reportStats = [
    { type: "incidents", image: incidentImg, stats: incidentStats },
    { type: "hazards", image: hazardImg, stats: hazardStats },
    { type: "observations", image: observationImg, stats: observationStats },
    { type: "nearMiss", image: nearMissImg, stats: nearMissStats },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        marginTop: "2rem",
        flexWrap: "wrap",
      }}
    >
      {reportStats.map((report) => {
        const { data, isLoading, isError } = report.stats;

        return (
          <ReportCardComponent
            key={report.type}
            type={report.type}
            image={report.image}
            stats={
              isLoading
                ? {
                    total_reports: "...",
                    pending_reports: "...",
                    unique_employees: "...",
                  }
                : isError
                ? {
                    total_reports: "Error",
                    pending_reports: "-",
                    unique_employees: "-",
                  }
                : data
            }
          />
        );
      })}
    </div>
  );
}

export default ReportsPage;
