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

export function registerDrawControl(
  mapView: MapView,
  draw: Draw,
  drawButtonRef: React.RefObject<HTMLDivElement>
) {
  // draw polyline button
  if (drawButtonRef && drawButtonRef.current) {
    drawButtonRef.current.onclick = function () {
      mapView.graphics.removeAll();

      // creates and returns an instance of PolyLineDrawAction
      const action = draw.create("polyline");

      // focus the view to activate keyboard shortcuts for sketching
      mapView.focus();

      // listen polylineDrawAction events to give immediate visual feedback
      // to users as the line is being drawn on the view.
      action.on("vertex-add", (e) => handleCreatePolyline(e, mapView));
      action.on("vertex-remove", (e) => handleCreatePolyline(e, mapView));
      action.on("cursor-update", (e) => handleCreatePolyline(e, mapView));
      // action.on("redo", (e) => handleCreatePolyline(e, mapView));
      // action.on("undo", (e) => handleCreatePolyline(e, mapView));
      action.on("draw-complete", (e) => handleCreatePolyline(e, mapView));
    };
  }
}
