import React, { Component } from "react";
import { fabric } from "fabric";

class Fabrictest extends Component {
  width;
  height;
  canvas;
  text;
  fill;

  state = {
    winheight: 0,
    winwidth: 0,
  };

  componentDidMount = () => {
    this.canvas = this.__canvas = new fabric.Canvas("c");
    // create a rectangle object
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
    });
    this.canvas.add(rect);
  };

  addRect = () => {
    const rect = new fabric.Rect({
      width: 200,
      height: 200,
    });
    this.canvas.add(rect);
  };

  onChange = (e, key) => {
    if (key === "text") {
      console.log("a");
      this.text = e.target.value;
    } else if (key === "fill") {
      this.fill = e.target.value;
    }
  };

  addCircle = () => {
    const rect = new fabric.Circle({
      width: 500,
      height: 500,
      radius: 50,
    });
    this.canvas.add(rect);
  };

  addText = () => {
    const rect = new fabric.IText(this.text, {
      width: 500,
      height: 500,
      fill: this.fill,
    });
    this.canvas.add(rect);
  };

  deleteObject = function () {
    this.canvas.getActiveObject().remove();
  };

  render() {
    return (
      <div>
        {/* <input type="text" name="width" onChange={(e) => this.onChange(e, "width")}/>
                <input type="text" name="height" onChange={(e) => this.onChange(e, "height")}/> */}
        <button onClick={this.addRect}>사각형</button>
        <br />
        <button onClick={this.addCircle}>원</button>
        <br />
        <input
          type="text"
          name="fill"
          onChange={(e) => this.onChange(e, "fill")}
        />
        <button onClick={this.addfill}>색 변경 </button> <br />
        <input
          type="text"
          name="text"
          onChange={(e) => this.onChange(e, "text")}
        />
        <button onClick={this.addText}>텍스트 추가 </button> <br />
        <canvas id="c" width="1000" height="1000" />
      </div>
    );
  }
}
export default Fabrictest;
