<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <circle cx="100" cy="75" v-bind:r="radius" fill="lightpink" />
    </svg>
    <input type="range" min="0" max="100" v-model="radius">
  </div>
</template>

<script>
export default {
  data() {
    return {
      radius: 50
    }
  },
  methods: {
  }
}
</script>
