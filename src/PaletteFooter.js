export default function PaletteFooter(props) {
  return (
    <footer className="Palette-footer">
      {props.paletteName}
      <span className="Palette-emoji">{props.emoji}</span>
    </footer>
  );
}
