<template>
    <div class="ui-container">
        <ul class="tool-list">
            <li
                v-for="tool in toolsData"
                :key="tool.name">
                <a href="#"><img class="tool-icon" :src="`${tool.image}`" /> 
                </a>
                </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MainUI',
    props: {
        toolsData:{
            type:Object,
            required: true,
            default: null
        }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/css/vars";

.tool-list {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  .tool-icon {
    max-width: 100px;
    height: auto;
    text-align: center;
    border: 5px solid $white;
    border-radius: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }
}
</style>