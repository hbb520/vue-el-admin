<template>
  <div class="upload-container">
    <el-card class="box-card">
      <el-upload
        class="upload-demo"
        :action="imgPostUrl"
        :on-success="handleSuccess"
        :file-list="fileList2"
        list-type="picture">
        <el-button type="primary">点击上传</el-button>
      </el-upload>
    </el-card>

  </div>
</template>

<script>
  import {imgPostUrl} from "../../common/public-data"
  import moment from "moment"
  export default {
    data() {
      return {
        fileList2: [],
        imgPostUrl: imgPostUrl
      }
    },
    created() {
//        'https://jsonplaceholder.typicode.com/posts/'
    },
    methods: {
//      handleRemove(file, fileList) {
//        console.log(file, fileList);
//      },
//      handlePreview(file) {
//        console.log(file);
//      },
      handleSuccess(response, file){
        console.log(response);
        console.log(file);
        this.$message({
          message: '上传成功',
          type: 'success'
        });
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  @import "./index.scss";
</style>
