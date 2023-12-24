import createControlsState from './controls.js'
import { Figther } from './entities/sprites/fighter.js'

let prevTime = 0

function main() {
  /**
   * @type {HTMLCanvasElement}
   */
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  const canvasWidth = 1024
  const canvasHeight = 576

  canvas.width = canvasWidth
  canvas.height = canvasHeight

  const player = new Figther({
    position: {
      x: 100,
      y: 100,
    },
    dimensions: {
      width: 50,
      height: 150,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    ctx,
  })
  const startControls = createControlsState(player)
  animate(ctx, canvas)
  
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {HTMLCanvasElement} canvas
  */
 function animate(ctx, canvas) {
   window.requestAnimationFrame(() => animate(ctx, canvas))
   
   startControls()
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let delta = (performance.now() - prevTime) / 1000
    let fps = 1 / delta

    prevTime = performance.now()
    player.update()
  }
}

main()
