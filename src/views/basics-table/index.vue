<template>
  <div class="table-container">
    <div class="search-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="formInline.user" placeholder="关键字"></el-input>
        </el-form-item>

        <el-form-item label="分类">
          <el-select v-model="formInline.region1" placeholder="请选择" @change="select1change">
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="formInline.region2" placeholder="请选择" @change="select2change">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="formInline.region3" placeholder="请选择">
            <el-option
              v-for="item in options3"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData(1)">查询</el-button>
          <el-button @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="handle-box">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
      <el-button type="danger" :disabled="multipleSelection.length==0">删除所选</el-button>
    </div>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      element-loading-text="Loading"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      border fit highlight-current-row>
      <el-table-column
        type="selection"
        width="38">
      </el-table-column>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='缩略图' width="180">
        <template slot-scope="scope">
          <img :src="imgRUrl+scope.row.image" alt="" class="table-img">
        </template>
      </el-table-column>
      <el-table-column label="视屏名称">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否显示" width="110" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isDisplayed">是</el-tag>
          <el-tag v-if="!scope.row.isDisplayed" type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <div class="table-btn">
            <router-link :to="{ path: 'table_add', query: { id: scope.row.id }}">
              <el-button type="primary">编辑</el-button>
            </router-link>

            <el-button type="danger" plain @click="deleteOne(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listQuery.total">
    </el-pagination>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2"
                              style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
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
