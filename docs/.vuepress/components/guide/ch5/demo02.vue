<template>
  <ul>
    <comp-child v-for="item in list"
      v-bind:key="item.id"
      v-bind:name="item.name"
      v-bind:hp="item.hp"></comp-child>
  </ul>
</template>

<script>
import CompChild from './demo02-comp-child.vue'
export default {
  components: { CompChild },
  data() {
    return {
      list: [
        { id: 1, name: '슬라임', hp: 100 },
        { id: 2, name: '고블린', hp: 200 },
        { id: 3, name: '드래곤', hp: 500 }
      ]
    }
  }
}
</script>
