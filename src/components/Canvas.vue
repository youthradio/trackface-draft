<template>
  <div ref="container" class="canvas-root">
    <canvas
      tabindex="0"
      @touchstart.prevent="mouseEvent"
      @touchend.prevent="mouseEvent"
      @touchmove.prevent="mouseEvent"
      @mousedonw.prevent="mouseEvent"
      @mousedown.prevent="mouseEvent"
      @mouseup.prevent="mouseEvent"
      @mousemove.prevent="mouseEvent"
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
        points: [],
        colors: [],
        sizes: []
      },
      penSet: false,
      main: { canvas: null, ctx: null },
      layer: { canvas: null, ctx: null },
      currRefImgBlob: null,
      currTargetImgBlob: null,
      currTargetImg: null
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
    "UIState.selectedReferenceImg": function() {
      this.clearCanvas();
      this.loadReferenceImage();
      this.loadTargeImage();
      this.updateTargetImage();
    },
    "UIState.selectedTool": function(action) {
      console.log(action);
    },
    "UIState.selectedAction": function(action) {
      console.log(action);
      if (action === "undo") {
        this.rollBack();
        this.$store.dispatch("setUIState", {
          selectedAction: "clear"
        });
      } else if (action === "test-image") {
        this.testImages();
        this.$store.dispatch("setUIState", {
          selectedAction: "clear"
        });
      }
    },
    //     state.UIState.selectedAction = "none";
    // state.UIState.selectedTool = state.toolsData[0];
    // state.UIState.selectedReferenceImg = state.referenceImages[0];
    // UIState: {
    //   handler(val, oldVal) {
    //     // // this.layer.ctx.strokeStyle = "#FF0000";
    //     // // this.layer.ctx.fillStyle = "#FF0000";
    //     // // this.layer.ctx.rect(10, 20, 150, 100);
    //     // // this.layer.ctx.fill();

    //     console.log(val, oldVal);
    //     // this.clearCanvas();
    //     // this.updateReferenceImage();
    //   },
    //   deep: true
    // },
    history: {
      handler() {
        console.log("POINTs");
      },
      deep: true
    }
  },
  methods: {
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    testImages() {
      const targetImageURL = this.main.canvas.toDataURL("image/jpeg", 1.0);
      this.$store.dispatch("setResultState", {
        loading: true
      });
      return fetch(targetImageURL)
        .then(res => res.blob())
        .then(targetBlob => {
          console.log(targetBlob);
          const formData = new FormData();

          formData.append("referenceimage", this.currRefImgBlob, "refimg.jpg");
          formData.append("targetimage", targetBlob, "targetimg.jpg");
          return fetch(process.env.VUE_APP_SERVER_URL, {
            method: "POST",
            body: formData,
            header: {
              "Content-Type": "multipart/form-data"
            }
          })
            .then(res => res.json())
            .then(result => {
              this.$store.dispatch("setResultState", {
                loading: false,
                result: result,
                targetImg: targetBlob,
                refImg: this.currRefImgBlob
              });
            })
            .catch(error => {
              this.$store.dispatch("setResultState", {
                loading: false,
                error: error
              });
            });
        });
    },
    rollBack() {
      if (!this.history.points.length) {
        console.log("RETUNR");
        return;
      }
      //clear layer
      this.layer.ctx.clearRect(
        0,
        0,
        this.layer.canvas.width,
        this.layer.canvas.height
      );
      this.history.points.pop();
      this.history.colors.pop();
      this.history.sizes.pop();
      // this.$set(this.history, "points", );

      this.history.points.forEach((points, historyIndex) => {
        this.layer.ctx.strokeStyle = this.history.colors[historyIndex];
        this.layer.ctx.lineWidth = this.history.sizes[historyIndex];
        points.forEach((point, i) => {
          if (i <= 0) {
            this.layer.ctx.beginPath();
            this.layer.ctx.moveTo(point[0], point[1]);
          }
          this.layer.ctx.lineTo(point[0], point[1]);
          this.layer.ctx.stroke();
        });
      });
      this.main.ctx.drawImage(
        this.currTargetImg,
        0,
        0,
        this.currTargetImg.width,
        this.currTargetImg.height,
        0,
        0,
        this.main.canvas.width,
        this.currTargetImg.height *
          (this.main.canvas.width / this.currTargetImg.width)
      );

      this.main.ctx.drawImage(this.layer.canvas, 0, 0);
    },

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
      event.preventDefault();
      const eventType = event.type;
      if (eventType === "mouseup" || eventType === "touchend") {
        this.isDrawing = false;
      } else if (eventType === "mousedown" || eventType === "touchstart") {
        this.historyPointer++;
        this.isDrawing = true;
        this.penSet = false;
      } else if (
        (eventType === "mousemove" || eventType === "touchmove") &&
        this.isDrawing
      ) {
        const rect = event.target.getBoundingClientRect();
        // const bodyRect = document.body.getBoundingClientRect();/
        const posx =
          (event.pageX || event.touches[0].pageX) -
          (rect.left + document.documentElement.scrollLeft);
        const posy =
          (event.pageY || event.touches[0].pageY) -
          (rect.top + document.documentElement.scrollTop);

        // usint this.$set because vue is not reactivy for array updates
        if (this.history.points[this.historyPointer] === undefined) {
          this.$set(this.history.points, this.historyPointer, []);

          this.$set(
            this.history.sizes,
            this.historyPointer,
            this.UIState.selectedStrokeWeight
          );
          this.$set(
            this.history.colors,
            this.historyPointer,
            this.UIState.selectedColor
          );
        }
        const currPoints = this.history.points[this.historyPointer];
        this.$set(
          this.history.points,
          this.historyPointer,
          currPoints.concat([[posx, posy]])
        );
        // console.log("DRAW", this.history.points);
        this.draw();
      }
    },
    draw() {
      const points = this.history.points[this.historyPointer];
      const pos = points.length - 1;
      this.layer.ctx.strokeStyle = this.history.colors[this.historyPointer];
      this.layer.ctx.lineWidth = this.history.sizes[this.historyPointer];
      if (!this.penSet) {
        this.penSet = true;
        this.layer.ctx.beginPath();
        this.layer.ctx.moveTo(points[pos][0], points[pos][1]);
      }
      this.layer.ctx.lineTo(points[pos][0], points[pos][1]);
      this.layer.ctx.stroke();
      this.main.ctx.drawImage(this.layer.canvas, 0, 0);
    },
    // load reference image from store and keep it as blob
    async loadReferenceImage() {
      const imgData = require(`../assets/${this.UIState.selectedReferenceImg.src}`);
      return fetch(imgData)
        .then(res => res.blob())
        .then(blob => {
          this.currRefImgBlob = blob;
        });
    },
    async loadTargeImage() {
      const imgData = require(`../assets/${this.UIState.selectedReferenceImg.target}`);
      return new Promise((resolve, reject) => {
        return fetch(imgData)
          .then(res => res.blob())
          .then(blob => {
            this.currTargetImgBlob = blob;
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = window.URL.createObjectURL(blob);
          });
      });
    },
    // draw target image on canvas
    async updateTargetImage() {
      this.currTargetImg = await this.loadTargeImage();
      this.main.ctx.drawImage(
        this.currTargetImg,
        0,
        0,
        this.currTargetImg.width,
        this.currTargetImg.height,
        0,
        0,
        this.main.canvas.width,
        this.currTargetImg.height *
          (this.main.canvas.width / this.currTargetImg.width)
      );
    }
  },
  mounted() {
    document.addEventListener("mouseup", this.mouseEvent);
    document.addEventListener("keydown", event => {
      if (event.code === "KeyZ" && (event.ctrlKey || event.metaKey)) {
        this.rollBack();
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
    this.loadReferenceImage();
    this.loadTargeImage();
    this.updateTargetImage();
  }
};
</script>
<style lang="scss" scoped>
canvas {
  width: 100%;
  height: auto;
  // touch-action: none;
}
</style>
