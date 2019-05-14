<template>
  <div>
    <p><button v-on:click="show=!show">변경하기</button></p>
    <transition>
      <div v-show="show">트랜지션 시킬 요소</div>
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
/* 1秒かけて透明度を遷移 */
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
/* 見えなくなるときの透明度 */
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
