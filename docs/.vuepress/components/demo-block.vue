<template>
  <div class="demos">
    <header class="demos-header">DEMO</header>
    <slot>
      <component :is="demo" class="demos-content"/>
    </slot>
    <footer class="demos-footer" v-if="demo">{{ demo }}</footer>
  </div>
</template>

<script>
export default {
  props: { demo: String }
}
</script>

<style scoped>

</style>
