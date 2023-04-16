import Graphic from "@arcgis/core/Graphic";
import MapView from "@arcgis/core/views/MapView";
import Polyline from "@arcgis/core/geometry/Polyline";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";

import { getIntersectingSegment } from "../../utils/map";

// BASED ON: @arcgis\core\interfaces.d.ts, Event is any
export function createPolyline(
  event: any,
  view: MapView,
  graphicLayer: GraphicsLayer,
  isComplete: boolean
) {
  const vertices = event.vertices;

  // To close the Polygon, push the first vertex to the end of the array
  // this for drawing only, but we should send the vertices without the last one
  if (isComplete) {
    vertices.push(vertices[0]);
  }

  graphicLayer.removeAll();

  const polyline = new Polyline({
    paths: vertices,
    spatialReference: view.spatialReference,
  });

  // a graphic representing the polyline that is being drawn
  const graphic = new Graphic({
    geometry: polyline,
    symbol: new SimpleFillSymbol({
      color: [227, 139, 79, 0.5],
      style: "solid",
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
    graphicLayer.addMany([graphic, intersectingSegment]);
  }
  // Just add the graphic representing the polyline if no intersection
  else {
    graphicLayer.add(graphic);
  }

  // return intersectingSegment
  return {
    selfIntersects: intersectingSegment,
  };
}
