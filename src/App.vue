<template>
  <div id="app">
    <MainUI :toolsData="toolsData" />
    <Canvas />
  </div>
</template>

<script>
import MainUI from "./components/UiComponent.vue";
import Canvas from "./components/Canvas.vue";

export default {
  name: "App",
  components: {
    MainUI,
    Canvas
  },
  created() {
    this.$store.dispatch("loadStore");
  },
  computed: {
    toolsData() {
      return this.$store.state.toolsData;
    }
  }
};
</script>

<style></style>
