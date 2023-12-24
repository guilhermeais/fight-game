import { GRAVITY } from '../../contants.js'
import { Sprite } from './base-sprite.js'

export class Figther extends Sprite {
  #isAttacking = false
  #attackCooldown = 0
  #isOnAttackCooldown = false
  #attackDuration = 10

  constructor({
    position,
    velocity,
    dimensions,
    ctx,
    gravity = GRAVITY,
    attackBox,
    attackCooldown = 100,
    attackDuration = 10,
  }) {
    super({ position, velocity, dimensions, ctx, gravity })

    this.attackBox = attackBox || {
      position: { x: position.x, y: position.y },
      width: 125,
      height: 50,
    }

    this.#attackCooldown = attackCooldown
    this.#attackDuration = attackDuration
  }

  moveLeft() {
    this.velocity.x = -1.5 * 3.4
  }

  moveRight() {
    this.velocity.x = 1.5 * 3.4
  }

  jump() {
    if (!this.isOnGround) return
    this.velocity.y = -12
  }

  async attack() {
    if (this.#isAttacking || this.#isOnAttackCooldown) return

    this.#isAttacking = true
    this.#applyAttackCooldown()

    await new Promise(resolve => setTimeout(resolve, this.#attackDuration))

    this.#isAttacking = false
  }

  async #applyAttackCooldown() {
    this.#isOnAttackCooldown = true

    await new Promise(resolve => setTimeout(resolve, this.#attackCooldown))

    this.#isOnAttackCooldown = false
  }

  _draw() {
    super._draw()

    if (this.attackBox && this.#isAttacking) {
      this.attackBox.position.x = this.x
      this.attackBox.position.y = this.y
      this._ctx.fillStyle = 'red'

      this._ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      )
    }
  }
}
