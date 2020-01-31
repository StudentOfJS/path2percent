<script>
  import { drawPathToPercentWithCallback, coordinates } from "../utils";
  import LazyLoad from "../LazyLoad.svelte";
  export let percent = 50;
  let x = 0;
  let y = 0;
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
        in:drawPathToPercentWithCallback={{ percent, speed: 0.3 }}
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
