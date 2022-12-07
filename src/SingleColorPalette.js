import { useParams } from "react-router-dom";
export default function SingleColorPalette(props) {
  let { paletteId, colorId } = useParams();
  return (
    <div>
      <h1>Single color palette</h1>
      <p>
        {paletteId} - {colorId}
      </p>
    </div>
  );
}
