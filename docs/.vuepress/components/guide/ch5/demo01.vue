<template>
<div>
  <comp-child val="자식A"></comp-child>
  <comp-child val="자식B"></comp-child>
</div>
</template>

<script>
export default {
  components: {
    compChild: {
      render(h) {
        return h('p', this.val)
      },
      props: ['val']
    }
  }
}
</script>
