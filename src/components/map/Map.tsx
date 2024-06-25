// components/Map.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Popup,
} from "react-leaflet";
import { CustomPoint } from "@/types/pointsOfInterests";
import { fetchPoints } from "@/apiClient/fetchPoints";

interface MapProps {
  setDragDisabled: (value: boolean) => void;
}

const Map: React.FC<MapProps> = ({ setDragDisabled }) => {
  const [points, setPoints] = useState<CustomPoint[]>([]);
  const center = { lat: 49.4431, lon: 1.0993 };
  const zoom = 13;

  useEffect(() => {
    const loadPoints = async () => {
      try {
        const data = await fetchPoints();
        console.log(data, "Fetched points:");
        setPoints(data);
      } catch (error) {
        console.error("Error fetching points of interest:", error);
      }
    };

    loadPoints();
  }, []);

  return (
    <MapContainer
      center={[center.lat, center.lon]}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "300px", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => (
        <Marker key={point.id} position={[point.latitude, point.longitude]}>
          <Popup>
            <strong>{point.name}</strong>
          </Popup>
        </Marker>
      ))}
      <ZoomControl position="bottomleft" />
    </MapContainer>
  );
};

export default Map;
