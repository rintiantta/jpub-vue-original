<template>
<div>
  <button v-on:click="show=!show">변경하기</button>
  <transition>
    <p v-if="show">Hello Vue.js!</p>
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>

<style scoped>
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
/* opacity:0에서 1로 페이드인&페이드 아웃 */
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
