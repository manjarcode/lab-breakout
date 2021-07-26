import Position from './Position'
import Color from "./Color";

class Brick {
  constructor({ ctx, position, width, height, color, id }) {
    this._id = id
    this._ctx = ctx
    this._position = position
    this._width = width ?? 60
    this._height = height ?? 20
    this._color = new Color(color)
    this._isDestroyed = false
  }

  corners(){
    return [
      new Position(
        this.left(),
        this.top(),          
      ),
      new Position(
        this.right(),
        this.top(),          
      ),
      new Position(
        this.left(),
        this.bottom(),          
      ),
      new Position(
        this.right(),
        this.bottom(),
      ),
    ]
  }

  top() {
    return this._position.y()
  }

  bottom() {
    return this._position.y() + this._height
  }

  left() {
    return this._position.x()
  }

  right() {
    return this._position.x() + this._width
  }


  destroy() {
    this._isDestroyed = true
  }

  isDestroyed() {
    return this._isDestroyed
  }
  
  render() {
    this._ctx.beginPath();
    this._ctx.rect(
      this._position.x(),
      this._position.y(),
      this._width,
      this._height);

    this._ctx.fillStyle = this._color.value();
    this._ctx.fill();
    this._ctx.closePath();
  }
}

export default Brick