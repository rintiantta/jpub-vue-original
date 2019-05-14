<template>
  <div>
    <h3>잘못된 스타일 정의</h3>
    <p><button v-on:click="show1=!show1">변경하기</button></p>
    <transition>
      <div v-if="show1" key="a">TRUE</div>
      <div v-else key="b">FALSE</div>
    </transition>
    <h3>정상적인 스타일 정의</h3>
    <p><button v-on:click="show2=!show2">변경하기</button></p>
    <transition name="t2">
      <div v-if="show2" key="a">TRUE</div>
      <div v-else key="b">FALSE</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: true,
      show2: true
    }
  }
}
</script>

<style scoped>
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}

.t2-enter-active, .t2-leave-active {
  transition: opacity 1s;
}
.t2-leave-active {
  position: absolute;
}
.t2-enter, .t2-leave-to {
  opacity: 0;
}
</style>
