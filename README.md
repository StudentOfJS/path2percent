# path2percent

Animate a path to a given percent with path2percent and [svelte](http://svelte.dev).

### Installation 🔧

_To install using yarn_

`yarn add path2percent -D`

_or npm_

`npm i path2percent -D`

## LazyLoad

A lazy loading component is included. It provides a slot with props, that returns a boolean true if the component is in the viewport. If the browser does not support the IntersectionObserver api, the component will return true immediately. I considered adding a fallback using bounds from getBoundingClientRect, but ultimately opted to save a few kb instead.

## drawPathToPercent

This function builds on top off the excellent ![draw](https://svelte.dev/docs#draw) animation from svelte. Adding percent plus a few small tweaks to allow you to animate along a path to a given percent.

## coordinates

A subscribable store, providing the coordinates of the the end of the path. This is helpful if you want to animate an svg along a path.

### Usage 📦

_included example_

```
<script>
  import { path2percent, LazyLoad } from "path2percent";
  export let percent = 50;
  let x = 0;
  let y = 0;
  let { coordinates, drawPathToPercent } = path2Percent();
  const unsubscribe = coordinates.subscribe(position => {
    x = position.x;
    y = position.y;
  });
</script>

<style>
  .meter path {
    will-change: auto;
    stroke-width: 12px;
    stroke-miterlimit: round;
    transition: stroke-dashoffset 1.5s linear;
    stroke-linecap: round;
  }
</style>

<LazyLoad let:viewport={show}>
  <svg
    class="meter"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    height="180"
    width="180">
    <path stroke="#ccc" d="M41 149.5a77 77 0 1 1 117.93 0" fill="none" />
    {#if show}
      <path
        in:drawPathToPercent={{ percent, speed: 0.3 }}
        stroke="#0AC0DD"
        d="M41 149.5a77 77 0 1 1 117.93 0"
        fill="none" />
    {/if}
    {#if x && y && percent}
      <circle
        cx={x}
        cy={y}
        r="12"
        fill="#0AC0DD"
        stroke="rgba(10, 192, 221, 0.4)"
        stroke-width="17" />
    {/if}
  </svg>
</LazyLoad>

```

_run example - scroll down to see animation_

```
<script>
  import { Example } from "path2percent";
</script>

<style>
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="container" />
<div class="container">
  <Example percent={80} delay={50} />
</div>

```

_change easing_

```
<script>
  import { quadIn } from "svelte/easing";
</script>
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    height="180"
    width="180">
    <path stroke="#ccc" d="M41 149.5a77 77 0 1 1 117.93 0" fill="none" />
    <path
      in:drawPathToPercentWithCallback={{ percent = 80, speed: 0.2, easing: quadIn }}
      stroke="#0AC0DD"
      d="M41 149.5a77 77 0 1 1 117.93 0"
      fill="none" />
  </svg>
```

## Options 🛠️

_defaults_

- percent _default = 0_
- delay _default = 0_
- speed
- duration _default = 800 #if speed is not provided_
- easing _default = expoIn_

## Authors ✒️

- ** Rod Lewis ** - [StudentOfJS](https://github.com/StudentOfJS)
