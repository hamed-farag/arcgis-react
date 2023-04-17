# ArcGIS for React

React Typescript project generated with [vitejs.dev](https://vitejs.dev/), contains **ArcGIS 4.x** package.

## Available Components

- Render SceneView (3d) with some floors (acting as a building)
- Render 2d map and give the user the ability to draw polygon using polyline feature and reshape it.

## How to Start?

- Create developer account on ArcGIS to get API Key [https://developers.arcgis.com/sign-up/](https://developers.arcgis.com/sign-up/)
- Clone the repo [https://developers.arcgis.com/sign-up/](https://github.com/hamed-farag/arcgis-react.git)
- Create `.env` file by coping `.env.example`
- Update `VITE_ARCGIS_API_KEY` key with your API Key
- Run in your console the `npm run dev`

## TODO

### ThreeDMap

- [ ] Handle on click space
- [ ] Handle Negative Altitude
- [ ] Render Space Name

### DrawPolygon

- [x] Drag drew polygon
- [x] Auto close the polygon (magnet)
- [ ] ISSUE - PREVENT USE TO CLICK OUTSIDE IF SHAPE IS INTERSECTED
- [ ] GET POINTS AFTER RESHAPING COMPLETE

## References

- [Drag - CodePen](https://codepen.io/solowt/pen/QqoaeK?editors=1000)
- [Reshape - ArcGIS Example](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=sketch-update-validation)
- [Drag & Drop Pin](https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/drag-and-drop-a-pin-with-arcgis-js-api-4-x/m-p/532365#M49610)
