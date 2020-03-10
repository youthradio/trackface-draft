<template>
  <div class="ui-container">
    <ul class="tool-list">
      <li class="tool-list-item" v-for="tool in toolsData" :key="tool.name">
        <a href="#"
          ><img v-on:click="selectedTool = tool.name" v-bind:class="{ toolIconEnabled: selectedTool == tool.name}" class="tool-icon" :src="require(`../assets/${tool.image}`)" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MainUI",
  props: {
    toolsData: {
      type: Array,
      required: true,
      default: null
    }
  },
  data() {
    return {
      selectedTool: "",
      toolItems: this.toolsData
    }
  },
  methods: {
    setTool() {

    },
  },
  computed: {
    setToolStyle: function() {
      return {
      
      }
    } 
  }
};
</script>
<style lang="scss" scoped>
@import "~@/css/vars";

.tool-list {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  justify-content: center;
  .tool-icon {
    transition: 0.1s;
    max-width: 100%;
    height: auto;
    text-align: center;
    border: 5px solid $gray;
    border-radius: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }
  .tool-icon:hover {
    transition: 0.1s;
    box-shadow: 0px 0px 5px;
  }
  .toolIconEnabled {
    box-shadow: 0px 0px 5px;
  }
  .tool-list-item {
    margin: 0.5rem;
  }
}
</style>
