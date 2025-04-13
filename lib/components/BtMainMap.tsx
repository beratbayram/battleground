"use client";

import { Field } from "@/generated/prisma";
import { Typography } from "@mui/material";
import { LeafletMouseEvent } from "leaflet";
import { Polygon, Popup, useMapEvents } from "react-leaflet";
import { BtMap } from "./BtMap";

interface EventsProps {
  onClick?: (event: LeafletMouseEvent) => void;
  positions?: [number, number][][];
  focusIndex?: number;
}

function noop() {}

function Events({ onClick, positions, focusIndex }: EventsProps) {
  const map = useMapEvents({
    click: onClick ?? noop,
  });

  if (focusIndex !== undefined && focusIndex !== -1) {
    const focusPosition = positions?.[focusIndex];

    if (focusPosition) {
      map.fitBounds(focusPosition, {
        padding: [50, 50],
        animate: true,
        duration: 0.5,
      });
    }
  }
  return null;
}

interface BtMapFieldPickerProps {
  fields?: Field[];
  focusIndex?: number;
}

export function BtMainMap({
  fields = [],
  focusIndex = -1,
}: BtMapFieldPickerProps) {

  const positions: [number, number][][] = fields.map((field) =>
    JSON.parse(field.coordinates)
  );

  return (
    <BtMap>

      {positions.map((position, index) => (
        <Polygon
          key={index}
          positions={position}
        >
          <Popup>
            <Typography variant="body2" color="text.secondary">
              {fields[index].name}
            </Typography>
          </Popup>
        </Polygon>
      ))}

      <Events positions={positions} focusIndex={focusIndex} />
    </BtMap>
  );
}
