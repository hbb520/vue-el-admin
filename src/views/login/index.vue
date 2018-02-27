<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">admin</h3>
      <el-form-item prop="username">
        <i class="fa fa-user"></i>
        <el-input
          placeholder="请输入账号"
          name="username"
          prefix-icon="el-icon-search"
          v-model="loginForm.password"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <i class="fa fa-unlock-alt"></i>
        <el-input
          :type="pwdType"
          placeholder="请输入密码"
          name="password"
          prefix-icon="el-icon-search"
          v-model="loginForm.username"
        ></el-input>
        <i class="el-icon-view" @click="showPwd"></i>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate'
  import {getToken, setToken, removeToken} from '@/utils/auth'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: 'admin'
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        setToken('admin')
        this.loading = true
        setTimeout(() => {
          this.$router.push({path: '/example'})
        }, 500)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-image: url("../../../static/imgs/background.png");
    .tips {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
      background: #fff;
      overflow: hidden;
      border-radius: 2px;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .el-form-item {
      .el-input--prefix .el-input__inner {
        padding-left: 40px;
      }
      position: relative;
      .el-input input {
        height: 47px;
      }
      .el-input__icon {
        display: none;
      }
      .fa-user {
        position: absolute;
        top: 13px;
        left: 13px;
        z-index: 100;
        color: #606266;
        font-size: 18px;
      }
      .fa-unlock-alt {
        position: absolute;
        top: 13px;
        left: 13px;
        z-index: 100;
        font-size: 18px;
        color: #606266;
      }
      .el-icon-view {
        position: absolute;
        top: 13px;
        right: 13px;
        z-index: 100;
        font-size: 18px;
        color: #606266;
        cursor: pointer;
      }
      .el-icon-view:hover {
        font-size: 25px;
      }
    }

  }
</style>
