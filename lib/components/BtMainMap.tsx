"use client";

import { Field, Unit, UnitHistory } from "@/generated/prisma";
import { Typography } from "@mui/material";
import { Fragment } from "react";
import { Polygon, Polyline, Popup } from "react-leaflet";
import { filterUnitHistoryBy } from "../utils/filterUnitHistoryBy";
import { BtMainMapFieldEvents } from "./BtMainMapFieldEvents";
import { BtMainMapUnitEvents } from "./BtMainMapUnitEvents";
import { BtMap } from "./BtMap";
import { BtMarker } from "./BtMarker";

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

      <BtMainMapFieldEvents
        fieldPositions={fieldPositions}
        focusField={focusField}
      />
      <BtMainMapUnitEvents
        unitPositions={filterUnitHistoryBy(focusUnit, unitHistory)}
      />
    </BtMap>
  );
}
