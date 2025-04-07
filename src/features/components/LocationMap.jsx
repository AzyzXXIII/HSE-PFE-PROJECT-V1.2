import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon bug
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMap = ({ lat, lng, label }) => {
  if (!lat || !lng) return <p>📍 Location coordinates not available</p>;
  return (
    <div className="mt-4 mb-6">
      <MapContainer
        center={[lat, lng]}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: "250px", width: "100%", borderRadius: "0.5rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lng]}>
          <Popup>{label || "Hazard Location"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
