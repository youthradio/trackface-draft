<template>
  <div class="ui-container">
    <ul class="tool-list">
      <li class="tool-list-item" v-for="tool in toolsData" :key="tool.name">
        <a href="#"
          ><img
            @click="setTool(tool)"
            :class="[
              'tool-icon',
              { toolIconEnabled: selectedTool.name == tool.name }
            ]"
            :src="require(`../assets/${tool.image}`)"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MainUI",
  props: {},
  data() {
    return {
      selectedTool: "" //we have the tool's name in our component and could send it to our store
    };
  },
  methods: {
    setTool(tool) {
      //would this be to send to the store?
      this.selectedTool = tool;
      this.$store.dispatch("setUIState", { selectedTool: this.selectedTool });
    }
  },
  created() {
    this.selectedTool = this.UIState.selectedTool;
  },
  computed: {
    toolsData() {
      return this.$store.state.toolsData;
    },
    UIState() {
      return this.$store.state.UIState;
    },
    setToolStyle: function() {
      return {};
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
