import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { seedColors } from "./seedColors";
import { generatePalette } from "./colorHelpers";
import CallPalette from "./CallPalette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

function findPalette(id) {
  return seedColors.find((palette) => palette.id === id);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <PaletteList palettes={seedColors} />,
  },
  {
    path: "/palette/new",
    element: <NewPaletteForm />,
  },
  {
    path: "/palette/:id",
    loader: ({ params }) => {
      return generatePalette(findPalette(params.id));
    },
    element: <CallPalette />,
  },
  {
    path: "/palette/:paletteId/:colorId",
    loader: ({ params }) => {
      return generatePalette(findPalette(params.paletteId));
    },
    element: <SingleColorPalette />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
