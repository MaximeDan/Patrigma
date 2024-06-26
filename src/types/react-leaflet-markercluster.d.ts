declare module "react-leaflet-markercluster" {
  // eslint-disable-next-line no-unused-vars
  import { Component } from "react";
  import { MarkerClusterGroupOptions } from "leaflet";
  import { MapLayer, MapLayerProps } from "react-leaflet";

  export interface MarkerClusterGroupProps
    extends MarkerClusterGroupOptions,
      MapLayerProps {}

  export default class MarkerClusterGroup extends MapLayer<MarkerClusterGroupProps> {}
}
