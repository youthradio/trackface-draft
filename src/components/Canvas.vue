<template>
  <div ref="container" class="canvas-root">
    <canvas
      @mousedown="mouseEvent"
      @mouseup="mouseEvent"
      @mousemove="mouseEvent"
      ref="canvas"
      id="cameraElement"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  props: {},
  data() {
    return {
      isDrawing: false,
      historyPointer: -1,
      pointsHistory: [],
      penSet: false,
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
    mouseEvent(event) {
      console.log(event);
      if (event.type === "mouseup") {
        this.isDrawing = false;
      } else if (event.type === "mousedown") {
        this.historyPointer++;
        this.isDrawing = true;
        this.penSet = false;
      }
      if (this.isDrawing) {
        if (this.pointsHistory[this.historyPointer] === undefined)
          this.pointsHistory.push([]);

        this.pointsHistory[this.historyPointer].push([
          event.layerX,
          event.layerY
        ]);
        this.draw();
      }
    },
    draw() {
      const points = this.pointsHistory[this.historyPointer];
      const pos = points.length - 1;
      if (!this.penSet) {
        this.penSet = true;
        this.ctx.moveTo(points[pos][0], points[pos][1]);
      }
      this.ctx.lineTo(points[pos][0], points[pos][1]);
      this.ctx.stroke();
    },
    async loadReferenceImage() {
      const imgData = require(`../assets/${this.UIState.selectedReferenceImg.src}`);
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
    this.canvas.width = this.canvas.height = this.$refs.container.clientWidth;

    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineWidth = 10;
    this.ctx.lineJoin = this.ctx.lineCap = "round";
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
