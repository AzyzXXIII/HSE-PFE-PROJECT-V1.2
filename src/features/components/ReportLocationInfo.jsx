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
        <p>
          <strong>Name:</strong> {location.name}
        </p>
        <p>
          <strong>Department:</strong> {location.department}
        </p>
        <p>
          <strong>Area Type:</strong> {location.area_type}
        </p>
        <p>
          <strong>Floor:</strong> {location.floor}
        </p>
        <p>
          <strong>Location Code:</strong> {location.location_code}
        </p>
        <p>
          <strong>Capacity:</strong> {location.capacity}
        </p>
        <p>
          <strong>Hazard Level:</strong> {location.hazard_level}
        </p>
        <p>
          <strong>Description:</strong> {location.loc_description}
        </p>

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
