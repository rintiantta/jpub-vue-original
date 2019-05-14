<template>
  <div>
    <p><button v-on:click="show=!show">변경하기</button></p>
    <transition>
      <div v-if="show">
        <img src="/jpub-vue/images/icon.png" width="48" height="48">
      </div>
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
.v-enter-active,
.v-leave-active {
  transition: opacity 1s, transform 1s;
}
/* 表示するときは左から */
.v-enter {
  opacity: 0;
  transform: translateX(-10px);
}
/* 消えるときは下へ */
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
