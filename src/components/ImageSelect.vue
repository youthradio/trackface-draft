<template>
  <div class="image-select-screen">
    <div class="image-select-container">
      <div
        class="image-select-item"
        :key="image.name"
        v-for="image in referenceImages"
      >
        <img
          :class="['img-fluid', 
          {selectedImage: selectedReferenceImg.name == image.name }]"
          @click="setSelection(image)"
          :src="require(`../assets/${image.src}`)"
        />
      </div>
    </div>
    <button @click="finishSelection()">Next</button>
  </div>
</template>

 <!-- line 11 errors out on mount because there is no image to refer to, needs to be applied after load -->

<script>
export default {
  name: "ImageSelect",
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
    },
    finishSelection() {
      this.timeline.imageSelect = true;
      this.$store.dispatch("setTimelineState", {
        imageSelect: true
      });
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
  flex: 2;
  padding: 0.4rem;
}
.selectedImage::after {
  content: "test";
  position: relative;
  left: 0;
}
.img-fluid {
  width: 100%;
  height: auto;
}
</style>
