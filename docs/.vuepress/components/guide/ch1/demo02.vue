<template>
  <ol>
    <li v-for="item in list">{{ item }}</li>
  </ol>
</template>

<script>
export default {
  data() {
    return {
      list: ['사과', '바나나', '딸기']
    }
  }
}
</script>

<style>

</style>
