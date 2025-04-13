import { useMap } from "react-leaflet";

interface Props {
  unitPositions: [number, number][];
}

export function BtMainMapUnitEvents({ unitPositions }: Props) {
  const map = useMap();

  if (unitPositions.length > 0) {
    map.fitBounds(unitPositions, {
      padding: [50, 50],
    });
  }

  return null;
}