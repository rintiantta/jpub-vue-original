<template>
  <p class="book-info" :class="pageClass">
    <span class="book-info-label">
      <img src="/jpub-vue/images/icon.png" width="24" height="24" style="vertical-align: bottom;">
      <!--<img src="/svg/book.svg" class="fa-icon">-->
    </span>
    <span class="book-info-title" v-if="$slots.default"><slot/></span>
    <span class="book-info-page">{{ pageText }}</span>
  </p>
</template>

<script>
export default {
  props: {
    page: { type: String, default: null }
  },
  computed: {
    pageClass() {
      return {
        undefined: !this.page ? true : false
      }
    },
    pageText() {
      return this.page ? `${this.page}페이지` : '페이지가 설정되어있지 않습니다.'
    }
  }
}
</script>

<style>
.book-info {
  color: #ec4259;
  font-weight: 500;
}
.book-info-title,
.book-info-label,
.book-info-page {
  display: inline-block;
  padding: 0 4px 0 0;
  line-height: 24px;
}
.book-info-title {
  margin: 0 4px;
  background-color: #f9e0e0;
  background: linear-gradient(transparent 60%, #f9e0e0 0);
}
.book-info-label {
  transform: translateY(-1px);
}
.book-info.undefined .book-info-page {
  font-weight: 800;
}
</style>
