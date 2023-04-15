import Graphic from "@arcgis/core/Graphic";
import MapView from "@arcgis/core/views/MapView";
import Polyline from "@arcgis/core/geometry/Polyline";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";

import { getIntersectingSegment } from "../../utils/map";

// BASED ON: @arcgis\core\interfaces.d.ts, Event is any
export function createPolyline(event: any, view: MapView) {
  const vertices = event.vertices;
  view.graphics.removeAll();

  // a graphic representing the polyline that is being drawn
  const graphic = new Graphic({
    geometry: new Polyline({
      paths: vertices,
      spatialReference: view.spatialReference,
    }),
    symbol: new SimpleFillSymbol({
      color: [227, 139, 79, 0.5],
      outline: {
        color: [4, 90, 141],
        width: 2,
        cap: "round",
        join: "round",
      },
    }),
  });

  // check if the polyline intersects itself.
  const intersectingSegment = getIntersectingSegment(graphic.geometry, view);

  // Add a new graphic for the intersecting segment.
  if (intersectingSegment) {
    view.graphics.addMany([graphic, intersectingSegment]);
  }
  // Just add the graphic representing the polyline if no intersection
  else {
    view.graphics.add(graphic);
  }

  // return intersectingSegment
  return {
    selfIntersects: intersectingSegment,
  };
}
