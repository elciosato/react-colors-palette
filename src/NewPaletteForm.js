import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import { arrayMoveImmutable } from "array-move";

const drawerWidth = 400;

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NewPaletteForm(props) {
  const { maxPaletteColors = 20 } = props;

  const navigate = useNavigate();
  // const theme = useTheme()n;
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setNewColorName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");
  const [colors, setColors] = useState(props.palettes[0].colors);
  const isPaletteFull = colors.length >= maxPaletteColors;

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        (color) => color.name.toLowerCase() !== value.toLowerCase().trim()
      );
    });
  }, [colors]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(
        (color) => color.color.toLowerCase() !== currentColor.toLowerCase()
      );
    });
  }, [colors, currentColor]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        (palette) =>
          palette.paletteName.toLowerCase() !== value.toLowerCase().trim()
      );
    });
  }, [props.palettes]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeCurrentColorHandler = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const addColorHandler = (event) => {
    event.preventDefault();
    const newColor = {
      color: currentColor,
      name: newColorName.toUpperCase().trim(),
    };
    setColors((prevState) => [...prevState, newColor]);
    setNewColorName("");
  };

  const changeColorNameHandle = (event) => {
    setNewColorName(event.target.value);
  };

  const changePaletteNameHandle = (event) => {
    setNewPaletteName(event.target.value);
  };

  const savePaletteHandler = (event) => {
    event.preventDefault();
    const newPalette = {
      id: newPaletteName.toLowerCase().trim().replace(/ /g, "-"),
      paletteName: newPaletteName.trim(),
      colors,
    };
    props.onSavePalette(newPalette);
    navigate("/");
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
    const allColors = props.palettes.map((color) => color.colors).flat();
    let rand;
    do {
      rand = Math.floor(Math.random() * allColors.length);
    } while (colors.some((color) => color.name === allColors[rand].name));
    setColors((prevState) => [...prevState, allColors[rand]]);
  };
  return (
    <Box sx={{ display: "flex" }}>
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={savePaletteHandler}>
            <TextValidator
              label="Palette Name"
              name="newPaletteName"
              value={newPaletteName}
              onChange={changePaletteNameHandle}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter Palette Name. This field is required",
                "Palette Name must be unique",
              ]}
            />
            <Button variant="contained" color="secondary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
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
        <ChromePicker
          color={currentColor}
          onChangeComplete={changeCurrentColorHandler}
        />
        <ValidatorForm onSubmit={addColorHandler}>
          <TextValidator
            value={newColorName}
            name="newColorName"
            onChange={changeColorNameHandle}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter Color Name. This field is required",
              "Color name must be unique",
              "Color already used",
            ]}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ backgroundColor: isPaletteFull ? "grey" : currentColor }}
            disabled={isPaletteFull}
          >
            {isPaletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
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
