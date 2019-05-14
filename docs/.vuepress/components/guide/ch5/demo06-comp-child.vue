<template>
  <section class="comp-child">
    <slot name="header">
      <header>
        디폴트 타이틀
      </header>
    </slot>
    <div class="content">
      <slot>디폴트 콘텐츠</slot>
    </div>
    <slot name="footer">
      <!-- なければ何も表示しない -->
    </slot>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
.comp-child {
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 16px;
}
.comp-child header {
  background: #f5f5f5;
  padding: 4px 8px;
}
.comp-child .content {
  margin: 0;
  padding: 16px;
}
</style>
