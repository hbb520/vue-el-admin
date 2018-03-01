import TimeLine from './src/timeline';

/* istanbul ignore next */
TimeLine.install = function(Vue) {
  Vue.component(TimeLine.name, TimeLine);
};

export default TimeLine;
