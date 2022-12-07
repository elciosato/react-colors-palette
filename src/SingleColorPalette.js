import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";
import PaletteFooter from "./PaletteFooter";

export default function SingleColorPalette(props) {
  const [format, setFormat] = useState("hex");
  const { colorId } = useParams();
  const palette = useLoaderData();

  function changeFormatHandler(format) {
    setFormat(format);
  }

  function gatherShades() {
    const colors = [];
    for (let shade in palette.colors) {
      const color = palette.colors[shade].find((c) => c.id === colorId);
      colors.push(color);
    }
    return colors.splice(1);
  }

  const colorShades = gatherShades();

  const colorBoxes = colorShades.map((color, index) => (
    <ColorBox
      key={index}
      background={color[format]}
      name={color.name}
      showMoreLink={false}
    />
  ));
  return (
    <div className="Palette">
      <Navbar
        showLevel={false}
        format={format}
        onChangeFormat={changeFormatHandler}
      />

      <div className="Palette-colors">{colorBoxes}</div>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
}
