<template>
  <div id="app">
    <ImageSelect />
    <MainUI />
    <Canvas />
    <BottomUi />
  </div>
</template>

<script>
import MainUI from "./components/UiComponent.vue";
import Canvas from "./components/Canvas.vue";
import BottomUi from "./components/BottomUi.vue";
import ImageSelect from "./components/ImageSelect.vue";

export default {
  name: "App",
  components: {
    MainUI,
    Canvas,
    BottomUi,
    ImageSelect
  },
  created() {
    this.$store.dispatch("loadStore");
  },
  computed: {}
};
</script>

<style></style>
