// import dropIcon from "../assets/dropit.png";
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapPage = () => {

  useEffect(() => {
    // Create map
    const map = L.map("map").setView([20.34248, 85.82277], 5);

    // Tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // Custom clinic icon
    const clinicIcon = L.icon({
      iconUrl: "http://127.0.0.1:5000/static/dropit.png",  // adjust later for React
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    // 🔹 Load ALL clinics
    fetch("http://127.0.0.1:5000/all_clinics")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((clinic) => {
          L.marker([clinic.lat, clinic.lon], { icon: clinicIcon })
            .addTo(map)
            .bindPopup(clinic.name);
        });
      });

    // Store globally (hack for demo)
    window.mapInstance = map;
    window.clinicIcon = clinicIcon;

  }, []);

  // 🔹 Button click → get location + highlight nearest
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation not supported");
    }
  };

  const showPosition = (position) => {
    const map = window.mapInstance;

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Show user location
    L.marker([lat, lon])
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();

    map.setView([lat, lon], 6);

    // Fetch nearest clinics
    fetch(`http://127.0.0.1:5000/find_clinics?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((data) => {

        data.forEach((clinic, index) => {
          const marker = L.marker([clinic.lat, clinic.lon], {
            icon: window.clinicIcon,
          })
            .addTo(map)
            .bindPopup(clinic.name);

          // Highlight top 3
          if (index < 3) {
            marker.bindPopup("⭐ " + clinic.name).openPopup();

            setTimeout(() => {
              if (marker._icon) {
                marker._icon.classList.add("bounce");
              }
            }, 100);
          }
        });
      });
  };

  return (
    <div>
      <h2>Find Nearby Clinics</h2>
      <button onClick={getLocation}>Find Clinics Near Me</button>

      <div id="map" style={{ height: "500px" }}></div>

      {/* Animation CSS */}
      <style>{`
        .bounce {
          animation: bounce 0.6s infinite alternate;
        }

        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default MapPage;