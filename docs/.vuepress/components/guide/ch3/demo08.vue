<template>
  <div>
    <label><input type="checkbox" v-model="val" value="A"> A</label>
    <label><input type="checkbox" v-model="val" value="B"> B</label>
    <label><input type="checkbox" v-model="val" value="C"> C</label>
    <p>{{ val }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: []
    }
  }
}
</script>
