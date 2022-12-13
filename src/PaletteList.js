import { withStyles } from "@mui/styles";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import sizes from "./styles/sizes";
import bg from "./bg.svg";

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    /* background by SVGBackgrounds.com */
    backgroundImage: `url(${bg})`,
    overflow: "scroll",
  },
  heading: {
    fontSize: "1.5rem",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("lg")]: {
      width: "60%",
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
      textDecoration: "none",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)",
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
    },
  },
};
function PaletteList(props) {
  const { palettes, classes, onClickDeletePalette } = props;
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>
          {palettes.map((palette) => (
            <div key={palette.id}>
              <MiniPalette
                key={palette.id}
                {...palette}
                onClickDeletePalette={onClickDeletePalette}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
