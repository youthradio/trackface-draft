<template>
  <div id="app">
    <MainUI :toolsData="toolsData" />
  </div>
</template>

<script>
import MainUI from './components/UiComponent.vue'

export default {
  name: 'App',
  components: {
    MainUI,
  },
    created() {
    this.$store.dispatch('loadStore');
  },
  computed:{
    toolsData(){
      return this.$store.state.toolsData;
    }
  }
}
</script>

<style>
</style>
