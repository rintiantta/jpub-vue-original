<template>
  <li>{{ name }} HP.{{ hp }}</li>
</template>

<script>
export default {
  props: ['name', 'hp']
}
</script>
