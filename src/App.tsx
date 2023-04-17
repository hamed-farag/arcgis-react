import EsriConfig from "@arcgis/core/config";

import { ThreeDMap } from "./components/ThreeDMap";
import { DrawPolygon } from "./components/DrawPolygon";

import "./app.css";

function App() {
  EsriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;

  const configs = {
    center: [55.18121, 25.034787],
    zoomLevel: 15,
  };

  return (
    <div>
      <div>
        <h1>3D Map</h1>
        <ThreeDMap {...configs} />
      </div>
      <div>
        <h1>Draw Polygon</h1>
        <DrawPolygon
          {...configs}
          onComplete={(points) => {
            console.info("points", points);
          }}
        />
      </div>
    </div>
  );
}

export default App;
