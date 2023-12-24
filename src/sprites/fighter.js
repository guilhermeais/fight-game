import { GRAVITY } from '../contants.js'
import { Sprite } from './base-sprite.js'

export class Figther extends Sprite {
  constructor({ position, velocity, dimensions, ctx, gravity = GRAVITY }) {
    super({ position, velocity, dimensions, ctx, gravity })
  }

  moveLeft() {
    this.velocity.x = -1.5 * 3.4
  }

  moveRight() {
    this.velocity.x = 1.5 * 3.4
  }

  jump() {
    if (!this.isOnGround) return
    this.velocity.y = -7
  }
}
