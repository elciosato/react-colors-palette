import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export default class Navbar extends Component {
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
      </nav>
    );
  }
}
