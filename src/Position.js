class Position {
  constructor(x, y, canvas) {
    this._x = x;
    this._y = y;

  }

  x() {
    return this._x;
  }

  y() {
    return this._y;
  }

  move(speed) {    
    this._x += speed.x()  
    this._y += speed.y()
  }
}

export default Position