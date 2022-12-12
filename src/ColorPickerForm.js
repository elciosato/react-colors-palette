import { useState, useEffect } from "react";
import { withStyles } from "@mui/styles";
import { ChromePicker } from "react-color";
import { Button } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColorButton: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem !important",
    fontSize: "1.2rem !important",
  },
  colorNameInput: {
    width: "100%",
    height: "50px",
  },
};

function ColorPickerForm(props) {
  const { isPaletteFull, colors, onClickAddColor, classes } = props;

  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setNewColorName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return !colors.some(
        (color) => color.name.toLowerCase() === value.toLowerCase().trim()
      );
    });
  }, [colors]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return !colors.some(
        (color) => color.color.toLowerCase() === currentColor.toLowerCase()
      );
    });
  }, [colors, currentColor]);

  const changeCurrentColorHandler = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const addColorHandler = (event) => {
    event.preventDefault();
    const newColor = {
      color: currentColor,
      name: newColorName.toUpperCase().trim(),
    };
    onClickAddColor(newColor);
    setNewColorName("");
  };

  const changeColorNameHandle = (event) => {
    setNewColorName(event.target.value);
  };

  return (
    <div>
      <ChromePicker
        className={classes.picker}
        color={currentColor}
        onChangeComplete={changeCurrentColorHandler}
      />
      <ValidatorForm onSubmit={addColorHandler}>
        <TextValidator
          className={classes.colorNameInput}
          variant="filled"
          margin="normal"
          value={newColorName}
          name="newColorName"
          placeholder="Color Name"
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
          className={classes.addColorButton}
          style={{ backgroundColor: isPaletteFull ? "grey" : currentColor }}
          disabled={isPaletteFull}
        >
          {isPaletteFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default withStyles(styles)(ColorPickerForm);
