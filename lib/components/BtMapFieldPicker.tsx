"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { LeafletMouseEvent } from "leaflet";
import { Polygon, Polyline, Popup, useMapEvents } from "react-leaflet";
import { BtMap } from "./BtMap";
import { BtMarker } from "./BtMarker";
import Divider from "@mui/material/Divider";

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
          position={position}
          onChange={(newPosition) => handleMarkerChange(index, newPosition)}
        >
          <Popup>
            <Box
              minWidth="150px"
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Typography variant="body2" color="text.secondary" noWrap>
                Konum {index + 1}
              </Typography>
              <IconButton
                size="small"
                title="sil"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setPositions?.((currPositions) =>
                    currPositions.filter((_, i) => i !== index)
                  );
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Divider />
            <table>
              <tbody>
                <tr>
                  <td>
                    <Typography
                      style={{ margin: 0 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Enlem
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      style={{ margin: 0 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {position[0].toFixed(6)}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography
                      style={{ margin: 0 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Boylam
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      style={{ margin: 0 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {position[1].toFixed(6)}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </Popup>
        </BtMarker>
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
