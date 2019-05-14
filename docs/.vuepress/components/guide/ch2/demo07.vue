<template>
  <ul>
    <li v-for="(item, index) in list" v-bind:key="item.id" v-if="item.hp">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
      <span v-if="item.hp < 50" class="hinsi">빈사 상태! </span>
      <!-- 버튼은 v-for 내부에 만들기 -->
      <button v-on:click="doAttack(index)">공격하기</button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, name: '슬라임', hp: 100 },
        { id: 2, name: '고블린', hp: 200 },
        { id: 3, name: '드래곤', hp: 500 }
      ]
    }
  },
  methods: {
    doAttack: function (index) {
      this.list[index].hp -= 10 // HP 감소시키기
    }
  }
}
</script>

<style scoped>
.hinsi {
  color: #ff0000;
}
</style>
