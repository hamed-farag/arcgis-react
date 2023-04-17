import React, { useRef, useEffect } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import { createMap, createSceneMap } from "../../helpers/mapManager";
import { createSpace } from "./Space";
import { registerViewHandlers } from "./viewHandlers";

import { building } from "../../data";

type TThreeDMapProps = {
  center: Array<number>;
  zoomLevel: number;
};

export function ThreeDMap(props: TThreeDMapProps) {
  const { center, zoomLevel } = props;
  const mapRef = useRef(null);

  const handleClickSpace = (id: number, name: string) => {
    console.log("Clicked space: ", id, name);
  };

  useEffect(() => {
    if (mapRef.current) {
      const map = createMap();

      // LAT, LON, but google maps is LON, LAT
      const sceneView = createSceneMap(map, center, zoomLevel, mapRef);

      const graphicsLayer = new GraphicsLayer();

      registerViewHandlers(sceneView, graphicsLayer, handleClickSpace);

      building.spaces.forEach((space) => {
        const spaceGraphic = createSpace(
          space.id,
          space.name,
          space.coordinates,
          space.altitude,
          space.color
        );

        graphicsLayer.addMany(spaceGraphic);
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
