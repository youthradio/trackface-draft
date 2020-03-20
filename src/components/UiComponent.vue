<template>
  <div class="ui-container">
    <h2>{{ toolsData.name }}</h2>
    <p>{{ toolsData }}</p>

    <h3>Stroke: {{ selectedStrokeWeight }}</h3>
    <h3>Color: {{ selectedColor }}</h3>

    <div class="tool-list">
      <div class="tool-icon-container">
        <img class="tool-icon" :src="require(`../assets/${toolsData.image}`)" />
      </div>
      <div class="tool-icon-container stroke-size-tool">
        <a
          ><svg height="40" width="40">
            <g>
              <circle
                cx="50%"
                cy="50%"
                :r="selectedStrokeWeight"
                fill="black"
              />
            </g></svg
        ></a>
        <div class="">{{ selectedStrokeWeight }}px</div>
      </div>
      <div class="tool-icon-container color-pick-tool">
        <img
          class="tool-icon"
          :src="require(`../assets/icons/colorfill.png`)"
        />
      </div>
    </div>
    <div class="colors">
      <a
        href="#"
        @click.prevent="setColor(color)"
        :key="color"
        v-for="color in toolsData.colors"
      >
        <svg height="40" width="60">
          <g>
            <circle cx="20" cy="20" r="20" :fill="color" />
          </g>
        </svg>
      </a>
    </div>
    <div class="strokes">
      <a
        href="#"
        :key="`key-${size}`"
        v-for="size in toolsData.strokeWeight.slice().reverse()"
        @click.prevent="setStrokeWeight(size)"
      >
        <svg height="40" width="60">
          <g>
            <circle :cx="size" cy="20" :r="size" fill="black" />
          </g>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainUI",
  props: {},
  data() {
    return {
      selectedColor: null,
      selectedStrokeWeight: null,
      toolState: {
        strokeSizeMenu: false,
        colorPickerMenu: false
      }
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

.strokes {
  display: flex;
}
.colors {
  display: flex;
}

.hidden {
  display: none;
}

.tool-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
  justify-content: center;
  width: 5rem;
  .tool-icon {
    transition: 0.1s;
    max-width: 100%;
    height: auto;
    text-align: center;
    border: 0px solid #f0f0f0;
    border-radius: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    background-color: #f0f0f0;
  }
  .stroke-size-tool {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: stretch;
    border: 0px solid #f0f0f0;
    border-radius: 100%;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
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
