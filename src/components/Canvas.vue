<template>
  <div ref="container" class="canvas-root">
    <canvas
      tabindex="0"
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
      history: {
        points: []
      },
      penSet: false,
      main: { canvas: null, ctx: null },
      layer: { canvas: null, ctx: null }
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
  watch: {
    UIState: {
      handler() {
        // // this.layer.ctx.strokeStyle = "#FF0000";
        // // this.layer.ctx.fillStyle = "#FF0000";
        // // this.layer.ctx.rect(10, 20, 150, 100);
        // // this.layer.ctx.fill();
        this.clearCanvas();
        this.updateReferenceImage();
      },
      deep: true
    }
  },
  methods: {
    clearCanvas() {
      this.$set(this.history, "points", []);
      this.historyPointer = -1;
      this.layer.ctx.clearRect(
        0,
        0,
        this.layer.canvas.width,
        this.layer.canvas.height
      );
      this.main.ctx.clearRect(
        0,
        0,
        this.main.canvas.width,
        this.main.canvas.height
      );
    },
    mouseEvent(event) {
      if (event.type === "mouseup") {
        this.isDrawing = false;
      } else if (event.type === "mousedown") {
        this.historyPointer++;
        this.isDrawing = true;
        this.penSet = false;
      }
      if (this.isDrawing) {
        // usint this.$set because vue is not reactivy for array updates
        if (this.history.points[this.historyPointer] === undefined) {
          this.$set(this.history.points, this.historyPointer, []);
        }
        const currPoints = this.history.points[this.historyPointer];
        this.$set(
          this.history.points,
          this.historyPointer,
          currPoints.concat([[event.layerX, event.layerY]])
        );
        // console.log("DRAW", this.history.points);
        this.draw();
      }
    },
    draw() {
      const points = this.history.points[this.historyPointer];
      const pos = points.length - 1;
      if (!this.penSet) {
        this.penSet = true;
        this.layer.ctx.beginPath();
        this.layer.ctx.moveTo(points[pos][0], points[pos][1]);
      }
      this.layer.ctx.lineTo(points[pos][0], points[pos][1]);
      this.layer.ctx.stroke();
      this.main.ctx.drawImage(this.layer.canvas, 0, 0);
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
      this.main.ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        this.main.canvas.width,
        img.height * (this.main.canvas.width / img.width)
      );
    }
  },
  mounted() {
    document.addEventListener("mouseup", this.mouseEvent);

    document.addEventListener("keydown", event => {
      if (event.code === "KeyZ" && (event.ctrlKey || event.metaKey)) {
        this.clearCanvas();
      }
    });
    //main
    this.main.canvas = this.$refs.canvas;
    this.main.canvas.width = this.main.canvas.height = this.$refs.container.clientWidth;
    this.main.ctx = this.main.canvas.getContext("2d");
    //layer
    this.layer.canvas = document.createElement("canvas");
    this.layer.canvas.width = this.layer.canvas.height = this.main.canvas.width;
    this.layer.ctx = this.layer.canvas.getContext("2d");

    this.layer.ctx.lineWidth = 10;
    this.layer.ctx.lineJoin = this.layer.ctx.lineCap = "round";
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
