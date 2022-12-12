import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useNavigate } from "react-router-dom";

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
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <ValidatorForm
            style={{ display: "flex" }}
            onSubmit={savePaletteHandler}
          >
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
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
