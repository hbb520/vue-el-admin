<template>
  <div class="editor-container">
    <a href="https://github.com/davidroyer/vue2-editor"
       class="el-button el-button--primary el-button--medium"
       target="_blank">
      vue2-editor
    </a>


    <vue-editor
      v-model="content"
      useCustomImageHandler
      @imageAdded="handleImageAdded"
      :editorToolbar="customToolbar"
    ></vue-editor>


    <div v-html="content"></div>

  </div>
</template>

<script>
  import index from './index'
  export default index
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  @import "./index.scss";
</style>
