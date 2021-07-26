import "./app.css"
import Ball from "./Ball"
import Brick from "./Brick"
import Position  from "./Position"
import Speed from "./Speed"

function setup() {
  const canvas = document.getElementById("myCanvas")
  const ctx = canvas.getContext("2d")
  return {ctx, canvas}
}


function buildBricks(ctx) {

  let id=1;
  const initialX = 10;
  const initialY = 10;


  function buildRow(initialX, initialY, rowNumber, total)
  {
    const bricks = []
    for (let i = 0; i< total; i++) {
      const current = new Brick({
        ctx: ctx,
        position: new Position(initialX + 70*i, initialY + 30*rowNumber),
        id: id++
      })    
  
      bricks.push(current)
    }

    return bricks;
  }

  const bricks = []
  
  bricks.push(...buildRow(initialX, initialY, 0, 10))
  bricks.push(...buildRow(initialX + 30, initialY, 1, 9))  
  bricks.push(...buildRow(initialX, initialY, 2, 10))

  return bricks
}

function main() {
  const {ctx, canvas} = setup()

  const ball = new Ball({
    ctx: ctx,
    position: new Position(290, 200),
    canvas: canvas,
    speed: new Speed(-2.5, -2.5 )
  })

  let bricks = buildBricks(ctx)

  //game-loop

  window.setInterval(()=> {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.move()

    bricks.map( b => {
       ball.collision(b)
       b.render()
    })

    const destroyed = bricks.some(b=> b.isDestroyed())
    if (destroyed) {
      console.log('before', JSON.stringify(bricks))
      bricks = bricks.filter(b => !b.isDestroyed())
      console.log('after', JSON.stringify(bricks))
    }

    ball.render()
  }, 8) //about 120FPS
}


main()