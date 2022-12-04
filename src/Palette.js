import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
    };
    this.changeLevelHandler = this.changeLevelHandler.bind(this);
  }
  changeLevelHandler(level) {
    this.setState({ level });
  }
  render() {
    const colorBoxes = this.props.palette.colors[this.state.level].map(
      (color) => <ColorBox background={color.hex} name={color.name} />
    );

    return (
      <div className="Palette">
        <Navbar
          level={this.state.level}
          onChangeLevel={this.changeLevelHandler}
        />
        {/* Navbar goes here */}
        <div className="Palette-colors">
          {/* Bunch of color boxes */}
          {colorBoxes}
        </div>
        {/* footer eventually */}
      </div>
    );
  }
}
