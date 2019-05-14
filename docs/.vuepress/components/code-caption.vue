<template>
  <div class="code-caption">
    <img src="/jpub-vue/svg/code.svg" class="fa-icon"><span class="code-caption-label"><slot>設定されていません</slot></span>
  </div>
</template>

<script>
//import 'vue-awesome/icons/regular/hand-point-down'
//import 'vue-awesome/icons/regular/file-code'
export default {}
</script>


<style>
.code-caption {
  margin-top: -1em;
  padding-top: 1.5em;
  margin-bottom: -8px;
}
.code-caption-label {
  display: inline-block;
  margin-left: 8px;
  font-size: 85%;
}
</style>
