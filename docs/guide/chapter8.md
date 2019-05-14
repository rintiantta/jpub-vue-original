---
sidebarDepth: 2
title: CHAPTER 8
---

# CH8 Vuex로 애플리케이션 상태 관리하기

CodeSandbox의 기본 형태는 다음 링크를 참고해주세요.

[https://codesandbox.io/s/pw89zq7kjm](https://codesandbox.io/s/pw89zq7kjm)

최소한의 모듈과 파일만을 추가한 것입니다. Fork해서 다양하게 활용해주세요. 😺

::: tip

경로 내부의 "`@`"는 "`src/`"의 별칭입니다. 만약 등록되어 있지 않은 경우에는 상대 경로로 변경해서 사용해주세요.

<code-caption>예</code-caption>
```js
import store from '@/store.js'
import store from './store.js' // main.js에서는 이러한 형태로 상대 경로로 사용합니다.
```

:::

## S42 기본적인 스토어의 구조

<page-info page="249"/>

<code-caption>src/store.js</code-caption>
```js
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 스토어 만들기
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    // Count up 하는 뮤테이션 등록하기
    increment(state) {
      state.count++
    }
  }
})
export default store
```

`src/main.js` 등에서 `src/store.js`를 읽어 들인 뒤 콘솔을 확인해보세요.

<code-caption>src/main.js</code-caption>
```js
import store from '@/store.js'

console.log(store.state.count) // -> 0
// increment를 커밋하기
store.commit('increment')
// 값이 변경된 것을 확인할 수 있음
console.log(store.state.count) // -> 1
```

## S43 코어 컨셉

<page-info page="252"/>

### 스테이트(state)

```js
const store = new Vuex.Store({
  state: {
    message: '메시지'
  }
})
```

<code-caption>호출 방법</code-caption>
```js
store.state.message
```

### 겟터(getter)

<page-info page="259"/>

<code-caption>src/store.js</code-caption>

```js
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
    // 단순하게 상태 리턴하기
    count(state, getters, rootState, rootGetter) {
      return state.count
    },
    // 리스트 요소들의 price 속성을 기반으로 최댓값을 찾아 리턴하기
    max(state) {
      return state.list.reduce((a, b) => {
        return a > b.price ? a : b.price
      }, 0)
    },
    // 매개 변수를 포함하는 겟터
    // list에서 id가 일치하는 요소 리턴하기
    item(state) {
      // 화살표 함수 사용하기
      return id => state.list.find(el => el.id === id)
    },
    // 다른 겟터를 사용할 수도 있음
    name(state, getters) {
      return id => getters.item(id).name
    }
  }
})
```

<code-caption>호출 방법</code-caption>
```js
store.getters.count
store.getters.max
```

<code-caption>호출 방법(매개 변수가 있는 경우)</code-caption>
```js
store.getters.item(1)
store.getters.name(1)
```

<code-caption>src/App.vue</code-caption>

```vue
<template>
  <div class="app">
    <h3>매개변수 없음</h3>
    <ol>
      <li>{{ count }}</li>
      <li>{{ max }}</li>
    </ol>
    <h3>매개변수 있음</h3>
    <ol>
      <li>{{ itemA }}</li>
      <li>{{ itemB(1) }}</li>
      <li>{{ nameA }}</li>
      <li>{{ nameB(1) }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  computed: {
    // 매개변수가 없는 겟터
    count() { return this.$store.getters.count },   // 1
    max()   { return this.$store.getters.max },     // 2
    // 매개변수가 있는 겟터
    itemA() { return this.$store.getters.item(1) }, // 1 👍 좋아요.
    itemB() { return this.$store.getters.item },    // 2 👎 싫어요.
    nameA() { return this.$store.getters.name(1) }, // 3 👍 좋아요.
    nameB() { return this.$store.getters.name },    // 4 👎 싫어요.
  }
}
</script>
```

[링크 수정하기]
- [소스 코드](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/guide/ch8/s43)

<demo-block demo="guide-ch8-s43-src-App"/>

::: tip

매개변수가 있는 겟터(itemB / nameB)는 편리하지만, 결과가 캐시되지 않습니다. 산출 속성을 통하지 않는 경우도 마찬가지 입니다.
컴포넌트의 <mark>가상 DOM에 변화가 있을 때마다 호출되어 버리므로</mark>, 비용이 높은 처리를 하는 경우에는 주의해서 사용해주세요.

:::

### 뮤테이션(mutations)

```js
const store = new Vuex.Store({
  // ...
  mutations: {
    mutationType(state, payload) {
      state.count = payload
    }
  }
})
```

<code-caption>호출 방법</code-caption>
```js
store.commit('mutationType', payload)
```

### 액션(actions)

```js
const store = new Vuex.Store({
  // ...
  actions: {
    actionType({ commit }, payload) {
      // 액션 내부에서 커밋하기
      commit('mutationType')
    }
  }
})
```

<code-caption>호출 방법</code-caption>
```js
store.dispatch('actionType', payload)
```

## S44 컴포넌트에서 스토어 사용하기

<page-info page="259"/>

### 메시지의 상태를 관리하는 스토어

<page-info page="259"/>

<code-caption>src/store.js</code-caption>
{include:guide/ch8/s44/src/store.js}

### 메시지 사용하기

<page-info page="260"/>

<code-caption>src/App.vue</code-caption>

```vue
<template>
  <div class="app">
    <h1>{{ message }}</h1>
    <EditForm/>
  </div>
</template>
<script>
// 자식 컴포넌트 읽어 들이기
import EditForm from './components/EditForm'
export default {
  name: 'app',
  components: {
    EditForm
  },
  computed: {
    // 로컬 message와 스토어의 message 동기화하기
    message() {
      return this.$store.getters.message
    }
  }
}
</script>
```

### 메시지 변경하기

<page-info page="261"/>

"상태와 겟터에 v-model 사용하기"도 함께 정리했습니다.

<code-caption>src/components/EditForm.vue</code-caption>

```vue
<template>
  <div class="edit-form">
    <h3>바인드와 이벤트를 사용한 경우</h3>
    <input type="text" :value="message" @input="doUpdate">
    <h3>v-model를 사용한 경우</h3>
    <input v-model="message2">
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  computed: {
    message() {
      return this.$store.getters.message
    },
    message2: {
      get() { return this.$store.getters.message },
      set(value) { this.$store.dispatch('doUpdate', value) }
    }
  },
  methods: {
    doUpdate(event) {
      // input의 값을 기반으로 디스패치하기
      this.$store.dispatch('doUpdate', event.target.value)
    }
  }
}
</script>
```

<demo-block demo="guide-ch8-s44-src-App"/>

## S45 모듈을 사용해서 커져 버린 스토어 분할하기

<page-info page="266"/>

### 모듈 사용 방법

<page-info page="266"/>

```js
const store = new Vuex.Store({
  modules: {
    moduleA,
    moduleB
  }
})
```

### 동일 뮤테이션 타입

<page-info page="267"/>

```js
const moduleA = {
  state: {
    count: 1
  },
  mutations: {
    update(state) {
      state.count += 100
    }
  }
}
const moduleB = {
  state: {
    count: 2
  },
  mutations: {
    update(state) {
      state.count += 200
    }
  }
}
```

```js
console.log(store.state.moduleA.count) // -> 1
console.log(store.state.moduleB.count) // -> 2
store.commit('update')
console.log(store.state.moduleA.count) // -> 101
console.log(store.state.moduleB.count) // -> 202
```

### 네임스페이스

<page-info page="268"/>

※ 책에서는 뮤테이션 `update`로 매개 변수 `state`를 받는 부분을 생략했습니다. 다음 코드를 참고해주세요. 🙇‍

```js
const moduleA = {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    update(state) {
      state.count += 100
    }
  }
}
const moduleB = {
  namespaced: true,
  state: {
    count: 2
  },
  mutations: {
    update(state) {
      state.count += 200
    }
  }
}
```

```js
store.commit('moduleA/update') // -> moduleA의 update 커밋하기
store.commit('moduleB/update') // -> moduleB의 update 커밋하기
```

### 네임 스페이스가 있는 모듈에서 외부에 접근하기

<page-info page="270"/>

```js
const moduleA = {
  namespaced: true,
  getters: {
    test(state, getters, rootState, rootGetters) {
      // 자기자신의 item 겟터 사용 : getters['moduleA/item']
      getters.item
      // 루트의 user 겟터 사용
      rootGetters.user

      return [getters.item, rootGetters.user]
    },
    item() { return 'getter: moduleA/item' },
  },
  actions: {
    test({ dispatch, commit, getters, rootGetters }) {
      // 자시 자신의 update 디스패치하기
      dispatch('update')
      // 루트의 update 디스패치하기
      dispatch('update', null, { root: true })
      // 루트의 update 커밋하기
      commit('update', null, { root: true })
      // 루트에 등록되어 있는 moduleB의 update 커밋하기
      commit('moduleB/update', null, { root: true })
    },
    update() { console.log('action: moduleA/update') },
  }
}
const moduleB = {
  namespaced: true,
  mutations: {
    update() { console.log('mutation: moduleB/update') }
  }
}

const store = new Vuex.Store({
  modules: {
    moduleA,
    moduleB
  },
  getters: {
    user() { return 'getter: user' }
  },
  mutations: {
    update() { console.log('mutation: update') }
  },
  actions: {
    update() { console.log('action: update') }
  }
})

// 어떤 것이 호출되었는지 로그로 확인해보기
store.dispatch('moduleA/test')
console.log(store.getters['moduleA/test'])
```

### 모듈 재사용하기

<page-info page="273"/>

<code-caption>공통 모듈</code-caption>
```js
const myModule = {
  namespaced: true,
  state() {
    return {
      entries: []
    }
  },
  mutations: {
    set(state, payload) {
      state.entries = payload
    }
  },
  actions: {
    load({ commit }, file) {
      axios.get(file).then(response => {
        commit('set', response.data)
      })
    }
  }
}
```

<code-caption>같은 모듈 정의 사용하기</code-caption>
```js
const store = new Vuex.Store({
  modules: {
    moduleA: myModule,
    moduleB: myModule
  }
})
// 다른 데이터를 읽어 들이는 등으로 사용합니다.
store.dispatch('moduleA/load', '/path/a.json')
store.dispatch('moduleB/load', '/path/b.json')
```

내용은 다르지만, 같은 방법으로 사용할 데이터에 적합합니다.

<code-caption>재료 데이터</code-caption>
```json
[
  { "id": 1, "name": "사과" },
  { "id": 2, "name": "바나나" }
]
```

<code-caption>조리 도구 데이터</code-caption>
```json
[
  { "id": 1, "name": "도마" },
  { "id": 2, "name": "후라이팬" }
]
```

스토어 재사용은 관리 화면 등을 만들 때 활용하기 좋습니다.

## S46 이외의 기능과 옵션

<page-info page="274"/>

### 스토어의 상태 감시하기

<page-info page="274"/>

<code-caption>상태 감시</code-caption>
```js
const store = new Vuex.store({ ... })
const unwatch = store.watch(
  (state, getters) => {
    return state.count // 감시하고 싶은 데이터를 리턴
  },
  (newVal, oldVal) => {
    // 처리
  }
)
```

<code-caption>커밋과 디스패치 감시하기</code-caption>
```js
// 커밋에 훅
store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})
// 디스패치에 훅
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})
```

### Vuex에서 핫리로딩 사용하기

<page-info page="275"/>

```js
if (module.hot) {
  module.hot.accept(['@/store/myModule.js'], () => {
    // 변경된 모듈 읽어 들이기
    const myModule = require('@/store/myModule.js').default
    // 새로운 정의 설정하기
    store.hotUpdate({
      modules: {
        myModule: myModule
      }
    })
  })
}
```
