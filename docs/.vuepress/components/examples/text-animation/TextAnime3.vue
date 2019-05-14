<template>
  <div class="TextAnime1">
    <textarea v-model.lazy="editor" style="width:80%;height:40px;"></textarea>
    <transition-group tag="div" class="title">
      <span v-for="el in text" :key="el.id" class="item" v-text="el.text"/>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    autoplay: Boolean
  },
  data() {
    return {
      timer: null,
      index: 0,
      // 원본 메시지
      original: [
        '機能ごとに解説している Vue.js 入門書です。これからはじめる方にも、すでに Vue.js をお使いの方にも、楽しんでいただける内容になっています。',
        'Vue.js は直感的に使える機能が多く、雰囲気で使ってしまいがちです。どんなメリット＆デメリットがあるかも解説しているため、しっかりと学習できます。',
        'Vue.js는 직관적으로 사용할 수 있는 내용이 많습니다. 그래서 어떻게든 작동이 되니 자세한 이해 없이 코드를 작성하는 경우가 많습니다. 많이들 실수하는 코드를 살펴보며 어떠한 장점과 단점이 있는지 분석하는 내용도 담고 있습니다.'
      ],
      // 분해한 메시지
      messages: [],
      text: ''
    }
  },
  computed: {
    editor: {
      get() { return this.text.map(e => e.text).join('') },
      set(text) { this.text = this.convText(text) }
    }
  },
  watch: {
    autoplay(val) {
      clearTimeout(this.timer)
      if (val) {
        this.ticker()
      }
    }
  },
  methods: {
    // 데모 전용 타이머
    ticker() {
      this.timer = setTimeout(() => {
        if (this.autoplay) {
          this.index = this.index < this.messages.length-1 ? this.index + 1 : 0
          this.text = this.messages[this.index]
          this.ticker()
        }
      }, 5000)
    },
    // 텍스트를 분리해서 객체로 리턴하기
    convText(text) {
      const alms = {}
      const result = text.split('').map(el => {
        alms[el] = alms[el] ? ++alms[el] : 1
        return { id: `${el}_${alms[el]}`, text: el }
      })
      return Object.freeze(result) // 감시하지 않음
    }
  },
  created() {
    this.messages = this.original.map(el => this.convText(el))
    this.text = this.messages[0]
    this.ticker()
  }
}
</script>

<style scoped>
.title {
  font-size: 2rem;
}
.item {
  display: inline-block;
  min-width: 0.3em;
}
/* 트랜지션 전용 스타일 */
.v-enter-active,
.v-leave-active,
.v-move {
  transition: all 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
