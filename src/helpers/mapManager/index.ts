import Map from "@arcgis/core/Map";
import Layer from "@arcgis/core/layers/Layer";
import SceneView from "@arcgis/core/views/SceneView";
import MapView from "@arcgis/core/views/MapView";
import CameraProperties from "@arcgis/core/Camera";

export function createMap(layers?: Array<Layer>) {
  return new Map({
    basemap: "arcgis-light-gray",
    ground: "world-elevation",
    layers
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

    camera: new CameraProperties({
      heading: 359.73,
      tilt: 68.57,
      position: {
        x: center[0],
        y: center[1],
        z: 400.29449,
      },
    }),
    viewingMode: "local",
    qualityProfile: "high",
  });
}

export function createViewMap(
  map: Map,
  center: Array<number>,
  zoomLevel: number,
  ref: React.RefObject<HTMLDivElement>
) {
  return new MapView({
    container: ref.current as HTMLDivElement,
    map: map,
    zoom: zoomLevel,
    center: center,
  });
}
