<template>
<div>
  <button v-on:click="show=!show">변경하기</button>
  <p v-if="show">Hello Vue.js!</p>
</div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>

<style>

</style>
