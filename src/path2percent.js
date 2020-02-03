import { expoIn } from 'svelte/easing'
import { writable } from 'svelte/store'

export default function path2percent () {
  let coordinates = writable({ x: 0, y: 0 })

  function drawPathToPercent (
    node,
    { delay = 0, speed, percent = 0, duration, easing: easing$1 = expoIn }
  ) {
    const len = node.getTotalLength()
    const length = (percent * len) / 100
    node.setAttribute('stroke-dasharray', `${length}, ${len}`)
    if (duration === undefined) {
      if (speed === undefined) {
        duration = 800
      } else {
        duration = length / speed
      }
    } else if (typeof duration === 'function') {
      duration = duration(length)
    }
    let parentNode = node
    return {
      delay,
      duration,
      easing: easing$1,
      css: (t, u) => {
        return `stroke-dasharray: ${t * length}, ${len}`
      },
      tick: t => {
        coordinates.set(node.getPointAtLength(t * length))
      }
    }
  }
  return { coordinates, drawPathToPercent }
}
