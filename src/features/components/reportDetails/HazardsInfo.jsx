import DataItem from "../../../ui/DataItem";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineTag,
} from "react-icons/hi2";

function HazardsInfo({ report }) {
  return (
    <>
      <h3 className="font-semibold text-lg mb-2">Additional Information</h3>

      {report.picture ? (
        <div className="mb-4">
          <img
            src={report.picture}
            alt="Hazard"
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>
      ) : (
        <p className="text-sm italic mb-4">No picture available</p>
      )}

      <DataItem
        icon={<HiOutlineChatBubbleBottomCenterText />}
        label="Equipment Involved:"
      >
        {report.equipment_name || "No equipment specified"}
      </DataItem>
      <DataItem icon={<HiOutlineTag />} label="Hazard Group:">
        {report.type || "No hazard group specified"}
      </DataItem>
      <DataItem
        icon={<HiOutlineChatBubbleBottomCenterText />}
        label="Risk Level:"
      >
        {report.risk_level || "No risk level provided"}
      </DataItem>
      <DataItem icon={<HiOutlineTag />} label="Preventive Measures:">
        {report.lt_preventive_measures?.join(", ") ||
          "No preventive measures provided"}
      </DataItem>
      <DataItem icon={<HiOutlineTag />} label="Temperature:">
        {report.temperature || "No temperature provided"}
      </DataItem>
      <DataItem icon={<HiOutlineTag />} label="Noise Level:">
        {report.noise_level || "No noise level provided"}
      </DataItem>
      <DataItem icon={<HiOutlineTag />} label="Lighting:">
        {report.lighting || "No lighting provided"}
      </DataItem>
      <DataItem icon={<HiOutlineTag />} label="Weather Condition:">
        {report.weather_condition || "No weather condition provided"}
      </DataItem>
    </>
  );
}
export default HazardsInfo;
