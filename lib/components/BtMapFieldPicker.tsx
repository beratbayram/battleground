"use client";

import { LeafletMouseEvent } from "leaflet";
import { Polygon, Polyline, useMapEvents } from "react-leaflet";
import { BtMap } from "./BtMap";
import { BtMarker } from "./BtMarker";

interface EventsProps {
  onClick?: (event: LeafletMouseEvent) => void;
  positions?: [number, number][];
}

function Events({ onClick, positions }: EventsProps) {
  const map = useMapEvents({
    click: onClick,
  });

  if (positions && positions.length > 0) {
    map.fitBounds(positions, {
      padding: [50, 50],
      animate: true,
      duration: 0.5,
    });
  }
  return null;
}

interface BtMapFieldPickerProps {
  positions?: [number, number][];
  setPositions?: React.Dispatch<React.SetStateAction<[number, number][]>>;
  withPolyline?: boolean;
  focusOnSelections?: boolean;
  
}

export function BtMapFieldPicker({
  positions = [],
  setPositions,
  withPolyline = false,
  focusOnSelections = false,
}: BtMapFieldPickerProps) {
  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    const newPosition: [number, number] = [lat, lng];
    setPositions?.((currPositions) => [...currPositions, newPosition]);
  }

  function handleMarkerChange(index: number, newPosition: [number, number]) {
    setPositions?.((currPositions) =>
      currPositions.map((pos, i) => (i === index ? newPosition : pos))
    );
  }

  return (
    <BtMap>
      {positions.map((position, index) => (
        <BtMarker
          key={index}
          index={index}
          position={position}
          setPositions={setPositions}
          onChange={(newPosition) => handleMarkerChange(index, newPosition)}
        />
      ))}
      {withPolyline ? (
        <Polyline positions={positions} />
      ) : (
        <Polygon positions={positions} />
      )}

      <Events
        onClick={handleMapClick}
        positions={focusOnSelections ? positions : []}
      />
    </BtMap>
  );
}
