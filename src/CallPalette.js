import { useLoaderData } from "react-router-dom";
import Palette from "./Palette";

export default function CallPalette() {
  const palette = useLoaderData();
  return <Palette palette={palette} />;
}

// return (
//   </Routes>
//   // <div className="App">
//   //   <Palette palette={generatePalette(seedColors[4])} />
//   // </div>
// );
