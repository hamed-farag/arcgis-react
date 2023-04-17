import SceneView from "@arcgis/core/views/SceneView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

function setUpGraphicClickHandler(
  view: SceneView,
  graphicsLayer: GraphicsLayer,
   onClickSpace: (id: number, name:string) => void
) {
  view.on("click", (event) => {
    view.hitTest(event).then((response) => {
      if (response.results.length) {
        const layer = response.results.find(function (result) {
          // check if the graphic belongs to the layer of interest
          return result.graphic.layer === graphicsLayer;
        });

        if (layer) {
          onClickSpace(layer.graphic.attributes.id, layer.graphic.attributes.name);
        }
      }
    });
  });
}

export function registerViewHandlers(
  view: SceneView,
  graphicsLayer: GraphicsLayer,
  onClickSpace: (id: number, name:string) => void
) {
  setUpGraphicClickHandler(view, graphicsLayer, onClickSpace);
}
