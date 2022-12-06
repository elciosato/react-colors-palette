import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: props.format,
    };
    this.changeFormatHandler = this.changeFormatHandler.bind(this);
  }

  changeFormatHandler(e) {
    this.setState({ format: e.target.value });
    this.props.onChangeFormat(e.target.value);
  }

  render() {
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
      </nav>
    );
  }
}
