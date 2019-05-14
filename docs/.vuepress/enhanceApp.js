//import Icon from 'vue-awesome/components/Icon.vue'
//const Icon = require('vue-awesome/components/Icon')
import CodeCaption from './components/code-caption.vue'
import PageInfo from './components/page-info.vue'
import DemoBlock from './components/demo-block.vue'
import ExerciseBlock from './components/exercise-block.vue'

import GuideCh8S43SrcApp from './components/guide/ch8/s43/src/App.vue'
import GuideCh8S44SrcApp from './components/guide/ch8/s44/src/App.vue'

export default ({
  Vue
}) => {
  //Vue.component('Icon', Icon)
  Vue.component('code-caption', CodeCaption)
  Vue.component('page-info', PageInfo)
  Vue.component('demo-block', DemoBlock)
  Vue.component('exercise-block', ExerciseBlock)

  // 非同期컴포넌트が読み込み失敗する対策
  Vue.component('GuideCh8S43SrcApp', GuideCh8S43SrcApp)
  Vue.component('GuideCh8S44SrcApp', GuideCh8S44SrcApp)

}
