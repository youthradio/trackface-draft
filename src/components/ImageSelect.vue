<template>
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
</template>

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
