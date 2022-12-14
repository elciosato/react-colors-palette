import React, { Component } from "react";
import chroma from "chroma-js";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

export default class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCopied: false,
    };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ isCopied: true }, () => {
      setTimeout(() => this.setState({ isCopied: false }), 1500);
    });
  }
  render() {
    const { name, background, showMoreLink, moreUrl } = this.props;
    const { isCopied } = this.state;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.7;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className="ColorBox">
          <div
            style={{ background }}
            className={`copy-overlay ${isCopied && "show"}`}
          />
          <div className={`copy-msg ${isCopied && "show"}`}>
            <h1>copied!</h1>
            <p className={isLightColor ? "dark-text" : ""}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor ? "light-text" : ""}>{name}</span>
            </div>
            <button className={`copy-button ${isLightColor && "dark-text"}`}>
              Copy
            </button>
          </div>
          {showMoreLink && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={`see-more ${isLightColor && "dark-text"}`}>
                More
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}
