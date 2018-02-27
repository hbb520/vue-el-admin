<template>
  <div class="app-wrapper" :class="{hideSidebar:isCollapse}">
    <div class="sidebar-container">
      <scroll-bar>
        <div class="menu">
          <el-menu
            mode="vertical"
            :unique-opened="true"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409EFF"
            :collapse="isCollapse"
            :router="true">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>参考案例</span>
              </template>
              <el-menu-item index="/example/table" :route="{path:'/example/table'}">
                table
              </el-menu-item>
              <el-menu-item index="/example/upload" :route="{path:'/example/upload'}">
                upload
              </el-menu-item>
              <el-menu-item index="/example/editor" :route="{path:'/example/editor'}">
                editor
              </el-menu-item>

            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">导航三</span>
              </template>

              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
              <el-menu-item index="3-3">选项3</el-menu-item>

            </el-submenu>
          </el-menu>
        </div>
      </scroll-bar>
    </div>
    <div class="main-container">
      <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="!isCollapse"></hamburger>
        <breadcrumb></breadcrumb>
        <a class="avatar-container" @click="logout">退出登录</a>
      </el-menu>
      <div class="app-container">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import ScrollBar from '@/components/ScrollBar'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      ScrollBar
    },
    name: 'home',
    data() {
      return {
        loading: false,
        pwdType: 'password',
        isCollapse: false,
      }
    },
    methods: {
      logout(){
        this.$router.push({path: '/login'})
      },
      toggleSideBar() {
        if (this.isCollapse == false) {
          this.isCollapse = true;
        } else {
          this.isCollapse = false;
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .app-container {
    padding: 20px 20px 50px 20px;
  }
</style>
