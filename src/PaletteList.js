import { Link } from "react-router-dom";

export default function PaletteList(props) {
  return (
    <div>
      <h1>React Colors</h1>
      {props.palettes.map((palette) => (
        <div key={palette.id}>
          <Link key={palette.id} to={`/palette/${palette.id}`}>
            {palette.paletteName}
          </Link>
        </div>
      ))}
    </div>
  );
}
