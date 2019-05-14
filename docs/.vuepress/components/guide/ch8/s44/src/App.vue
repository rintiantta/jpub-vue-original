<template>
  <div class="app">
    <h1>{{ message }}</h1>
    <EditForm/>
  </div>
</template>
<script>
import store from './store'
// 자식 컴포넌트 읽어 들이기
import EditForm from './components/EditForm'
export default {
  name: 'app',
  components: {
    EditForm
  },
  computed: {
    // 로컬의 message와 스토어의 message 동기화하기
    message() {
      return store.getters.message
    }
  }
}
</script>
