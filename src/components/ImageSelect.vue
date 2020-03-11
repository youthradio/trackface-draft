<template>
  <div class="image-select-container">
    <div class="image-select-item" :key="pic.src" v-for="pic in pictureBase">
        <img class="image-select-src" :src="pic.src" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageSelect",
  props: {},
  data() {
    return {
        selectedPicture: "",
        pictureBase: [
            {src: 'https://picsum.photos/200'},
            {src: 'https://picsum.photos/200'},
            {src: "https://picsum.photos/200"},
            {src: "https://picsum.photos/200"},
            {src: 'https://picsum.photos/200'},
            {src: 'https://picsum.photos/200'},
            {src: "https://picsum.photos/200"},
            {src: "https://picsum.photos/200"}
            ],
    };
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss" scoped>
@import "~@/css/vars";
.image-select-container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
</style>
