<template>
  <div>
    <label><input type="radio" value="a" v-model="val"> A</label>
    <label><input type="radio" value="b" v-model="val"> B</label>
    <label><input type="radio" value="c" v-model="val"> C</label>
    <p>{{ val }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: ''
    }
  }
}
</script>
