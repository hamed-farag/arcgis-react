import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";

export function createMap() {
  return new Map({
    basemap: "arcgis-light-gray",
    ground: "world-elevation",
  });
}

export function createSceneMap(
  map: Map,
  center: Array<number>,
  zoomLevel: number,
  ref: React.RefObject<HTMLInputElement>
) {
  return new SceneView({
    container: ref.current as HTMLInputElement,
    map: map,
    center: center, // Longitude, latitude
    zoom: zoomLevel, // Zoom level
    camera: {
      position: [...center, 400.29449],
      heading: 359.73,
      tilt: 68.57,
    },
    viewingMode: "local",
    qualityProfile: "high",
  });
}
