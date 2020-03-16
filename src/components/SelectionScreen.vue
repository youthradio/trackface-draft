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
  margin: 0.4rem;
}
// .selected::after {
//   content: "dsdsd";
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   opacity: 20%;
//   background-color: red;
// }

.selected{
  box-shadow: 0px 0px 10px black;
}

.selected::after {
  content: "✔";
  position: absolute;
  top: -0.8rem;
  left: 85%;
  width: 2rem;
  height: 2rem;
  text-align: center;
  vertical-align: bottom;
  padding: 10px 0 0 0; // it's dirty but i'll come up with better code

  background-color: white;
  border: 0.1rem solid black;
  border-radius: 100%;
  z-index: 1000;
}
.img-fluid {
  width: 100%;
  height: auto;
}
</style>
