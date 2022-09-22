import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Direction {
  destination: string;
  direction?: google.maps.DirectionsResult;
  distance: string;
  eta: string;
  origin: string;
  setDestination: Dispatch<SetStateAction<string>>;
  setDirection: Dispatch<
    SetStateAction<google.maps.DirectionsResult | undefined>
  >;
  setDistance: Dispatch<SetStateAction<string>>;
  setEta: Dispatch<SetStateAction<string>>;
  setOrigin: Dispatch<SetStateAction<string>>;
}

const DirectionContext = createContext({} as Direction);

export function DirectionProvider({ children }: { children: ReactNode }) {
  const [eta, setEta] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [direction, setDirection] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);
  const [distance, setDistance] = useState<string>("0");
  const [origin, setOrigin] = useState<string>("");

  return (
    <DirectionContext.Provider
      value={{
        destination,
        direction,
        distance,
        eta,
        origin,
        setDestination,
        setDirection,
        setDistance,
        setEta,
        setOrigin,
      }}
    >
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  return useContext(DirectionContext);
}
