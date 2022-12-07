import { useParams, useLoaderData } from "react-router-dom";
import ColorBox from "./ColorBox";
import "./Palette.css";

export default function SingleColorPalette(props) {
  const { paletteId, colorId } = useParams();
  const palette = useLoaderData();

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
      background={color["hex"]}
      name={color.name}
      showMoreLink={false}
    />
  ));
  return (
    <div className="Palette">
      <h1>Single color palette</h1>
      <div className="Palette-colors">{colorBoxes}</div>
    </div>
  );
}
