<template>
  <div class="example">
    <p>
      <button @click="doAdd">추가</button>
      <button @click="current=1">전체</button>
      <button @click="current=n" v-for="n in [3,5]" :key="n">
        {{n}}의 배수
      </button>
    </p>
    <transition-group tag="ul" class="list"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @enter-cancelled="afterEnter">
      <li v-for="(item, index) in filteredList"
        :data-index="index"
        :key="item"
        class="item"
        @click="doRemove(item)">{{ item }}</li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addEnter: false,
      current: 1,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  computed: {
    filteredList() {
      return this.list.filter(el => el % this.current === 0)
    }
  },
  methods: {
    doAdd() {
      // 추가ならフラグを立てる
      this.addEnter = true
      const newNumber = Math.max.apply(null, this.list) + 1
      const index = Math.floor(Math.random() * (this.list.length + 1))
      this.list.splice(index, 0, newNumber)
    },
    doRemove(item) {
      this.list.splice(this.list.indexOf(item), 1)
    },
    // 트랜지션開始でインデックス*100ms分のディレイを付与
    beforeEnter(el) {
      this.$nextTick(() => {
        if (!this.addEnter) {
          // 추가でなければディレイを付与
          el.style.transitionDelay = 100 * parseInt(el.dataset.index, 10) + 'ms'
        } else {
          // 추가ならフラグを消すだけ
          this.addEnter = false
        }
      })
    },
    // 트랜지션완료またはキャンセルでディレイを제거
    afterEnter(el) {
      el.style.transitionDelay = ''
    }
  }
}
</script>

<style src="./style.css" scoped></style>
