import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { AddToPhotos } from "@mui/icons-material";
import PaletteFormDialog from "./PaletteFormDialog";

export default function PaletteFormNav(props) {
  const {
    drawerWidth,
    open,
    handleDrawerOpen,
    palettes,
    colors,
    onSavePalette,
  } = props;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <AddToPhotos />
          </IconButton>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography variant="h6" noWrap component="div">
              Create Palette
            </Typography>
            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                gap: "0.5rem",
              }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary" type="button">
                  Go Back
                </Button>
              </Link>
              <PaletteFormDialog
                palettes={palettes}
                colors={colors}
                onSavePalette={onSavePalette}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
