import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: "hex",
    };
    this.changeLevelHandler = this.changeLevelHandler.bind(this);
    this.changeFormatHandler = this.changeFormatHandler.bind(this);
  }

  changeLevelHandler(level) {
    this.setState({ level });
  }

  changeFormatHandler(format) {
    this.setState({ format });
  }

  render() {
    const colorBoxes = this.props.palette.colors[this.state.level].map(
      (color) => (
        <ColorBox
          key={color.id}
          background={color[this.state.format]}
          name={color.name}
        />
      )
    );

    return (
      <div className="Palette">
        <Navbar
          level={this.state.level}
          format={this.state.format}
          onChangeLevel={this.changeLevelHandler}
          onChangeFormat={this.changeFormatHandler}
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <footer className="Palette-footer">
          {this.props.palette.paletteName}
          <span className="Palette-emoji">{this.props.palette.emoji}</span>
        </footer>
      </div>
    );
  }
}
