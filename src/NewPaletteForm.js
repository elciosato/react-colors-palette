import { useState } from "react";
import PaletteFormNav from "./PaletteFormNav";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import { arrayMoveImmutable } from "array-move";
import DraggableColorList from "./DraggableColorList";
import ColorPickerForm from "./ColorPickerForm";

const drawerWidth = 400;

export default function NewPaletteForm(props) {
  const { maxPaletteColors = 20, palettes, onSavePalette } = props;

  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(palettes[0].colors);
  const isPaletteFull = colors.length >= maxPaletteColors;

  const theme = useTheme();

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      height: "calc(100vh - 64px)",
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const clickDeleteHandler = (colorName) => {
    setColors((prevState) =>
      prevState.filter((color) => color.name !== colorName)
    );
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors((color) => arrayMoveImmutable(color, oldIndex, newIndex));
  };

  const clickClearPaletteHandler = () => {
    setColors([]);
  };

  const clickRandomColorHandler = () => {
    const allColors = palettes.map((color) => color.colors).flat();
    let rand;
    do {
      rand = Math.floor(Math.random() * allColors.length);
    } while (colors.some((color) => color.name === allColors[rand].name));
    setColors((prevState) => [...prevState, allColors[rand]]);
  };

  const clickAddColorHandler = (newColor) => {
    setColors((prevState) => [...prevState, newColor]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        palettes={palettes}
        colors={colors}
        onSavePalette={onSavePalette}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={clickClearPaletteHandler}
          >
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={clickRandomColorHandler}
            disabled={isPaletteFull}
          >
            Random Color
          </Button>
        </div>
        <ColorPickerForm
          isPaletteFull={isPaletteFull}
          colors={colors}
          onClickAddColor={clickAddColorHandler}
        />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          onClickDelete={clickDeleteHandler}
          onSortEnd={onSortEnd}
          axis="xy"
        />
      </Main>
    </Box>
  );
}
