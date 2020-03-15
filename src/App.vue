<template>
  <div class="container">
    <SelectionScreen />
    <MainUI />
    <Canvas />
    <BottomUi />
    <ResultScreen />
  </div>
</template>

<script>
import MainUI from "./components/UiComponent.vue";
import Canvas from "./components/Canvas.vue";
import BottomUi from "./components/BottomUi.vue";
import SelectionScreen from "./components/SelectionScreen.vue";
import ResultScreen from "./components/ResultScreen.vue";

export default {
  name: "App",
  components: {
    MainUI,
    Canvas,
    BottomUi,
    SelectionScreen,
    ResultScreen
  },
  created() {
    this.$store.dispatch("loadStore");
  },
  computed: {}
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>
