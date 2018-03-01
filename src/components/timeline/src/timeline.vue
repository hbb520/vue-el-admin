<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>
<script>
  const prefixCls = 'ivu-timeline';
  export default {
    name: 'Timeline',
    props: {
      pending: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        timeline: this
      };
    },
    mounted() {

    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-pending`]: this.pending
          }
        ];
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

  .ivu-timeline {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ivu-timeline-item {
    margin: 0 !important;
    padding: 0 0 12px 0;
    list-style: none;
    position: relative;
  }

  .ivu-timeline-item-tail {
    height: 100%;
    border-left: 1px solid #cccccc;
    position: absolute;
    left: 6px;
    top: 0;
  }

  .ivu-timeline-pending .ivu-timeline-item-tail {
    display: none;
  }

  .ivu-timeline-item-head {
    width: 13px;
    height: 13px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid transparent;
    position: absolute;
  }

  .ivu-timeline-item-head-blue {
    border-color: #2d8cf0;
    color: #2d8cf0;
  }

  .ivu-timeline-item-head-red {
    border-color: #ff4949;
    color: #ff4949;
  }

  .ivu-timeline-item-head-green {
    border-color: #19be6b;
    color: #19be6b;
  }

  .ivu-timeline-item-head-custom {
    width: 40px;
    height: auto;
    margin-top: 6px;
    padding: 3px 0;
    text-align: center;
    line-height: 1;
    border: 0;
    border-radius: 0;
    font-size: 14px;
    position: absolute;
    left: -13px;
    transform: translateY(-50%);
  }

  .ivu-timeline-item-content {
    padding: 1px 1px 10px 24px;
    font-size: 12px;
    position: relative;
    top: -3px;
  }

  .ivu-timeline-item:last-child {
    .ivu-timeline-item-tail {
      display: none;
    }
  }

  .ivu-timeline-pending .ivu-timeline-item:nth-last-of-type(2) {

    .ivu-timeline-item-tail {
      border-left: 1px dotted #cccccc;
    }
    .ivu-timeline-item-content {
      min-height: 48px;
    }
  }

</style>
