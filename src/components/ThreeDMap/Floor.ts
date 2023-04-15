import Graphic from "@arcgis/core/Graphic";

export function createFloor(
  coordinates: Array<Array<number>>,
  altitude: number,
  color: string
): Graphic {
  const prepareRings = coordinates.map((coordinate: Array<number>) => {
    return [...coordinate, altitude * 50];
  });

  // push first item again as a last item to close the polygon
  prepareRings.push(prepareRings[0]);

  const polygon = {
    type: "polygon", // autocasts as new Polygon()
    rings: prepareRings,
  };

  const fillSymbol = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: color, // color -> rgba
    outline: {
      // border
      // autocasts as new SimpleLineSymbol()
      color: [255, 255, 255],
      width: 1,
    },
  };

  return new Graphic({
    geometry: polygon,
    symbol: fillSymbol,
  });
}
