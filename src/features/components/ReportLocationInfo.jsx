import { HiOutlineTag } from "react-icons/hi2";
import DataItem from "../../ui/DataItem";
import LocationMap from "./LocationMap";

function ReportLocationInfo({ location }) {
  if (!location) {
    return <p className="italic text-sm">No location data available</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-md mb-2">Location Info:</h3>
      <div className="pl-4 space-y-1 text-sm">
        <DataItem icon={<HiOutlineTag />} label="Map Location:" />
        {location.latitude && location.longitude ? (
          <LocationMap
            lat={parseFloat(location.latitude)}
            lng={parseFloat(location.longitude)}
            label={location.name}
          />
        ) : (
          <p className="pl-8 text-sm italic">Coordinates not available</p>
        )}
      </div>
    </div>
  );
}

export default ReportLocationInfo;
