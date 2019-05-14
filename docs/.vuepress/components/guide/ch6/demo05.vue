<template>
  <div>
    <p><button v-on:click="count++">변경하기</button></p>
    <transition>
      <div v-bind:key="count" class="num">{{ count }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<style scoped>
.num {
  font-size: 1.8rem;
}
.v-enter-active {
  transition: opacity 1s;
}
/* 微妙に時間をずらして文字色の濃度を調整してます */
.v-leave-active {
  transition: opacity 0.8s ease 0.2s;
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
