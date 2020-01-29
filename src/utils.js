import { expoIn } from 'svelte/easing';

export function drawPathToPercentWithCallback(
  node,
  {
    delay = 0,
    speed,
    callback,
    percent = 0,
    duration,
    easing: easing$1 = expoIn,
  }
) {
  const len = node.getTotalLength();
  const length = (percent * len) / 100;
  node.setAttribute('stroke-dasharray', `${length}, ${len}`);
  if (duration === undefined) {
    if (speed === undefined) {
      duration = 800;
    } else {
      duration = length / speed;
    }
  } else if (typeof duration === 'function') {
    duration = duration(length);
  }
  let parentNode = node;
  return {
    delay,
    duration,
    easing: easing$1,
    css: (t, u) => {
      return `stroke-dasharray: ${t * length}, ${len}`;
    },
    tick: t => {
      callback(node.getPointAtLength(t * length));
    },
  };
}
