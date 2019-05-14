<template>
  <div>
    <input type="file" v-on:change="handleChange">
    <div v-if="preview"><img v-bind:src="preview"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      preview: ''
    }
  },
  methods: {
    handleChange: function (event) {
      var file = event.target.files[0]
      if (file && file.type.match(/^image\/(png|jpeg)$/)) {
        this.preview = window.URL.createObjectURL(file)
      }
    }
  }
}
</script>
