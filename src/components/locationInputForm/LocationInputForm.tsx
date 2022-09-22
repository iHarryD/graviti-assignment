import styles from "./LocationInputForm.module.css";
import { PrimaryInput, LabelWithInput, PrimaryButton } from "../styled";
import { Autocomplete } from "@react-google-maps/api";
import { useDirection } from "../../contexts/DirectionContext";
import { useRef, useState } from "react";

export function LocationInputForm({
  hasScriptLoaded,
}: {
  hasScriptLoaded: boolean;
}) {
  const { setDestination, setDirection, setDistance, setEta, setOrigin } =
    useDirection();
  const originRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  async function calculateRoute() {
    if (
      destinationRef.current &&
      originRef.current &&
      destinationRef.current.value.replaceAll(" ", "").length === 0 &&
      originRef.current.value.replaceAll(" ", "").length === 0
    )
      return;
    try {
      setIsCalculating(true);
      const directionService = new google.maps.DirectionsService();
      const direction = await directionService.route({
        destination: destinationRef.current!.value,
        origin: originRef.current!.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      const destinationResult = direction.routes[0].legs[0].end_address;
      const distanceResult = direction.routes[0].legs[0].distance?.text || "";
      const etaResult = direction.routes[0].legs[0].duration?.text || "";
      const originResult = direction.routes[0].legs[0].start_address;
      setDestination(destinationResult);
      setDirection(direction);
      setDistance(distanceResult);
      setEta(etaResult);
      setOrigin(originResult);
    } catch (e) {
      console.log(e);
    } finally {
      setIsCalculating(false);
    }
  }

  return (
    <div className={styles["location-form"]}>
      <div className={styles["inputs-container"]}>
        <LabelWithInput>
          Origin
          {hasScriptLoaded ? (
            <Autocomplete>
              <PrimaryInput placeholder="Delhi" ref={originRef} />
            </Autocomplete>
          ) : (
            <PrimaryInput placeholder="Delhi" readOnly />
          )}
        </LabelWithInput>
        <LabelWithInput>
          Destination
          {hasScriptLoaded ? (
            <Autocomplete>
              <PrimaryInput placeholder="Mumbai" ref={destinationRef} />
            </Autocomplete>
          ) : (
            <PrimaryInput placeholder="Mumbai" readOnly />
          )}
        </LabelWithInput>
      </div>
      <PrimaryButton disabled={isCalculating} onClick={() => calculateRoute()}>
        {isCalculating ? "Calculating..." : "Calculate"}
      </PrimaryButton>
    </div>
  );
}
