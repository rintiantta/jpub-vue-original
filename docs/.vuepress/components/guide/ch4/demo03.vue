<template>
  <div>
    <div class="row">
      <span class="form"><input v-model.number="width"></span>
      <span class="value">{{ width }}</span>
    </div>
    <div class="row">
      <span class="form"><input v-model.number="halfWidth"></span>
      <span class="value">{{ halfWidth }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 800
    }
  },
  computed: {
    halfWidth: {
      get: function() { return this.width / 2 },
      // halfWidth 를 2 배수한 숫자를 width 에 할당하기
      set: function (val) { this.width = val * 2 },
    }
  }
}
</script>
