import { Marker as LeafletMarker } from "leaflet";
import { ReactNode, useMemo, useRef } from "react";
import { Marker } from "react-leaflet";

interface Props extends React.ComponentProps<typeof Marker> {
  position: [number, number];
  onChange?: (position: [number, number]) => void;
  children?: ReactNode;
}

export function BtMarker({ position, onChange, children }: Props) {
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
    >
      {children}
    </Marker>
  );
}
