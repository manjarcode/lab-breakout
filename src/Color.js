const MAX_COLOR = 255
class Color {
  constructor(color) {
    this._red = Math.floor(Math.random() * MAX_COLOR)
    this._green = Math.floor(Math.random() * MAX_COLOR)
    this._blue = Math.floor(Math.random() * MAX_COLOR)
  }

  value() {
    const red = this._red.toString(16)
    const green = this._green.toString(16)
    const blue = this._blue.toString(16)

    return `#${red}${green}${blue}`
  }

  brighter(increment) {
    this._red = Math.min(this._red + increment, MAX_COLOR)
    this._green = Math.min(this._green + increment, MAX_COLOR)
    this._blue = Math.min(this._blue + increment, MAX_COLOR)  
  }

  darker(increment) {
    this._red = Math.max(this._red - increment, 0)
    this._green = Math.max(this._green - increment, 0)
    this._blue = Math.max(this._blue - increment, 0)  
  }
}




export default Color