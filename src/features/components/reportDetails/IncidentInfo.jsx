import DataItem from "../../../ui/DataItem";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineTag,
  HiOutlineUser,
  HiOutlineGlobeAlt,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi2";
import clsx from "clsx"; // If not installed, run: npm i clsx

function Tag({ value, type }) {
  const colors = {
    severity: {
      Low: "bg-green-100 text-green-700",
      Medium: "bg-yellow-100 text-yellow-700",
      High: "bg-orange-100 text-orange-700",
      Critical: "bg-red-100 text-red-700",
      default: "bg-gray-100 text-gray-700",
    },
    classification: {
      Minor: "bg-blue-100 text-blue-700",
      Major: "bg-purple-100 text-purple-700",
      Fatal: "bg-red-100 text-red-700",
      default: "bg-gray-100 text-gray-700",
    },
  };

  const className = clsx(
    "px-2 py-1 rounded-full text-sm font-medium inline-block",
    colors[type]?.[value] || colors[type]?.default
  );

  return <span className={className}>{value}</span>;
}

function BooleanIcon({ value }) {
  return value ? (
    <span className="flex items-center gap-1 text-green-600">
      <HiCheckCircle className="h-5 w-5" />
      Yes
    </span>
  ) : (
    <span className="flex items-center gap-1 text-red-600">
      <HiXCircle className="h-5 w-5" />
      No
    </span>
  );
}

function IncidentInfo({ report }) {
  if (!report) return null;

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">Incident Information</h3>

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
        <Tag value={report.severity} type="severity" />
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="Potential Severity:">
        <Tag value={report.pi_potential_severity} type="severity" />
      </DataItem>

      <hr className="my-4 border-t" />
      <h4 className="font-semibold text-md">Injury Details</h4>

      <DataItem icon={<HiOutlineTag />} label="Activity:">
        {report.activity || "N/A"}
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="Injury Nature:">
        <div className="flex flex-wrap gap-2">
          {report.injury_nature?.map((item) => (
            <span
              key={item}
              className="bg-gray-100 px-2 py-1 rounded-md text-sm"
            >
              {item}
            </span>
          )) || "N/A"}
        </div>
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="Affected Body Parts:">
        <div className="flex flex-wrap gap-2">
          {report.affected_body_parts?.map((part) => (
            <span
              key={part}
              className="bg-gray-100 px-2 py-1 rounded-md text-sm"
            >
              {part}
            </span>
          )) || "N/A"}
        </div>
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="Classification:">
        <Tag value={report.classification} type="classification" />
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="First Aid Measures:">
        <ul className="list-disc pl-5 text-sm">
          {report.first_aid_measures?.map((m, i) => <li key={i}>{m}</li>) ||
            "N/A"}
        </ul>
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="Lost Time (minutes):">
        {report.lost_time_minutes ?? "N/A"}
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="Days Absent:">
        {report.days_absent ?? "N/A"}
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="Lost Consciousness:">
        <BooleanIcon value={report.lost_consciousness} />
      </DataItem>

      <DataItem icon={<HiOutlineTag />} label="Transferred to Hospital:">
        <BooleanIcon value={report.was_transferred_to_hospital} />
      </DataItem>

      <hr className="my-4 border-t" />
      <h4 className="font-semibold text-md">Injured Person</h4>

      <DataItem icon={<HiOutlineUser />} label="Name:">
        {report.injured_first_name && report.injured_last_name
          ? `${report.injured_first_name} ${report.injured_last_name}`
          : "N/A"}
      </DataItem>

      <DataItem icon={<HiOutlineUser />} label="Email:">
        {report.injured_email || "N/A"}
      </DataItem>

      <hr className="my-4 border-t" />
      <h4 className="font-semibold text-md">Location</h4>

      {report.location && (
        <DataItem icon={<HiOutlineGlobeAlt />} label="Coordinates:">
          {`${report.location.latitude}, ${report.location.longitude}`}
        </DataItem>
      )}

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
