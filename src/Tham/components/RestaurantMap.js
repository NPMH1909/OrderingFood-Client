import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet
import "../styles/components/restaurantMap.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const RestaurantMap = () => {
  const position = [10.762622, 106.660172]; // Tọa độ cho nhà hàng
  const address = "72 Lê Thánh Tôn, Quận 1, TP. Hồ Chí Minh, Việt Nam";

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    shadowSize: [41, 41],
    iconAnchor: [12, 41],
    shadowAnchor: [12, 41],
  });

  return (
    <div className="card">
      <h2 className="card-title">Vị trí Nhà hàng</h2>
      <p className="card-address">{address}</p>
      <div className="map-container">
        {" "}
        {/* Thêm lớp map-container */}
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={customIcon}>
            <Popup>Đây là nhà hàng của bạn!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default RestaurantMap;
