<template>
  <div>
    <input v-model.number="budget" size="4">원 이하 필터링하기 
    <input v-model.number="limit" size="4"> 개의 결과 출력하기
    <button v-on:click="order=!order">변경하기</button>
    <p>{{ matched.length }}개 중에 {{ limited.length }}개를 출력하고 있습니다.</p>
    <ul>
      <!-- v-for에 최종 결과라고 할 수 있는 산출 속성 limited 사용하기 -->
      <li v-for="item in limited" v-bind:key="item.id">
        {{ item.name }} {{ item.price }}원
      </li>
    </ul>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'
export default {
  data() {
    return {
      order: false,
      // 입력 양식에 출력할 데이터
      budget: 3000,
      // 출력할 개수
      limit: 2,
      // 데이터 리스트
      list: [
        { id: 1, name: '사과', price: 1000 },
        { id: 2, name: '바나나', price: 2000 },
        { id: 3, name: '딸기', price: 4000 },
        { id: 4, name: '오렌지', price: 3000 },
        { id: 5, name: '메론', price: 5000 }
      ]
    }
  },
  computed: {
    // budget 아래의 리스트를 리턴하는 산출 속성
    matched: function() {
      return this.list.filter(function(el) {
        return el.price <= this.budget
      }, this)
    },
    // sorted를 새로 추가하기
    sorted: function() {
      return orderBy(this.matched, 'price', this.order ? 'desc' : 'asc')
    },
    // limited에서 사용하는 리스트를 sorted 로 변경하기
    limited: function() {
      return this.sorted.slice(0, this.limit)
    }
  }
}
</script>

<style scoped>

</style>
