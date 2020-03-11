<template>
  <div ref="blah" class="canvas-root">
    <canvas ref="canvas" id="cameraElement"></canvas>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  props: {},
  date() {
    return {
      ctx: null
    };
  },
  computed: {
    referenceImages() {
      return this.$store.state.referenceImages;
    },
    UIState() {
      return this.$store.state.UIState;
    }
  },
  methods: {
    async loadReferenceImage() {
      const imgData = require(`../assets/${this.UIState.selectedReferenceImage.image}`);
      const img = new Image();
      return await new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imgData;
      });
    },
    async updateReferenceImage() {
      const img = await this.loadReferenceImage();
      this.ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        this.canvas.width,
        img.height * (this.canvas.width / img.width)
      );
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerWidth;

    this.ctx = this.canvas.getContext("2d");
    this.updateReferenceImage();
  }
};
</script>
<style lang="scss" scoped>
canvas {
  width: 100%;
  height: auto;
}
</style>
