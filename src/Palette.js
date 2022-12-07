import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";
import PaletteFooter from "./PaletteFooter";

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
          showMoreLink={true}
          moreUrl={`/palette/${this.props.palette.id}/${color.id}`}
        />
      )
    );

    return (
      <div className="Palette">
        <Navbar
          showLevel={true}
          level={this.state.level}
          format={this.state.format}
          onChangeLevel={this.changeLevelHandler}
          onChangeFormat={this.changeFormatHandler}
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <PaletteFooter
          paletteName={this.props.palette.paletteName}
          emoji={this.props.palette.emoji}
        />
      </div>
    );
  }
}
