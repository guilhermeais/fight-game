import { GRAVITY } from '../contants.js'
export class Sprite {
  #x = 0
  #y = 0

  #width = 0
  #height = 0

  velocity = {
    x: 0,
    y: 0,
  }

  #gravity

  isJumping = false

  /**
   * @type {CanvasRenderingContext2D} ctx
   */
  #ctx = null

  constructor({ position, velocity, dimensions, ctx, gravity = GRAVITY }) {
    this.#x = position?.x || 0
    this.#y = position?.y || 0

    this.#width = dimensions?.width || 0
    this.#height = dimensions?.height || 0

    this.velocity.x = velocity?.x || 0
    this.velocity.y = velocity?.y || 0

    this.#gravity = gravity

    this.#ctx = ctx
  }

  get x() {
    return this.#x
  }

  get y() {
    return this.#y
  }

  get width() {
    return this.#width
  }

  get height() {
    return this.#height
  }

  #draw() {
    this.#ctx.fillStyle = 'white'
    this.#ctx.fillRect(this.#x, this.#y, this.#width, this.#height)
  }

  update() {
    this.#applyGravity()
    this.#y += this.velocity.y
    this.#x += this.velocity.x

    this.#draw()
  }

  #applyGravity() {
    if (this.isOnGround) {
      this.#y = this.#ctx.canvas.height - this.#height
    } else {
      this.velocity.y += this.#gravity
    }
  }

  get isOnGround() {
    return Math.ceil(this.spriteHeight) >= this.#ctx.canvas.height
  }

  get spriteHeight() {
    return this.#height + this.#y
  }
}
