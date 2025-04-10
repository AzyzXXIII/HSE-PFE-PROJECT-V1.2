import DataItem from "../../../ui/DataItem";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineTag,
} from "react-icons/hi2";

function IncidentInfo({ report }) {
  if (!report) return null;

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Incident Information</h3>

      <DataItem icon={<HiOutlineTag />} label="Primary Incident Type:">
        {report.type || "N/A"}
      </DataItem>

      <DataItem
        icon={<HiOutlineChatBubbleBottomCenterText />}
        label="Description:"
      >
        {report.description || "N/A"}
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="Actual Severity:">
        {report.severity || "N/A"}
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="Potential Severity:">
        {report.pi_potential_severity || "N/A"}
      </DataItem>

      {report.si_description && (
        <>
          <DataItem
            icon={<HiOutlineTag />}
            label="Secondary Incident Description:"
          >
            {report.si_description}
          </DataItem>
          <DataItem icon={<HiOutlineTag />} label="Secondary Actual Severity:">
            {report.si_actual_severity || "N/A"}
          </DataItem>
          <DataItem
            icon={<HiOutlineTag />}
            label="Secondary Potential Severity:"
          >
            {report.si_potential_severity || "N/A"}
          </DataItem>
        </>
      )}

      <DataItem icon={<HiOutlineChatBubbleBottomCenterText />} label="Cause:">
        {report.cause || "N/A"}
      </DataItem>

      <DataItem
        icon={<HiOutlineChatBubbleBottomCenterText />}
        label="Action Taken:"
      >
        {report.action_taken || "N/A"}
      </DataItem>

      {report.picture && typeof report.picture === "string" && (
        <div className="mt-4">
          <img
            src={report.picture}
            alt="Incident"
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default IncidentInfo;
