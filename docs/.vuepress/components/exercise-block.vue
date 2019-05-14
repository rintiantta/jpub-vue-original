<template>
  <section class="exercise">
    <header class="header">예題にチャレンジ！</header>
    <p><slot name="q"></slot></p>
    <button @click="open=!open">{{ buttonLabel }}</button>
    <transition>
    <div class="a" v-show="open">
      <slot name="a"></slot>
      <small>※この答えは解決の一예です</small>
    </div>
    </transition>
  </section>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  },
  computed: {
    buttonLabel() {
      return !this.open ? '答えを見る' : '答えを隠す'
    }
  }
}
</script>

<style lang="stylus" scoped>
.exercise {
  position: relative;
  background: #e7f4f1;
  padding: 16px 24px;

  .a {
    padding: 8px 0;
  }

  .header {
    display: inline-block;
    position: absolute;
    top: -4px;
    right: -8px;
    padding: 2px 8px;
    color: #fff;
    background: #46bd87;
    transform: rotate(6deg);
  }
}

.v-enter-active {
  transition: opacity 0.8s;
}

.v-enter {
  opacity: 0;
}
</style>
