<template>
<div>
  <p><button v-on:click="order=!order">변경하기</button></p>
  <!-- transition-group으로 사용할 태그는 속성으로 지정함 -->
  <transition-group tag="ul" class="list">
    <li v-for="item in sortedList" v-bind:key="item.id">
      {{ item.name }} {{ item.price }}원
    </li>
  </transition-group>
</div>
</template>

<script>
import orderBy from 'lodash/orderBy'
export default {
  data() {
    return {
      order: false,
      list: [
        { id: 1, name: '사과', price: 1000 },
        { id: 2, name: '바나나', price: 2000 },
        { id: 3, name: '딸기', price: 3000 }
      ]
    }
  },
  computed: {
    // order 값에 따라 리스트의 순서를 반전하는 산출 속성
    sortedList: function () {
      // Lodash의 orderBy 메소드 사용하기
      return orderBy(this.list, 'price', this.order ? 'desc' : 'asc')
    }
  }
}
</script>

<style scoped>
/* 1초 동안 요소 이동하기 */
.v-move {
  transition: transform 1s;
}
</style>
