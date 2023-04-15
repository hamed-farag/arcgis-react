import Graphic from "@arcgis/core/Graphic";
import MapView from "@arcgis/core/views/MapView";
import Geometry from "@arcgis/core/geometry/Geometry";
import Polyline from "@arcgis/core/geometry/Polyline";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";

// Get the last segment of the polyline that is being drawn
function getLastSegment(polyline: Geometry, view: MapView): Polyline {
  const line = polyline.clone() as Polyline;
  const lastXYPoint = line.removePoint(0, line.paths[0].length - 1);
  const existingLineFinalPoint = line.getPoint(0, line.paths[0].length - 1);

  return new Polyline({
    spatialReference: view.spatialReference,
    hasZ: false,
    paths: [
      [
        [existingLineFinalPoint.x, existingLineFinalPoint.y],
        [lastXYPoint.x, lastXYPoint.y],
      ],
    ],
  });
}

// function that checks if the line intersects itself
function isSelfIntersecting(polyline: Polyline, view: MapView) {
  if (polyline.paths[0].length < 3) {
    return false;
  }
  const line = polyline.clone();

  //get the last segment from the polyline that is being drawn
  const lastSegment = getLastSegment(polyline, view);
  line.removePoint(0, line.paths[0].length - 1);

  // returns true if the line intersects itself, false otherwise
  return geometryEngine.crosses(lastSegment, line);
}

// Checks if the line intersects itself. If yes, change the last
// segment's symbol giving a visual feedback to the user.
export function getIntersectingSegment(polyline: Geometry, view: MapView) {
  if (isSelfIntersecting(polyline as Polyline, view)) {
    return new Graphic({
      geometry: getLastSegment(polyline, view),
      symbol: new SimpleLineSymbol({
        style: "short-dot",
        width: 3.5,
        color: "yellow",
      }),
    });
  }
  return null;
}
