import MiniPalette from "./MiniPalette";

export default function PaletteList(props) {
  return (
    <div>
      <h1>React Colors</h1>
      {props.palettes.map((palette) => (
        <MiniPalette key={palette.id} {...palette} />
      ))}
    </div>
  );
}
