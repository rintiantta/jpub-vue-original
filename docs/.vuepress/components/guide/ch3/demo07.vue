<template>
  <div>
    <label>
      <input type="checkbox" v-model="val"> {{ val }}
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: true
    }
  }
}
</script>
