// components/map/LeafletMap.tsx
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
import L from "leaflet";

interface LeafletMapProps {
  setDragDisabled: (value: boolean) => void;
  form: any;
  updateCoordinates: (latitude: number, longitude: number) => void;
}
// @ts-ignore todo: fix this @MaximeDan
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/icons/marker-icon-2x.png",
  iconUrl: "/icons/marker-icon.png",
  shadowUrl: "/icons/marker-shadow.png",
});

const LeafletMap: React.FC<LeafletMapProps> = ({
  setDragDisabled,
  form,
  updateCoordinates,
}) => {
  const [points, setPoints] = useState<CustomPoint[]>([]);
  const center = { lat: 49.4431, lon: 1.0993 };
  const zoom = 13;

  useEffect(() => {
    const loadPoints = async () => {
      try {
        const data = await fetchPoints();
        setPoints(data);
      } catch (error) {
        console.error("Error fetching points of interest:", error);
      }
    };

    loadPoints();
  }, []);

  const handleMarkerClick = (latitude: number, longitude: number) => {
    updateCoordinates(latitude, longitude);
  };

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
        <Marker
          key={point.id}
          position={[point.latitude, point.longitude]}
          eventHandlers={{
            click: () => handleMarkerClick(point.latitude, point.longitude),
          }}
        >
          <Popup>
            <strong>{point.name}</strong>
            <p>{point.description}</p>
          </Popup>
        </Marker>
      ))}
      <ZoomControl position="bottomleft" />
    </MapContainer>
  );
};

export default LeafletMap;
