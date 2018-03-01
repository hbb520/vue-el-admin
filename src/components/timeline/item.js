import TimeLineItem from './src/timeline-item';

/* istanbul ignore next */
TimeLineItem.install = function(Vue) {
  Vue.component(TimeLineItem.name, TimeLineItem);
};

export default TimeLineItem;
