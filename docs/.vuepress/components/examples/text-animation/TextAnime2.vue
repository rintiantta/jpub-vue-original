<template>
  <div class="TextAnime1">
    <span
      v-for="(t, index) in text"
      :key="index"
      class="item"
      :style="{animationDelay: index*100+'ms'}"
      v-text="t"
      />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '고양이도 할 수 있는 Vue.js'
    }
  }
}
</script>

<style scoped>
@keyframes text-in {
  0% {
    transform: translate(0, -20px);
    opacity: 0;
  }
}
.item {
  display: inline-block;
  min-width: 0.3em;
  font-size: 2rem;
  animation: text-in .8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
}
</style>
