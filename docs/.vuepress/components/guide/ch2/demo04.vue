<template>
  <ul>
    <li v-for="item in list"
      v-bind:key="item.id"
      v-bind:class="{ strong: item.hp > 300 }">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
      <span v-if="item.hp > 300">강하다!</span>
    </li>
  </ul>
</template>

<script>
export default {
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

<style scoped>
.strong {
  color: #eb516b;
}
</style>
