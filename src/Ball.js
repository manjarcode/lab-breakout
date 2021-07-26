import Position from './Position'
import Color from "./Color"
import Drawer from './Drawer'
import cloneDeep from 'lodash.clonedeep'

const DEFAULT_RADIX = 10
class Ball {
  constructor({ ctx, position, speed, canvas, radix, color }) {
    this._ctx = ctx;
    this._position = position;
    this._speed = speed
    this._radix = radix ?? DEFAULT_RADIX
    this._color = new Color(color);
    this._topLimit = 0
    this._bottomLimit = canvas.height
    this._leftLimit = 0
    this._rightLimit = canvas.width
    this._tail = []
    this._drawer = new Drawer
  }

  tail() {
    this._tail.push( cloneDeep(this._position))
    
    if(this._tail.length > 20) {
      this._tail.shift()
    }
  }

  move() {
    this.tail()

    this._position.move(this._speed)

    const left = this._position.x() - this._radix
    const right = this._position.x() + this._radix
    const top = this._position.y() - this._radix
    const bottom = this._position.y() + this._radix

    const horizontalRebound = left < this._leftLimit
      || right > this._rightLimit

    const verticalRebound = top < this._topLimit
      || bottom > this._bottomLimit

    if (horizontalRebound) {
      this._speed.swapX()
    }

    if(verticalRebound) {
      this._speed.swapY()
    }

    

  }

  collision(brick) {
    const verticalCollision = this.topCollision(brick) || this.bottomCollision(brick)

    if (verticalCollision) {
      this._speed.swapY()
      brick.destroy()
    }

    const horizontalCollision = this.rightCollision(brick)

    if (horizontalCollision) {
      this._speed.swapX()
      brick.destroy()
    }
  }

  cornerCollision(corner) {
    const xDistance = Math.pow(this._position.x() - corner.x(), 2)
    const yDistance = Math.pow(this._position.y() - corner.y(), 2)

    const distance = Math.sqrt(xDistance + yDistance)

    const hasCollision = distance < this._radix

    return hasCollision
  }

  topCollision(brick) {
    const hasCollision = brick.left() < this._position.x()
      && brick.right() > this._position.x()
      && Math.abs(this._position.y() - brick.top()) < this._radix
    return hasCollision
  }

  bottomCollision(brick) {
    const hasCollision = brick.left() < this._position.x()
      && brick.right() > this._position.x()
      && Math.abs(this._position.y() - brick.bottom()) < this._radix
    return hasCollision
  }

  rightCollision(brick) {
    const hasCollision = brick.top() < this._position.y()
      && brick.bottom() > this._position.y()
      && Math.abs(this._position.x() - brick.right()) < this._radix
    return hasCollision
  }

  leftCollision(brick) {
    const hasCollision = brick.top() < this._position.y()
      && brick.bottom() > this._position.y()
      && Math.abs(this._position.x() - brick.left()) < this._radix
    return hasCollision
  }

  render() {                
    const color = cloneDeep(this._color)
    const increment = 4
    this._tail.forEach(()=> color.brighter(increment))

    this._tail.forEach(tailItem => {      
      this._drawer.circle(this._ctx, tailItem, this._radix, color)  
      color.darker(increment)
    })

    this._drawer.circle(this._ctx, this._position, this._radix, this._color)
  }
}

export default Ball