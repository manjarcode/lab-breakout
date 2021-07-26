class Drawer {
  circle(ctx, position, radix, color) {
    ctx.beginPath();
    ctx.arc(
      position.x(),
      position.y(),
      radix,
      0, Math.PI*2);

    ctx.fillStyle = color.value();
    ctx.fill();
    ctx.closePath();
  }
}

export default Drawer