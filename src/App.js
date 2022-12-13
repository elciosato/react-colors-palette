import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { seedColors } from "./seedColors";
import { generatePalette } from "./colorHelpers";
import CallPalette from "./CallPalette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  function findPalette(id) {
    return palettes.find((palette) => palette.id === id);
  }

  function savePaletteHandler(newPalette) {
    setPalettes((prevState) => [...prevState, newPalette]);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PaletteList palettes={palettes} />,
    },
    {
      path: "/palette/new",
      element: (
        <NewPaletteForm
          palettes={palettes}
          onSavePalette={savePaletteHandler}
        />
      ),
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
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
