<template>
  <comp-child v-on:childs-event="parentsMethod"></comp-child>
</template>

<script>
export default {
  components: {
    compChild: {
      render(h) {
        return h('button', {
          on: {
            click: this.handleClick
          }
        }, 'イベント発火')
      },
      methods: {
        handleClick() {
          this.$emit('childs-event')
        }
      }
    }
  },
  methods: {
    // childs-eventが発生した！
    parentsMethod: function () {
      alert('イベントをキャッチ！ ')
    }
  }
}
</script>
