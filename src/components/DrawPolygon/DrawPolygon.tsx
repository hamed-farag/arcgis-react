import { useEffect, useRef, useState } from "react";
import Draw from "@arcgis/core/views/draw/Draw";
import Search from "@arcgis/core/widgets/Search";
import MapView from "@arcgis/core/views/MapView";
import Expand from "@arcgis/core/widgets/Expand";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils";

import { createMap, createViewMap } from "../../helpers/mapManager";

import {
  registerDrawControl,
  registerClearControl,
  registerViewControl,
} from "./buttonHandlers";

type TDrawPolygonProps = {
  center: Array<number>;
  zoomLevel: number;
  onComplete: (points: Array<Array<number>>) => void;
};

// TODO: drag drawed polygon
// TODO: auto close the polygon (magnite) -- DONE

export function DrawPolygon(props: TDrawPolygonProps) {
  const { center, zoomLevel, onComplete } = props;

  const [points, setPoints] = useState<Array<Array<number>>>([]);

  const mapRef = useRef(null);
  const viewButtonRef = useRef(null);
  const drawButtonRef = useRef(null);
  const clearButtonRef = useRef(null);
  const instructionBodyRef = useRef(null);

  const instructionSetup = (view: MapView) => {
    if (instructionBodyRef.current) {
      const instructionsExpand = new Expand({
        expandIconClass: "esri-icon-question",
        expandTooltip: "How to use this sample",
        expanded: true,
        view: view,
        content: instructionBodyRef.current,
      });

      view.ui.add(instructionsExpand, "top-left");

      // hide the instructions expand widget when the view becomes focused
      // view.watch("focused", (newValue, oldValue, property, object) => {
      view.watch("focused", (newValue) => {
        if (newValue) {
          instructionsExpand.expanded = false;
        }
      });
    }
  };

  useEffect(() => {
    if (onComplete && onComplete instanceof Function) {
      onComplete(points);
    }
  }, [points]);

  useEffect(() => {
    if (mapRef.current) {
      const graphicsLayer = new GraphicsLayer();
      const map = createMap([graphicsLayer]);

      const viewMap = createViewMap(map, center, zoomLevel, mapRef);
      const searchWidget = new Search({
        view: viewMap,
      });

      // Add Search Widget
      viewMap.ui.add(searchWidget, {
        position: "top-left",
        index: 0,
      });

      const draw = new Draw({
        view: viewMap,
      });

      instructionSetup(viewMap);

      registerViewControl(draw, viewButtonRef);
      registerClearControl(viewMap, draw, clearButtonRef);

      registerDrawControl(
        viewMap,
        graphicsLayer,
        draw,
        drawButtonRef,
        (vertices) => {
          const points: Array<Array<number>> = [];

          vertices.forEach((vertex) => {
            const point = {
              x: vertex[0],
              y: vertex[1],
            };
            points.push(webMercatorUtils.xyToLngLat(point.x, point.y));
          });

          setPoints(points);
        }
      );
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
      <div className="esri-widget instructions" ref={instructionBodyRef}>
        <h3>Instructions</h3> <br />
        <b>Click</b> the <b>blue polygon</b> graphic. <br />
        Rotate, scale, move or reshape the graphic. <br />
        <br />
        Update operation can only be completed if the graphic does not intersect
        school buffers and is inside the boundary polygon.
        <br />
        <table>
          <thead>
            <tr>
              <th>Gesture</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Left-click</td>
              <td>Adds a vertex at the pointer location.</td>
            </tr>
            <tr>
              <td>Left-drag</td>
              <td>Adds a vertex for each pointer move.</td>
            </tr>
            <tr>
              <td>Enter</td>
              <td>Completes the polyline or polygon.</td>
            </tr>
            <tr>
              <td>F</td>
              <td>Adds a vertex to the polyline or polygon.</td>
            </tr>
            <tr>
              <td>Z</td>
              <td>Incrementally undos actions recorded in the stack.</td>
            </tr>
            <tr>
              <td>R</td>
              <td>Incrementally redos actions recorded in the stack.</td>
            </tr>
            <tr>
              <td>Double Click</td>
              <td>Finish Drawing process</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
