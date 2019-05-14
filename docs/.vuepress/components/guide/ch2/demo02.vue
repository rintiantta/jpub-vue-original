<template>
<div>
  <button v-on:click="isActive=!isActive">isActive 변경하기</button>
  <p v-bind:class="{ child: isChild, 'is-active': isActive }" class="item">
    동적 클래스
  </p>
  <p v-bind:style="{ color: textColor, backgroundColor: bgColor }" class="item">
    동적 스타일
  </p>
  <p><small>※ 알기 쉽게 <code>.is-active</code> 는 배경색을 변경하게 했습니다.</small></p>
</div>
</template>

<script>
export default {
  data() {
    return {
      isChild: true,
      isActive: true,
      textColor: 'red',
      bgColor: 'lightgray'
    }
  },
  methods: {}
}
</script>

<style scoped>
.item {
  padding: 4px 8px;
  transition: background-color 0.4s;
}
.is-active {
  background: #ffeaea;
}
</style>
