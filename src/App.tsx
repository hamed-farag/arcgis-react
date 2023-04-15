import EsriConfig from "@arcgis/core/config";

import { ThreeDMap } from "./components/ThreeDMap";

import "./app.css";

function App() {
  EsriConfig.apiKey = import.meta.env.VITE_ARCHGIS_API_KEY;

  const configs = {
    center: [55.18121, 25.034787],
    zoomLevel: 15,
  };

  return (
    <div className="App">
      <ThreeDMap {...configs} />
    </div>
  );
}

export default App;
