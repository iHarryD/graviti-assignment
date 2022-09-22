import styles from "./styles/App.module.css";
import { Header, LocationInputForm } from "./components";
import { useLoadScript } from "@react-google-maps/api";
import { Map } from "./components/map/Map";
import { useDirection } from "./contexts/DirectionContext";

const libraries = ["places"] as "places"[];

function App() {
  const loadMapScript = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
    libraries,
  });
  const { destination, direction, distance, eta, origin } = useDirection();
  return (
    <div className="App">
      <Header />
      <main className={styles["main"]}>
        <p className={styles["page-title"]}>
          Let's calculate <strong>distance</strong> from Google maps
        </p>
        <div className={styles["sections-container"]}>
          <section className={styles["result-section"]}>
            <LocationInputForm hasScriptLoaded={loadMapScript.isLoaded} />
            {direction && (
              <div className={styles["result-container"]}>
                <div
                  className={`${styles["result-row"]} ${styles["result-upper-row"]}`}
                >
                  <span>Distance</span>
                  <span className={styles["result"]}>{distance}</span>
                </div>
                <div className={styles["result-row"]}>
                  <p>
                    The distance between <strong>{origin}</strong> and{" "}
                    <strong>{destination}</strong> is{" "}
                    <strong>{distance}</strong>
                  </p>
                  <p>
                    ETA: <strong>{eta}</strong>
                  </p>
                </div>
              </div>
            )}
          </section>
          <section className={styles["map-section"]}>
            {loadMapScript.isLoaded && <Map />}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
