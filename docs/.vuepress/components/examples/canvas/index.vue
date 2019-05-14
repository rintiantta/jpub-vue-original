<template>
  <div class="example">
    <MyCanvas :radius="radius"/>
    <p><input type="range" min="0" max="100" v-model.number="radius"></p>
  </div>
</template>

<script>
// 캔버스 전용 컴토넌트 읽어 들이기
import MyCanvas from './MyCanvas.vue'
export default {
  components: {
    MyCanvas
  },
  data() {
    return {
      radius: 50
    }
  }
}
</script>
