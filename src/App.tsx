import EsriConfig from "@arcgis/core/config";

// import { ThreeDMap } from "./components/ThreeDMap";
import { DrawPolygon } from "./components/DrawPolygon";

import "./app.css";

function App() {
  EsriConfig.apiKey = import.meta.env.VITE_ARCHGIS_API_KEY;

  const configs = {
    center: [55.18121, 25.034787],
    zoomLevel: 15,
  };

  return (
    <div>
      {/* <ThreeDMap {...configs} /> */}
      <DrawPolygon
        {...configs}
        onComplete={(points) => {
          console.info("points", points);
        }}
      />
    </div>
  );
}

export default App;
