import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";

function onGraphicUpdate(event: any, sketchViewModel: SketchViewModel) {
  if (
    event.toolEventInfo &&
    (event.toolEventInfo.type === "move-stop" ||
      event.toolEventInfo.type === "reshape-stop")
  ) {
    sketchViewModel.complete();
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
  sketchViewModel: SketchViewModel
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
      onGraphicUpdate(e, sketchViewModel)
    );
  });
}
