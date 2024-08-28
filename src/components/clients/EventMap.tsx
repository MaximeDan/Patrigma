"use client";

import dynamic from "next/dynamic";
import React from "react";

const LeafletEventMap = dynamic(() => import("@/components/map/EventMap"), {
  ssr: false,
});

const EventMap = ({
  longitude,
  latitude,
  name,
}: {
  longitude: any;
  latitude: any;
  name: any;
}) => <LeafletEventMap longitude={longitude} latitude={latitude} name={name} />;

export default EventMap;
