import { Figther } from './entities/sprites/fighter.js'

/**
 * @param {Figther} player
 */
export default function createControlsState(player) {
  const keys = {
    up: {
      keys: ['w', 'ArrowUp'],
      isPressed: false,
      isHolding: false,
    },
    down: {
      keys: ['s', 'ArrowDown'],
      isPressed: false,
      isHolding: false,
    },
    moveLeft: {
      keys: ['a', 'ArrowLeft'],
      isPressed: false,
      isHolding: false,
    },
    moveRight: {
      keys: ['d', 'ArrowRight'],
      isPressed: false,
      isHolding: false,
    },
    attack: {
      keys: [' ', 'z'],
      isPressed: false,
      isHolding: false,
    },
  }

  window.addEventListener('keydown', e => {
    const key = Object.values(keys).find(key => key.keys.includes(e.key))
    if (key) {
      key.isPressed = true
    }
  })

  window.addEventListener('keyup', e => {
    const key = Object.values(keys).find(key => key.keys.includes(e.key))

    if (key) {
      key.isPressed = false
      key.isHolding = false
    }
  })

  return function handleControls() {
    if (keys.moveLeft.isPressed) {
      player.moveLeft()
    }

    if (keys.moveRight.isPressed) {
      player.moveRight()
    }

    if (keys.up.isPressed && !keys.up.isHolding) {
      player.jump()
      keys.up.isHolding = true
    }

    if (keys.attack.isPressed && !keys.attack.isHolding) {
      player.attack()
      keys.attack.isHolding = true
    }
  }
}
