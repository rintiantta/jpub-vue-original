import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    message: '초기 메시지'
  },
  getters: {
    // messageを使用する겟터
    message(state) {
      return state.message
    }
  },
  mutations: {
    // 메시지を変更する뮤테이션
    setMessage(state, payload) {
      state.message = payload.message
    }
  },
  actions: { // 메시지の更新처리
    doUpdate({
      commit
    }, message) {
      commit('setMessage', {
        message
      })
    }
  }
})
export default store
