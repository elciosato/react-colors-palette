import { useState } from "react";
import { withStyles } from "@mui/styles";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import sizes from "./styles/sizes";
import bg from "./bg.svg";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { blue } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

const styles = {
  "@global": {
    ".fade-exit": {
      opacity: 1,
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-in",
    },
  },
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

  const [open, setOpen] = useState(false);
  const [paletteId, setPaletteId] = useState();

  const closeDialogHandler = () => {
    setOpen(false);
  };

  const clickDeletePaletteHandler = () => {
    setOpen(false);
    onClickDeletePalette(paletteId);
  };

  const openDialogHandler = (id) => {
    setPaletteId(id);
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <div key={palette.id}>
                <MiniPalette
                  key={palette.id}
                  {...palette}
                  onClickDeletePalette={openDialogHandler}
                />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog open={open} onClose={closeDialogHandler}>
        <DialogTitle>Delete this Palette?</DialogTitle>
        <List>
          <ListItemButton onClick={clickDeletePaletteHandler}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Delete</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={closeDialogHandler}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Cancel</ListItemText>
          </ListItemButton>
        </List>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
