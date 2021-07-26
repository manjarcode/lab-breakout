class Speed {
  constructor(x, y) {
    this._x = x
    this._y = y
  }

  x() {
    return this._x
  }

  y() {
    return this._y
  }

  swapX() {
    this._x = - this._x
  }

  swapY() {
    this._y = - this._y
  }
}

export default Speed