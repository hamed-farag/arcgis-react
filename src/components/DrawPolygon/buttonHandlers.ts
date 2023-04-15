import React from "react";
import MapView from "@arcgis/core/views/MapView";
import Draw from "@arcgis/core/views/draw/Draw";

import { createPolyline } from "../../helpers/graphicManager";

function handleCreatePolyline(e: any, view: MapView) {
  // create a polyline from returned vertices
  const result = createPolyline(e, view);

  // if the last vertex is making the line intersects itself,
  // prevent the events from firing
  if (result.selfIntersects) {
    e.preventDefault();
  }
}

export function registerViewControl(
  draw: Draw,
  buttonRef: React.RefObject<HTMLDivElement>
) {
  // draw polyline button
  if (buttonRef && buttonRef.current) {
    buttonRef.current.onclick = function () {
      draw.complete();
    };
  }
}

export function registerDrawControl(
  mapView: MapView,
  draw: Draw,
  buttonRef: React.RefObject<HTMLDivElement>,
  onComplete: (vertices: Array<Array<number>>) => void
) {
  if (buttonRef && buttonRef.current) {
    buttonRef.current.onclick = function () {
      // creates and returns an instance of PolyLineDrawAction
      const action = draw.create("polyline", { mode: "click" });
      mapView.graphics.removeAll();

      // focus the view to activate keyboard shortcuts for sketching
      mapView.focus();

      // listen polylineDrawAction events to give immediate visual feedback
      // to users as the line is being drawn on the view.
      action.on("vertex-add", (e) => handleCreatePolyline(e, mapView));
      action.on("vertex-remove", (e) => handleCreatePolyline(e, mapView));
      action.on("cursor-update", (e) => handleCreatePolyline(e, mapView));
      action.on("redo", (e) => handleCreatePolyline(e, mapView));
      action.on("undo", (e) => handleCreatePolyline(e, mapView));
      action.on("draw-complete", (e) => onComplete(e.vertices));
    };
  }
}

export function registerClearControl(
  mapView: MapView,
  draw: Draw,
  buttonRef: React.RefObject<HTMLDivElement>
) {
  if (buttonRef && buttonRef.current) {
    buttonRef.current.onclick = function () {
      mapView.graphics.removeAll();
      draw.destroy();
    };
  }
}
