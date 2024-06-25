import { addStepSchema } from "@/validators/stepFormSchema";
import L, { LatLng } from "leaflet";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useMapEvents, Marker } from "react-leaflet";
import { z } from "zod";

type AddStepFormValues = z.infer<typeof addStepSchema>;

type LocationMarkerProps = {
  setDragDisabled: (value: boolean) => void;
  form: UseFormReturn<AddStepFormValues>;
  defaultCoordinates: {
    latitude: number;
    longitude: number;
  } | null;
};

const LocationMarker = ({
  setDragDisabled,
  form,
  defaultCoordinates,
}: LocationMarkerProps) => {
  const defaultPosition = defaultCoordinates
    ? new L.LatLng(defaultCoordinates.latitude, defaultCoordinates.longitude)
    : null;
  const [position, setPosition] = useState<LatLng | null>(defaultPosition);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      form.setValue("coordinates", `${e.latlng.lat};${e.latlng.lng}`);
      form.trigger("coordinates");
    },
    dragstart() {
      setDragDisabled(true);
    },
    dragend() {
      setDragDisabled(false);
    },
  });

  const myIcon = L.icon({
    iconUrl: "/img/marker.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return position === null ? null : (
    <Marker icon={myIcon} position={position} />
  );
};

export default LocationMarker;
