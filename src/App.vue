<template>
  <div id="app">
    <MainUI />
    <Canvas />
  </div>
</template>

<script>
import MainUI from './components/UiComponent.vue'
import Canvas from './components/Canvas.vue'

export default {
  name: 'App',
  components: {
    MainUI,
    Canvas
  }
}
</script>

<style>
</style>
