<template>
  <div id="app">
    <MainUI />
    <Canvas />
    <SavePicture />
  </div>
</template>

<script>
import MainUI from './components/UiComponent.vue'
import Canvas from './components/Canvas.vue'
import SavePicture from './components/SavePicture.vue'

export default {
  name: 'App',
  components: {
    MainUI,
    Canvas,
    SavePicture
  }
}
</script>

<style>
</style>
