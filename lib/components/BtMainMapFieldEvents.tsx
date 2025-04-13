import { LeafletMouseEvent } from "leaflet";
import { useMap } from "react-leaflet";

interface Props {
  onClick?: (event: LeafletMouseEvent) => void;
  fieldPositions?: [number, number][][];
  focusField?: number;
}

export function BtMainMapFieldEvents({ fieldPositions, focusField }: Props) {
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