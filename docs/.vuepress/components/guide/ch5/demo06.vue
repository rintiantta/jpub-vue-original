<template>
<comp-child>
  <header slot="header">
    Hello Vue.js!
  </header>
  Vue.js는 JavaScript 프레임워크입니다.
</comp-child>
</template>

<script>
import CompChild from './demo06-comp-child.vue'
export default {
  components: { CompChild }
}
</script>
