<template>
<div>
  <!-- countプロパティを表示する -->
  <p>{{ count }}번 클릭했습니다.</p>
  <!-- このボタンを클릭するとincrement메소드が呼び出される -->
  <button v-on:click="increment">카운트하기</button>
</div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    // 버튼을 클릭할 때의 핸들러
    increment: function () {
      this.count += 1 // 다시 할당하는 처리만 합니다.
    }
  }
}
</script>
