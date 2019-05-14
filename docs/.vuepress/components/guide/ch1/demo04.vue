<template>
<div>
  <p><small>※ 좋아하는 글자를 입력해보세요.</small></p>
  <input v-model="message">
  <p>{{ message }}</p>
</div>
</template>

<script>
export default {
  data() {
    return {
      message: '초기 메시지'
    }
  }
}
</script>
