import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";

import { getIntersectingSegment } from "../../utils/map";

function onGraphicUpdate(
  event: any,
  view: MapView,
  sketchViewModel: SketchViewModel,
  onComplete: (vertices: Array<Array<number>>) => void
) {
  const intersectingSegment = getIntersectingSegment(
    event.graphics[0].geometry,
    view
  );

  if (
    event.toolEventInfo &&
    (event.toolEventInfo.type === "move-stop" ||
      event.toolEventInfo.type === "reshape-stop")
  ) {
    if (intersectingSegment === null) {
      sketchViewModel.complete();
    }
  }

  if (event.state === "complete") {
    // graphic moving or reshaping has been completed or cancelled (distinguish with aborted property)
    // if the graphic is in an illegal spot, call sketchviewmodel's update method again
    // giving user a chance to correct the location of the graphic
    if (intersectingSegment !== null) {
      sketchViewModel.update([event.graphics], { tool: "reshape" });
    } else {
      // if the graphic is in a legal spot, remove the last vertex
      const clonedVertices = [...event.graphics[0].geometry.paths[0]];
      // REMOVE THE LAST
      clonedVertices.pop();
      onComplete(clonedVertices);
    }
  }
}

function setUpGraphicClickHandler(
  view: MapView,
  sketchViewModel: SketchViewModel
) {
  view.on("click", (event) => {
    // check if the sketch's state active if it is then that means
    // the graphic is already being updated, no action required.
    if (sketchViewModel.state === "active") {
      return;
    }

    view.hitTest(event).then((response) => {
      const results = response.results;
      // Check if the new drew are  was clicked and pass
      // the graphic to sketchViewModel.update() with reshape tool.
      results.forEach((result) => {
        if (
          result.graphic.layer === sketchViewModel.layer &&
          result.graphic.attributes &&
          result.graphic.attributes.areaName
        ) {
          sketchViewModel.update([result.graphic], { tool: "reshape" });
        }
      });
    });
  });
}

export function registerViewHandlers(
  view: MapView,
  sketchViewModel: SketchViewModel,
  onComplete: (vertices: Array<Array<number>>) => void
) {
  const searchWidget = new Search({
    view,
  });

  setUpGraphicClickHandler(view, sketchViewModel);

  // Add Search Widget
  view.ui.add(searchWidget, {
    position: "top-left",
    index: 0,
  });

  view.when(() => {
    sketchViewModel.on(["update", "undo", "redo"], (e: any) =>
      onGraphicUpdate(e, view, sketchViewModel, onComplete)
    );
  });
}
