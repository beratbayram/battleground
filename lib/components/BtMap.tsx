// https://www.npmjs.com/package/leaflet-defaulticon-compatibility#usage
import "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet/dist/leaflet.css";

import { ComponentProps } from "react";
import { MapContainer, TileLayer } from "react-leaflet";


function BtTileLayer() {
  return (
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  );
}

export function BtMap(props: ComponentProps<typeof MapContainer>) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      {...props}
    >
      <BtTileLayer />
      {props.children}
    </MapContainer>
  );
}
