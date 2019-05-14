import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    list: [
      { id: 1, name: '사과', price: 1000 },
      { id: 2, name: '바나나', price: 2000 },
      { id: 3, name: '딸기', price: 3000 }
    ]
  },
  getters: {
    // 単純にステートを返す
    count(state, getters, rootState, rootGetter) {
      return state.count
    },
    // リストの各要素の price プロパティの中から最大숫자を返す
    max(state) {
      return state.list.reduce((a, b) => {
        return a > b.price ? a : b.price
      }, 0)
    },

    // 매개변수 있음겟터

    // listからidが一致する要素を返す
    item(state) {
      // 引数を使用するためアロー함수を返している
      return id => state.list.find(el => el.id === id)
    },
    // 別の겟터を使うこともできる
    name(state, getters) {
      return id => getters.item(id).name
    }
  }
})

export default store
