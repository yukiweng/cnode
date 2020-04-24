<template>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-loading"></use>
      </svg>
</template>

<script>
  import '../svg.js'
    export default {
        name: "loading"
    }
</script>
<style scoped >
  @keyframes spin {
    0%{tranform:rotate(0deg)}
    100%{transform:rotate(360deg)}
  }
  .icon {
    width: 50px;
    height: 50px;
    fill: currentColor;
    overflow: hidden;
    animation: spin 3s infinite linear;
  }
</style>
