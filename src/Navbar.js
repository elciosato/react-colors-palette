import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: props.format,
      open: false,
    };
    this.changeFormatHandler = this.changeFormatHandler.bind(this);
    this.closeSnackbarHandler = this.closeSnackbarHandler.bind(this);
  }

  changeFormatHandler(e) {
    this.setState({ format: e.target.value, open: true });
    this.props.onChangeFormat(e.target.value);
  }

  closeSnackbarHandler() {
    this.setState({ open: false });
  }
  render() {
    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={this.closeSnackbarHandler}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
    return (
      <nav className="Navbar">
        <div className="Navbar-logo">
          <a href="#">reactcolorpicker</a>
        </div>
        <div className="Navbar-slider-container">
          <span>Level: {this.props.level}</span>
          <div className="Navbar-slider">
            <Slider
              defaultValue={this.props.level}
              min={100}
              max={900}
              step={100}
              onChange={this.props.onChangeLevel}
            />
          </div>
        </div>
        <div className="Navbar-select-container">
          <Select
            id="format"
            name="format"
            value={this.state.format}
            onChange={this.changeFormatHandler}
          >
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.closeSnackbarHandler}
          message={`Format has been changed to [${this.state.format.toUpperCase()}]`}
          action={action}
        />
      </nav>
    );
  }
}
