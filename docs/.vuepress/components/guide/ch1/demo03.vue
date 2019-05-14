<template>
<div>
  <p><button v-on:click="handleClick">Click</button></p>
  <p><small>※ 버튼을 클릭하면 경고창이 출력됩니다.</small></p>
</div>
</template>

<script>
export default {
  methods: {
    handleClick: function (event) {
      alert(event.target) // [object HTMLButtonElement]
    }
  }
}
</script>
