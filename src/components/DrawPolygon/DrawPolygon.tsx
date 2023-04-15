import { useEffect, useState, useRef } from "react";
import Draw from "@arcgis/core/views/draw/Draw";

import { createMap, createViewMap } from "../../helpers/mapManager";

import {
  registerDrawControl,
  registerClearControl,
  registerViewControl,
} from "./buttonHandlers";

type TDrawPolygonProps = {
  center: Array<number>;
  zoomLevel: number;
};

export function DrawPolygon(props: TDrawPolygonProps) {
  const { center, zoomLevel } = props;
  const mapRef = useRef(null);
  const viewButtonRef = useRef(null);
  const drawButtonRef = useRef(null);
  const clearButtonRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = createMap();

      const viewMap = createViewMap(map, center, zoomLevel, mapRef);
      // viewMap.ui.add("line-button", "top-left");

      const draw = new Draw({
        view: viewMap,
      });

      registerViewControl(draw, viewButtonRef);
      registerDrawControl(viewMap, draw, drawButtonRef);
      registerClearControl(viewMap, draw, clearButtonRef);
    }
  }, []);

  return (
    <div>
      <div className="draw-map" ref={mapRef}></div>
      <div id="draw-tools">
        <button id="view-button" type="button" ref={viewButtonRef}>
          View
        </button>
        <button id="draw-button" type="button" ref={drawButtonRef}>
          Draw
        </button>
        <button id="undo-button" type="button">
          undo
        </button>
        <button id="redo-button" type="button">
          redo
        </button>
        <button id="cancel-button" type="button" ref={clearButtonRef}>
          cancel
        </button>
      </div>
    </div>
  );
}
