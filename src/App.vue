<template>
  <div id="app">
    <ImageSelect />
    <MainUI />
    <Canvas />
    <SavePicture />
  </div>
</template>

<script>
import MainUI from "./components/UiComponent.vue";
import Canvas from "./components/Canvas.vue";
import SavePicture from "./components/SavePicture.vue";
import ImageSelect from "./components/ImageSelect.vue";

export default {
  name: "App",
  components: {
    MainUI,
    Canvas,
    SavePicture,
    ImageSelect
  },
  created() {
    this.$store.dispatch("loadStore");
  },
  computed: {}
};
</script>

<style></style>
