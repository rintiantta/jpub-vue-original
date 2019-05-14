<template>
  <div>
    <select v-model="val" multiple>
      <option value="a">A</option>
      <option value="b">B</option>
      <option value="c">C</option>
    </select>
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
