<template>
  <ul>
    <li v-for="(item, index) in list" v-bind:key="item.id">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
      <!-- 삭제 버튼을 v-for 내부에 만들기 -->
      <button v-on:click="doRemove(index)">몬스터 제거하기</button>
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
    // 요소 삭제 버튼을 클릭할 때의 핸들러
    doRemove: function (index) {
      // 전달받은 인덱스 위치에서 한 개만큼 제거하기
      this.list.splice(index, 1)
    }
  }
}
</script>
