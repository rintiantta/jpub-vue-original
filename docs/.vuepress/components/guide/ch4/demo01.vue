<template>
  <p>{{ width }}의 절반은 {{ halfWidth }}입니다.</p>
</template>

<script>
export default {
  data() {
    return {
      width: 800
    }
  },
  computed: {
    // 산출 속성 halfWidth 정의하기
    halfWidth: function() {
      return this.width / 2
    }
  }
}
</script>

<style scoped>

</style>
