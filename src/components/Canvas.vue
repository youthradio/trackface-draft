<template>
  <div class="canvas-root">
    <canvas ref="canvas" id="cameraElement" width="340" height="570"></canvas>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  props: {},
  computed: {
    referenceImages() {
      return this.$store.state.referenceImages;
    },
    UIState() {
      return this.$store.state.UIState;
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
canvas {
  width: 100%;
  height: auto;
}
</style>
