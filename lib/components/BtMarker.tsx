import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Marker as LeafletMarker } from "leaflet";
import { useMemo, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props extends React.ComponentProps<typeof Marker> {
  position: [number, number];
  setPositions?: React.Dispatch<React.SetStateAction<[number, number][]>>;
  onChange?: (position: [number, number]) => void;
  index: number;
  name?: string;
}

export function BtMarker({
  position,
  setPositions,
  onChange,
  index,
  name,
  ...props
}: Props) {
  const markerRef = useRef<LeafletMarker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latLng = marker.getLatLng();
          onChange?.([latLng.lat, latLng.lng]);
        }
      },
    }),
    [onChange]
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      {...props}
    >
      <Popup>
        <Box
          minWidth="150px"
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Typography variant="body2" color="text.secondary" noWrap>
            {name ?? "Konum"} - {index + 1}
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
    </Marker>
  );
}
