<template>
  <div class="image-select-screen">
    <div class="image-select-container">
      <div
        :class="[
          'image-select-item',
          {
            selected:
              selectedReferenceImg && selectedReferenceImg.name === image.name
          }
        ]"
        :key="image.name"
        v-for="image in referenceImages"
      >
        <a tabindex="0" href="#" @click.prevent="setSelection(image)">
          <img class="img-fluid" :src="require(`../assets/${image.src}`)" />
        </a>
      </div>
    </div>
    <button @click="finishSelection()">Next</button>
  </div>
</template>

<!-- line 11 errors out on mount because there is no image to refer to, needs to be applied after load -->

<script>
export default {
  name: "SelectionScreen",
  props: {},
  data() {
    return {
      selectedReferenceImg: null,
      pictureBase: []
    };
  },
  methods: {
    setSelection(image) {
      this.selectedReferenceImg = image;
      this.$store.dispatch("setUIState", {
        selectedReferenceImg: this.selectedReferenceImg
      });
      this.$store.dispatch("setProgressState", "canvasDrawing");
    },
    finishSelection() {
      this.timeline.imageSelect = true;
    }
  },
  mounted() {
    this.selectedReferenceImg = this.UIState.selectedReferenceImg;
  },
  computed: {
    referenceImages() {
      return this.$store.state.referenceImages;
    },
    UIState() {
      return this.$store.state.UIState;
    },
    timeline() {
      return this.$store.state.timeline;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/css/vars";
.image-select-container {
  display: flex;
  flex-direction: row;
}
.image-select-item {
  position: relative;
  flex: 2;
  // padding: 0.4rem;
}
.selected::after {
  content: "dsdsd";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 20%;
  background-color: red;
}
.img-fluid {
  width: 100%;
  height: auto;
}
</style>
