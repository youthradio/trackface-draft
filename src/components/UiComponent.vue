<template>
    <div class="ui-container">
        <ul class="tool-list">
            <li><a class="tool-icon" href="#"><img src="../assets/icons/pencil.png" /> </a></li>
            <li><a class="tool-icon" href="#"><img src="../assets/icons/strokebrush.png" /> </a></li>
            <li><a class="tool-icon" href="#"><img src="../assets/icons/paintbrush.png" /> </a></li>
            <li><a class="tool-icon" href="#"><img src="../assets/icons/sticker.png" /> </a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MainUI',
    props: {
  }
}
</script>
<style lang="scss" scoped>
.tool-list{
    display: inline-flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: #C4C4C4;
    width: 100%;
    justify-content: center;
    .tool-icon {
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        vertical-align: middle;
        padding: 30px;
        border: 1px solid white;
        border-radius: 100%;
    }
    
    img {
        vertical-align: middle;
    }
}

</style>