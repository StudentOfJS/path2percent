<script>
  let viewport = false;
  let api = "IntersectionObserver" in window;
  let intersect = entries => {
    viewport = entries[0].isIntersecting;
  };
  let observer = api ? new IntersectionObserver(intersect) : void 0;
  $: if (!viewport && !api) {
    viewport = true;
  }
  function lazyload(node) {
    observer && observer.observe(node);
    return {
      destroy() {
        observer && observer.unobserve(node);
      }
    };
  }
</script>

<div use:lazyload>
  <slot {viewport} />
</div>
