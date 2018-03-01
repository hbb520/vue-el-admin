<template>
  <div :class="classes" :style="styles" @click="back">
    <slot>
      <div :class="innerClasses">
        <i class="el-icon-arrow-up"></i>
      </div>
    </slot>
  </div>
</template>
<script>
  import {scrollTop} from '@/utils/assist';
  import {on, off} from '@/utils/dom';
  const prefixCls = 'ivu-back-top';
  export default {
    props: {
      height: {
        type: Number,
        default: 400
      },
      bottom: {
        type: Number,
        default: 30
      },
      right: {
        type: Number,
        default: 30
      },
      duration: {
        type: Number,
        default: 1000
      }
    },
    data () {
      return {
        backTop: false
      };
    },
    mounted () {
//            window.addEventListener('scroll', this.handleScroll, false);
//            window.addEventListener('resize', this.handleScroll, false);
      on(window, 'scroll', this.handleScroll);
      on(window, 'resize', this.handleScroll);
    },
    beforeDestroy () {
//            window.removeEventListener('scroll', this.handleScroll, false);
//            window.removeEventListener('resize', this.handleScroll, false);
      off(window, 'scroll', this.handleScroll);
      off(window, 'resize', this.handleScroll);
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-show`]: this.backTop
          }
        ];
      },
      styles () {
        return {
          bottom: `${this.bottom}px`,
          right: `${this.right}px`
        };
      },
      innerClasses () {
        return `${prefixCls}-inner`;
      }
    },
    methods: {
      handleScroll () {
        this.backTop = window.pageYOffset >= this.height;
      },
      back () {
        const sTop = document.documentElement.scrollTop || document.body.scrollTop;
        scrollTop(window, sTop, 0, this.duration);
        this.$emit('on-click');
      }
    }
  };
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .ivu-back-top {
    z-index: 2000;
    position: fixed;
    cursor: pointer;
    display: none;
  }

  .ivu-back-top-show {
    display: block;
  }

  .ivu-back-top-inner {
    background-color: rgba(0, 0, 0, .6);
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    transition: all 0.3s ease-in-out;
  }

  .ivu-back-top:hover {
    background-color: rgba(0, 0, 0, .7);
  }

  i {
    color: #fff;
    font-size: 24px;
    padding: 8px 12px;
  }

</style>
