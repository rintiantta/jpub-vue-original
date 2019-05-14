<template>
  <div class="example-loading example">
    <p><button @click="loadContent" :disabled="!list.length">콘텐츠 새로고침</button></p>
    <!-- ボーダー付きのラッパーレイヤー -->
    <div class="flexbox-wrapper" :style="{height: height+'px'}">
      <!-- 트랜지션 ＆ $refs.body -->
      <ul class="flexbox-body" ref="body">
        <li v-for="item in list" :key="item.id">
          {{ item.name }} {{ item.price }}
        </li>
      </ul>
      <transition>
        <Loading v-if="!list.length"/>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from './Loading.vue'
export default {
  components: { Loading },
  data() {
    return {
      height: 0,
      list: []
    }
  },
  // 워처
  watch: {
    list() {
      // nextTick
      this.$nextTick(() => {
        // $refs
        this.height = this.$refs.body.getBoundingClientRect().height
      })
    }
  },
  methods: {
    loadContent() {
      this.list = []
      axios.get('/data/list.json').then(response => {
        setTimeout(() => {
          this.list = response.data
        }, 1500)
      })
    }
  },
  created() {
    this.loadContent()
  }
}
</script>

<style scoped>
.flexbox-wrapper {
  position: relative;
  border: 2px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  transition: height .4s;
  min-height: 3em;
}
.flexbox-body {
  margin: 0 0 0 24px;
  padding: 16px;
}
/* 트랜지션 전용 스타일 */
.v-enter-active, .v-leave-active {
  transition: opacity .4s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
