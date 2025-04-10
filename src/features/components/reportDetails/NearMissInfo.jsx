function NearMissInfo({ report }) {
  return (
    <>
      <h3 className="font-semibold text-lg mb-2">Additional Information</h3>
      <p>
        <strong>Near miss details:</strong>{" "}
        {report.nearMissDetails || "No details available"}
      </p>
      <p>
        <strong>Preventative measures:</strong>{" "}
        {report.preventativeMeasures || "No measures listed"}
      </p>
    </>
  );
}
export default NearMissInfo;
