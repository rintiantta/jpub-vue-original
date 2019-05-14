<template>
<div>
  <p>
    <button v-on:click="doShuffle">셔플</button>
    <button v-on:click="doAdd">추가</button>
  </p>
  <transition-group tag="ul" class="list">
    <li v-for="(item, index) in list"
      v-bind:key="item"
      class="item"
      v-on:click="doRemove(index)">{{ item }}</li>
  </transition-group>
</div>
</template>

<script>
import shuffle from 'lodash/shuffle'
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {
    doShuffle: function () {
      this.list = shuffle(this.list)
    },
    doAdd: function() {
      var newNumber = Math.max.apply(null, this.list) + 1
      var index = Math.floor(Math.random() * (this.list.length + 1))
      this.list.splice(index, 0, newNumber)
    },
    doRemove: function(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style scoped>
/* 박스 스타일 정의 */
.list {
  width: 240px;
  padding: 0;
}
.item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  width: 40px;
  height: 40px;
  background: #f5f5f5;
}
/* 트랜지션 전용 스타일 */
.v-enter-active, .v-leave-active, .v-move {
  transition: all 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
  background: #f9a3b1;
  transform: translateY(-30px);
}
</style>
