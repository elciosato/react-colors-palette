import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useNavigate } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function PaletteFormDialog(props) {
  const { palettes, colors, onSavePalette } = props;

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return palettes.every(
        (palette) =>
          palette.paletteName.toLowerCase() !== value.toLowerCase().trim()
      );
    });
  }, [palettes]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPaletteName("");
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
    onSavePalette(newPalette);
    handleClose();
    navigate("/");
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Save Palette
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={savePaletteHandler}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique
            </DialogContentText>
            <Picker data={data} onEmojiSelect={console.log} />
            <TextValidator
              label="Palette Name"
              name="newPaletteName"
              variant="filled"
              fullWidth
              margin="normal"
              value={newPaletteName}
              onChange={changePaletteNameHandle}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter Palette Name. This field is required",
                "Palette Name must be unique",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="success" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
