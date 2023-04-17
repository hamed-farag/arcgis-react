import React, { useRef, useEffect } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import { createMap, createSceneMap } from "../../helpers/mapManager";
import { createSpace } from "./Space";

import { building } from "../../data";

type TThreeDMapProps = {
  center: Array<number>;
  zoomLevel: number;
};

export function ThreeDMap(props: TThreeDMapProps) {
  const { center, zoomLevel } = props;
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = createMap();

      // LAT, LON, but google maps is LON, LAT
      createSceneMap(map, center, zoomLevel, mapRef);

      const graphicsLayer = new GraphicsLayer();

      building.spaces.forEach((space) => {
        const spaceGraphic = createSpace(
          space.id,
          space.name,
          space.coordinates,
          space.altitude,
          space.color
        );

        graphicsLayer.add(spaceGraphic);
      });

      map.add(graphicsLayer);
    }
  }, []);

  return (
    <div
      className="three-d-map"
      ref={mapRef as React.LegacyRef<HTMLDivElement>}
    ></div>
  );
}
