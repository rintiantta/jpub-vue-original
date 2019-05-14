<template>
  <div>
    <p><button v-on:click="show=!show">변경하기</button></p>
    <div class="wrapper">
      <section class="block">
        <h3>normal</h3>
        <transition>
          <div v-if="show" key="a">TRUE</div>
          <div v-else key="b">FALSE</div>
        </transition>
      </section>
      <section class="block">
        <h3>out-in</h3>
        <transition mode="out-in">
          <div v-if="show" key="a">TRUE</div>
          <div v-else key="b">FALSE</div>
        </transition>
      </section>
      <section class="block">
        <h3>in-out</h3>
        <transition mode="in-out">
          <div v-if="show" key="a">TRUE</div>
          <div v-else key="b">FALSE</div>
        </transition>
      </section>
    </div>
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
.wrapper {
  display: flex;
  align-items: flex-start;
  width: 100%;
}
.block {
  border: 2px solid rgb(250, 207, 207);
  margin: 4px;
  padding: 8px;
  width: 33.3%;
}
/* 1秒かけて透明度を遷移 */
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
/* 見えなくなるときの透明度 */
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
