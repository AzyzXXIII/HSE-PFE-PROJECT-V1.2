// ReportsPage.jsx
import { useEffect, useState } from "react";
import ReportCardComponent from "./ReportCardComponent";
import incidentImg from "../assets/incident.svg";
import hazardImg from "../assets/hazard.svg";
import observationImg from "../assets/observation.svg";
import nearMissImg from "../assets/nearmiss.svg";
import axios from "axios";

function ReportsPage() {
  const [reportStats, setReportStats] = useState({});

  const reports = [
    { type: "incidents", image: incidentImg },
    { type: "hazards", image: hazardImg },
    { type: "observations", image: observationImg },
    { type: "nearMiss", image: nearMissImg },
  ];

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const types = ["incidents", "hazards", "observations"];
        const requests = types.map((type) =>
          axios.get(`/api/reports/stats?type=${type}`)
        );

        const responses = await Promise.all(requests);
        const statsMap = {};
        types.forEach((type, i) => {
          statsMap[type] = responses[i].data;
        });

        setReportStats(statsMap);
      } catch (error) {
        console.error("Error fetching report stats:", error);
      }
    };

    fetchAllStats();
  }, []);

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
      {reports.map((report) => (
        <ReportCardComponent
          key={report.type}
          {...report}
          stats={reportStats[report.type]}
        />
      ))}
    </div>
  );
}

export default ReportsPage;
