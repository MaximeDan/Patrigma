"use client";

import { useJourneyFormStore } from "@/store/journeyFormStore";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { MapContainer, ZoomControl, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import { addStepSchema } from "@/validators/stepFormSchema";
import { z } from "zod";

type AddStepFormValues = z.infer<typeof addStepSchema>;

type MapProps = {
  setDragDisabled: (value: boolean) => void;
  form: UseFormReturn<AddStepFormValues>;
};

const Map = ({ setDragDisabled, form }: MapProps) => {
  const { editedStep } = useJourneyFormStore();
  return (
    <MapContainer
      center={[49.4431, 1.0993]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        setDragDisabled={setDragDisabled}
        form={form}
        defaultCoordinates={
          editedStep
            ? {
                latitude: editedStep.coordinates.latitude,
                longitude: editedStep.coordinates.longitude,
              }
            : null
        }
      />
      <ZoomControl position="bottomleft" />
    </MapContainer>
  );
};

export default Map;
