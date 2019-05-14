<template>
  <div class="app">
    <h3>매개변수 있음</h3>
    <ol>
      <li>{{ count }}</li>
      <li>{{ max }}</li>
    </ol>
    <h3>매개변수 있음</h3>
    <ol>
      <li>{{ itemA }}</li>
      <li>{{ itemB(1) }}</li>
      <li>{{ nameA }}</li>
      <li>{{ nameB(1) }}</li>
    </ol>
  </div>
</template>

<script>
import store from './store.js'
export default {
  computed: {
    // 매개변수 있음겟터
    count() { return store.getters.count },   // 1
    max()   { return store.getters.max },     // 2
    // 매개변수 있음겟터
    itemA() { return store.getters.item(1) }, // 1 👍 좋아요.
    itemB() { return store.getters.item },    // 2 👎 싫어요.
    nameA() { return store.getters.name(1) }, // 3 👍 좋아요.
    nameB() { return store.getters.name },    // 4 👎 싫어요.
  }
}
</script>
