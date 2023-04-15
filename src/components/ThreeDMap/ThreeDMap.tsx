import React, { useRef, useEffect } from "react";
import ArcGISMap from "@arcgis/core/Map";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import EsriConfig from "@arcgis/core/config";
import SceneView from "@arcgis/core/views/SceneView";

// import LabelClass from "@arcgis/core/layers/support/LabelClass";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import MapView from "@arcgis/core/views/MapView";

import { createMap, createSceneMap } from "../../helpers/mapManager";
import { createFloor } from "./Floor";

import { building } from "../../data";

// TODO: Handle on click floor
// TODO: Handle Negative Altitude

export function ThreeDMap() {
  const mapRef = useRef(null);

  EsriConfig.apiKey = import.meta.env.VITE_ARCHGIS_API_KEY;

  useEffect(() => {
    if (mapRef.current) {
      const map = createMap();

      // LAT, LON, but google maps is LON, LAT
      createSceneMap(map, [55.18121, 25.034787], 15, mapRef);

      const graphicsLayer = new GraphicsLayer();

      building.spaces.forEach((space) => {
        const floor = createFloor(
          space.coordinates,
          space.altitude,
          space.color
        );

        graphicsLayer.add(floor);
      });

      map.add(graphicsLayer);

      // map.add(populationLayer);
    }
  }, []);

  return (
    <div className="map" ref={mapRef as React.LegacyRef<HTMLDivElement>}></div>
  );
}
