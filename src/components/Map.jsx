import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; //Integration Of Maps
import "./Map.css";

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setUserLocation([lat, lon]);
          findNearbyDumpingYards(lat, lon);
        },
        (err) => {
          alert("Please allow location access to find nearby dumping yards.");
          console.error(err);
        }
      );
    } else {
      alert("Geolocation is not supported in your browser.");
    }
  }, []);

  const findNearbyDumpingYards = async (lat, lon) => {
    try {
      const keywords = [
        "waste disposal",
        "recycling center",
        "landfill",
        "dumping yard",
      ];
      let results = [];
      for (const word of keywords) {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${word}&bounded=1&viewbox=${
            lon - 0.3
          },${lat + 0.3},${lon + 0.3},${lat - 0.3}&limit=10` //api
        );
        const data = await res.json();
        results = [...results, ...data];
      }
      setPlaces(results);
    } catch (err) {
      console.error("Error fetching nearby places:", err);
    }
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <h2>Nearest Waste Disposal Locations</h2>
        <p>Find nearby dumping yards and recycling centers easily.</p>
      </div>

      <div className="map-wrapper">
        {userLocation ? (
          <MapContainer center={userLocation} zoom={13} className="leaflet-map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            <Marker position={userLocation} className="User-box">
              <Popup>
                <strong>📍 You are here</strong>
                <br />
                We’re showing nearby dumping yards.
              </Popup>
            </Marker>

            {places.length > 0 ? (
              places.map((p, i) => (
                <Marker
                  key={i}
                  position={[parseFloat(p.lat), parseFloat(p.lon)]}
                  className="Garbage-box"
                  icon={
                    new L.Icon({
                      iconUrl:
                        "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                      iconSize: [35, 35],
                    })
                  }
                >
                  <Popup className="garbage-pop">
                    <strong>{p.display_name.split(",")[0]}</strong>
                    <br />
                    <small style={{ color: "#aaa" }}>
                      {p.display_name.split(",").slice(1, 3).join(", ")}
                    </small>
                    <br />
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🚗 Get Directions
                    </a>
                  </Popup>
                </Marker>
              ))
            ) : (
              <Popup position={userLocation}>
                Searching for nearby dumping yards...
              </Popup>
            )}
          </MapContainer>
        ) : (
          <div className="loading-msg">
            <div className="spinner"></div>
            <p>Fetching your location...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
