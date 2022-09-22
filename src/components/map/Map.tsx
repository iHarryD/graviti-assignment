import styles from "./Map.module.css";
import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import { useDirection } from "../../contexts/DirectionContext";

export function Map() {
  const { direction } = useDirection();
  const coordinates = { lat: 35, lng: 139 };
  return (
    <GoogleMap
      center={coordinates}
      mapContainerClassName={styles["map"]}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
      }}
      zoom={10}
    >
      {direction && <DirectionsRenderer directions={direction} />}
    </GoogleMap>
  );
}
