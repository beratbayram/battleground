"use client";

import { Field, Unit, UnitHistory } from "@/generated/prisma";
import { Typography } from "@mui/material";
import { LeafletMouseEvent } from "leaflet";
import { Fragment } from "react";
import { Polygon, Polyline, Popup, useMap } from "react-leaflet";
import { BtMap } from "./BtMap";
import { BtMarker } from "./BtMarker";

interface FieldEventsProps {
  onClick?: (event: LeafletMouseEvent) => void;
  fieldPositions?: [number, number][][];
  focusField?: number;
}

function filterUnitHistoryBy(id: number, unitHistory: UnitHistory[]) {
  return unitHistory
    .filter((history) => history.unitId === id)
    .map((history) => [history.lat, history.lng] as [number, number]);
}

function FieldEvents({ fieldPositions, focusField }: FieldEventsProps) {
  const map = useMap();

  if (focusField !== undefined && focusField !== -1) {
    const focusPosition = fieldPositions?.[focusField];

    if (focusPosition) {
      map.fitBounds(focusPosition, {
        padding: [50, 50],
      });
    }
  }
  return null;
}

interface UnitEventsProps {
  unitPositions: [number, number][];
}

function UnitEvents({ unitPositions }: UnitEventsProps) {
  const map = useMap();

  if (unitPositions.length > 0) {
    map.fitBounds(unitPositions, {
      padding: [50, 50],
    });
  }

  return null;
}

interface BtMapFieldPickerProps {
  fields?: Field[];
  focusField?: number;
  units?: Unit[];
  focusUnit?: number;
  unitHistory?: UnitHistory[];
}

export function BtMainMap({
  fields = [],
  focusField = -1,
  units = [],
  focusUnit = -1,
  unitHistory = [],
}: BtMapFieldPickerProps) {
  const fieldPositions: [number, number][][] = fields.map((field) =>
    JSON.parse(field.coordinates)
  );

  return (
    <BtMap>
      {fieldPositions.map((position, index) => (
        <Polygon key={index} positions={position}>
          <Popup>
            <Typography variant="body2" color="text.secondary">
              {fields[index].name}
            </Typography>
          </Popup>
        </Polygon>
      ))}

      {units.map((unit) => {
        const unitPositions = filterUnitHistoryBy(unit.id, unitHistory);

        return (
          <Fragment key={unit.id}>
            {unitPositions.map((position, index) => (
              <BtMarker
                name={unit.name}
                key={index}
                index={index}
                position={position}
              />
            ))}
            <Polyline positions={unitPositions} />
          </Fragment>
        );
      })}

      <FieldEvents fieldPositions={fieldPositions} focusField={focusField} />
      <UnitEvents unitPositions={filterUnitHistoryBy(focusUnit, unitHistory)} />
    </BtMap>
  );
}
