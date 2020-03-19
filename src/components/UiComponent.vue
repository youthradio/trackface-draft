<template>
  <div class="ui-container">
    <h2>{{ toolsData.name }}</h2>
    <p>{{ toolsData }}</p>
    <h3>Stroke: {{ selectedStrokeWeight }}</h3>
    <h3>Color: {{ selectedColor }}</h3>
    <div class="colors">
      <span
        :style="{ backgroundColor: color }"
        :key="color"
        v-for="color in toolsData.colors"
      >
        <a href="#" @click.prevent="setColor(color)">
          {{ color }}
        </a>
      </span>
    </div>
    <div class="strokes">
      <svg
        height="40"
        width="60"
        :key="`key-${size}`"
        v-for="size in toolsData.strokeWeight"
      >
        <a href="#" @click.prevent="setStrokeWeight(size)">
          <g>
            <circle :cx="size" cy="20" :r="size" fill="red" />
            <text
              dominant-baseline="middle"
              alignment-baseline="middle"
              y="20"
              :x="5 + 2 * size"
              class="small"
            >
              {{ size }}
            </text>
          </g>
        </a>
      </svg>
    </div>
    <img class="tool-icon" :src="require(`../assets/${toolsData.image}`)" />
  </div>
</template>

<script>
export default {
  name: "MainUI",
  props: {},
  data() {
    return {
      selectedColor: null,
      selectedStrokeWeight: null
    };
  },
  methods: {
    setColor(color) {
      this.selectedColor = color;
      this.$store.dispatch("setUIState", { selectedColor: this.selectedColor });
    },
    setStrokeWeight(stroke) {
      //would this be to send to the store?
      this.selectedStrokeWeight = stroke;
      this.$store.dispatch("setUIState", {
        selectedStrokeWeight: this.selectedStrokeWeight
      });
    }
  },
  created() {
    this.selectedColor = this.UIState.selectedColor;
    this.selectedStrokeWeight = this.UIState.selectedStrokeWeight;
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
