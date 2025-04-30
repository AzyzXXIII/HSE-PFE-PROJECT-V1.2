function NearMissInfo({ report }) {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-xl shadow-md">
      <h3 className="font-bold text-xl border-b pb-2">🚨 Near Miss Report</h3>

      <div>
        <p>
          <strong>Description:</strong> {report.description}
        </p>
        <p>
          <strong>Potential Consequences:</strong>{" "}
          {report.potential_consequences}
        </p>
        <p>
          <strong>Primary Cause:</strong> {report.primary_cause}
        </p>
        <p>
          <strong>Contributing Factor:</strong> {report.contributing_factor}
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-lg mt-4">🛠 Action & Prevention</h4>
        <p>
          <strong>Action Taken:</strong> {report.action_taken}
        </p>
        <p>
          <strong>Corrective Actions:</strong>
        </p>
        <ul className="list-disc list-inside ml-4">
          {report.corrective_actions?.map((action, idx) => (
            <li key={idx}>{action}</li>
          ))}
        </ul>
        <p>
          <strong>Long-term Preventive Measures:</strong>
        </p>
        <ul className="list-disc list-inside ml-4">
          {report.lt_preventive_measures?.map((measure, idx) => (
            <li key={idx}>{measure}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-lg mt-4">
          🌤 Environmental Conditions
        </h4>
        <p>
          <strong>Weather:</strong> {report.weather_condition}
        </p>
        <p>
          <strong>Lighting:</strong> {report.lighting}
        </p>
        <p>
          <strong>Noise Level:</strong> {report.noise_level}
        </p>
        <p>
          <strong>Temperature:</strong> {report.temperature}
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-lg mt-4">📍 Location & Timing</h4>
        <p>
          <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong> {report.time}
        </p>
        <p>
          <strong>Latitude:</strong> {report.location?.latitude ?? "N/A"}
        </p>
        <p>
          <strong>Longitude:</strong> {report.location?.longitude ?? "N/A"}
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-lg mt-4">👤 Submitted By</h4>
        <p>
          <strong>Name:</strong> {report.first_name} {report.last_name}
        </p>
        <p>
          <strong>Email:</strong> {report.email}
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-lg mt-4">📌 Status</h4>
        <p>
          <strong>Status:</strong> {report.status}
        </p>
        <p>
          <strong>Priority:</strong> {report.priority}
        </p>
        <p>
          <strong>Severity:</strong> {report.severity}
        </p>
        <p>
          <strong>Comment:</strong> {report.comment}
        </p>
      </div>
    </div>
  );
}

export default NearMissInfo;
