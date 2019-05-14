---
sidebarDepth: 2
title: CHAPTER 9
---

# CH9 Vue Router로 SPA 만들기

CodeSandbox의 기본 형태는 다음 링크를 참고해주세요.

[https://codesandbox.io/s/2xqzz531zp](https://codesandbox.io/s/2xqzz531zp)

최소한의 모듈과 파일만을 추가한 것입니다. Fork해서 다양하게 활용해주세요. 😺

## S48 간단한 SPA의 구조

<page-info page="282~287"/>

### 페이지 컴포넌트 정의하기

<code-caption>src/views/Home.vue</code-caption>
```vue
<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>
```

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>상품 정보</h1>
  </div>
</template>
```

### 라우트 정의하기

<code-caption>src/router.js</code-caption>
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
// 라우트 전용 컴포넌트 읽어 들이기
import Home from '@/views/Home'
import Product from '@/views/Product'
// Vuex와 마찬가지로 플러그인 등록하기
Vue.use(VueRouter)
// VueRouter 인스턴스 생성하기
const router = new VueRouter({
  // URL 경로와 연결할 컴포넌트 맵핑하기
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/product',
      component: Product
    }
  ]
})
//  생성한 VueRouter 인스턴스 익스포트하기
export default router
```

### 애플리케이션에 라우터 등록하기

<code-caption>src/main.js</code-caption>
```js
import router from './router.js'
new Vue({
  el: '#app',
  router, // 애플리케이션 등록하기
  render: h => h(App)
})
```

### 설정한 라우터 뷰 출력하기

<code-caption>src/App.vue</code-caption>
```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/product">상품 정보</router-link>
    </nav>
    <!-- 여기에 경로와 일치하는 뷰가 출력됩니다. -->
    <router-view />
  </div>
</template>
```

### URL에 해시 붙이지 않기

<code-caption>.htaccess</code-caption>
```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
# 서브 디렉터리가 있는 경우
# RewriteBase /my-app/
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
</IfModule>
```

서브 디렉터리가 있는 경우, VueRouter 생성자의 옵션으로 `base`를 설정합니다.

<code-caption>src/router.js</code-caption>
```js
const router = new VueRouter({
  base: '/my-app/'
})
```

## S51 매개변수가 있는 동적 라우트로 콘텐츠 만들기

<page-info page="293~299"/>

### 페이지 컴포넌트 정의하기

<code-caption>src/views/ProductList.vue</code-caption>
```vue
<template>
  <div class="product-list">
    <h1>상품 목록</h1>
  </div>
</template>
```

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>상품 정보</h1>
  </div>
</template>
```

### 패턴 매치 라우팅

<page-info page="294"/>

<code-caption>src/router.js</code-caption>
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import ProductList from '@/views/ProductList'
import Product from '@/views/Product'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/product', // ID가 붙어있지 않으면 리스트 출력하기
      component: ProductList
    },
    {
      path: '/product/:id', // ':id'가 매개 변수에 들어있는 경우
      component: Product
    }
  ]
})
export default router
```

Product.vue 컴포넌트에서 매개 변수를 확인해봅시다.

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>상품 정보</h1>
    <p>이 페이지는 ID.{{ $route.params.id }}의 상세를 출력합니다.</p>
  </div>
</template>
```

### 매개 변수를 props로 컴포넌트에 전달하기

<page-info page="295"/>

<code-caption>src/router.js</code-caption>
```js
const router = new VueRouter({
  routes: [
    // ...
    {
      path: '/product/:id',
      component: Product,
      // 함수로 지정하면 첫 번째 매개변수로 현재 라우트 객체를 사용할 수 있음
      props: route => ({
        id: Number(route.params.id)
      })
    }
  ]
})
```

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>상품 정보</h1>
    <p>이 페이지는 ID.{{ id }}의 상세를 출력합니다.</p>
  </div>
</template>
<script>
  export default {
    props: {
      id: Number
    }
  }
</script>
```

### 콘텐츠 출력하기

<page-info page="297"/>

<code-caption>src/api/products.js</code-caption>
```js
// 상품 리스트 배열
const database = [
  { id: 1, name: '상품A', price: 1000, content: '상품A 상세' },
  { id: 2, name: '상품B', price: 2000, content: '상품B 상세' },
  { id: 3, name: '상품C', price: 3000, content: '상품C 상세' }
]
// 임포트 대상에서 사용할 수 있는 함수를 객체로 정의하기
export default {
  fetch(id) {
    return database
  },
  find(id) {
    return database.find(el => el.id === id)
  },
  asyncFind(id, callback) {
    setTimeout(() => {
      callback(database.find(el => el.id === id))
    }, 1000)
  }
}
```

#### 상품 리스트 목록 페이지

<code-caption>src/views/ProductList.vue</code-caption>
```vue
<template>
  <div class="product-list">
    <h1>상품 목록</h1>
    <ul>
      <li v-for="{ id, name } in list" :key="id">
        <router-link :to="`/product/${ id }`">{{ name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import products from '@/api/products.js'
  export default {
    computed: {
      list: () => products.fetch()
    }
  }
</script>
```

#### 상품 정보 출력하기

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product" v-if="item" key="product">
    <h1>상품 정보</h1>
    <dl class="product-table">
      <dt>상품 이름</dt>
      <dd>{{ item.name }}</dd>
      <dt>가격</dt>
      <dd>{{ item.price }}원</dd>
      <dt>상품 설명</dt>
      <dd>{{ item.content }}</dd>
    </dl>
  </div>
  <div v-else key="loading">상품 정보를 읽어 들이고 있습니다...</div>
</template>

<script>
  import products from '@/api/products.js'
  export default {
    props: {
      id: Number
    },
    data() {
      return {
        item: null
      }
    },
    watch: {
      id: {
        handler() {
          products.asyncFind(this.id, item => {
            this.item = item
          })
        },
        immediate: true
      }
    }
  }
</script>
```

## S52 네스트되어 있는 복잡한 페이지 만들기

<page-info page="302～306"/>

::: tip

※ 이번 절의 샘플 코드는 Vuex 모듈을 사용하므로, Vuex와 Vuex 모듈의 사용 방법을 이해하고 있어야 합니다. 미리 "8장 Vuex로 애플리케이션의 상태 관리하기"를 읽는 것을 추천합니다. 

:::

### 네스트된 라우트 정의하기

<page-info page="302"/>

<code-caption>src/router.js</code-caption>
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import ProductList from '@/views/ProductList' // 상품 목록
import Product from '@/views/Product' // 상품 정보(부모 라우트)
// Product 자식 라우트들
import ProductHome from '@/views/Product/Home'
import ProductReview from '@/views/Product/Review'
import ProductReviewDetail from '@/views/Product/ReviewDetail'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    // 상품 목록 페이지
    {
      path: '/product',
      component: ProductList,
    },
    // 상품 정보 페이지
    {
      path: '/product/:id',
      component: Product,
      props: route => ({
        id: Number(route.params.id)
      }),
      children: [
        // 상품 상세(디폴트 라우트)
        {
          name: 'product-home',
          path: '',
          component: ProductHome
        },
        // 상품 리뷰 목록
        {
          name: 'product-review',
          path: 'review',
          component: ProductReview
        },
        // 상품 리뷰 상세
        {
          name: 'review-detail',
          path: 'review/:rid', // 부모 라우트로 사용하지 않는 매개 변수 지정하기
          component: ProductReviewDetail,
          props: route => ({
            rid: Number(route.params.rid)
          })
        }
      ]
    }
  ]
})
export default router
```

### 데이터 공유에는 Vuex 사용하기

<page-info page="302"/>

<code-caption>src/store/product.js</code-caption>
```js
import products from '@/api/products.js'
// 상품 상세 전용 Vuex 모듈
export default {
  namespaced: true,
  state: {
    detail: {}
  },
  getters: {
    detail: state => state.detail
  },
  mutations: {
    set(state, { detail }) {
      state.detail = detail
    },
    clear(state) {
      state.detail = {}
    }
  },
  actions: {
    load({ commit }, id) {
      products.asyncFind(id, detail => {
        commit('set', { detail })
      })
    },
    destroy({ commit }) {
      commit('clear')
    }
  }
}
```

::: tip Vuex 모듈 등록 방법

다음 과정에 따라 Vuex와 Vuex 모듈을 등록해주세요.

1. "src/store/product.js" 모듈을 "src/store.js" 스토어 루트에 등록합니다.
2. "src/store.js"의 스토어 루트를 "src/main.js" 애플리케이션에 등록합니다.

구체적인 예를 살펴봅시다.

<code-caption>src/store.js</code-caption>
```js
import Vue from 'vue'
import Vuex from 'vuex'
import product from '@/store/product.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product // 모듈을 스토어 루트에 등록
  },
  // ...
})
```

<code-caption>src/main.js</code-caption>
```js
import Vue from 'vue'
import store from '@/store.js'
import router from '@/router.js'
import App from '@/App.vue'

new Vue({
  el: '#app',
  store, // 애플리케이션에 등록
  router,
  render: h => h(App)
  // ...
})
```

Vuex와 관련된 자세한 내용은 8장을 참고해주세요.

:::

### 부모 라우트 전용 컴포넌트 정의하기

<page-info page="303"/>

<code-caption>src/views/Product.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>{{ detail.name }}</h1>
    <nav class="nav">
      <router-link :to="{ name: 'product-home' }">상품 상세</router-link>
      <router-link :to="{ name: 'product-review' }">리뷰</router-link>
    </nav>
    <!-- 여기에 자식이 들어감 -->
    <router-view />
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    props: {
      id: Number
    },
    computed: mapGetters('product', ['detail']),
    watch: {
      id: {
        handler() {
          this.$store.dispatch('product/load', this.id)
        },
        immediate: true
      }
    },
    beforeDestroy() {
      // 부모를 이동할 때 상품 상세 데이터 제거하기
      this.$store.dispatch('product/destroy')
    }
  }
</script>
```

### 자식 라우트 전용 컴포넌트 정의하기

<code-caption>src/views/Product/Home.vue</code-caption>
```vue
<template>
  <div class="product">
    <h1>상품 정보</h1>
  </div>
</template>
```

<code-caption>src/views/Product/Review.vue</code-caption>
```vue
<template>
  <div class="review-list">
    <h1>리뷰 목록</h1>
    <!-- 구현 방법은 상품 목록와 거의 같습니다. -->
  </div>
</template>
```

<code-caption>src/views/Product/ReviewDetail.vue</code-caption>
```vue
<template>
  <div class="review-detail">
    <h1>리뷰 정보</h1>
    <!-- 구현 방법은 상품 정보와 거의 같습니다. -->
  </div>
</template>
```

## S54 페이지 이동 효과 적용하기

### 간단한 트랜지션

<page-info page="311"/>

<code-caption>라우터 뷰를 트랜지션 태그로 감싸기</code-caption>
```vue
<transition name="view">
  <router-view />
</transition>
```

```css
.view-enter-active, .view-leave-active {
  transition: opacity 0.5s;
}
.view-leave-active {
  position: absolute;
}
.view-enter, .view-leave-to {
  opacity: 0;
}
```

### 비동기 처리를 포함한 트랜지션

<page-info page="312"/>

#### 라우터 뷰 전용 Vuex 모듈

::: tip

※ 이번 절의 샘플 코드는 Vuex 모듈을 사용하므로, Vuex와 Vuex 모듈의 사용 방법을 이해하고 있어야 합니다. 미리 "8장 Vuex로 애플리케이션의 상태 관리하기"를 읽는 것을 추천합니다. 

:::

<code-caption>src/store/view.js</code-caption>
```js
export default {
  namespaced: true,
  state: {
    loading: false
  },
  mutations: {
    start(state) {
      state.loading = true
    },
    end(state) {
      state.loading = false
    }
  }
}
```

로딩 오버레이를 출력하고 싶은 시점에서 `view/start`를, 비동기로 하고 싶은 시점에서 `view/end`를 커밋합니다(뮤테이션 타입의 이름이 약간 미묘하기는 합니다).

#### 전역 내비게이션 가드

::: tip

※ 이번 절의 샘플 코드는 Vuex 모듈을 사용하므로, Vuex와 Vuex 모듈의 사용 방법을 이해하고 있어야 합니다. 미리 "8장 Vuex로 애플리케이션의 상태 관리하기"를 읽는 것을 추천합니다. 

:::

<code-caption>src/router.js</code-caption>
```js
// 라우터 네비게이션 전에 훅
router.beforeEach((to, from, next) => {
  store.commit('view/start')
  next()
})
// 라우터 네비게이션 후에 훅
router.afterEach(() => {
  store.commit('view/end')
})
```

#### 오버레이 전용 컴포넌트 만들기

<code-caption>src/components/LoadingOverlay.vue</code-caption>
```vue
<template>
  <transition name="loading">
    <div class="loading" v-if="loading">Loading</div>
  </transition>
</template>

<script>
  export default {
    computed: {
      loading() {
        return this.$store.state.view.loading
      }
    }
  }
</script>

<style>
.loading {
  /* position:fixed; 등으로 스타일 정의 */
}
.loading-enter-active {
  transition: all 0.25s;
}
.loading-leave-active {
  transition: all 0.5s ease 0.5s; /* 라우터 뷰가 종료된 후 */
}
</style>
```

#### 오버레이 전용 컴포넌트 사용하기

```vue
<transition name="view">
  <router-view />
</transition>
<!-- 오버레이 전용 컴포넌트 -->
<LoadingOverlay />
```

#### 컴포넌트의 내비게이션 가드

내비게이션이 결정될 때까지 시간이 걸리는 컴포넌트의 예

```js
export default {
  // ...
  beforeRouteEnter(to, from, next) {
    setTimeout(next, 1000)
    // 이동을 가드하는 경우는 view/end 커밋도함
  }
}
```

## S55 자주 사용하는 기능과 옵션

<page-info page="315~319"/>

### 이동 전에 컴포넌트 읽어 들이기

<page-info page="315"/>

```vue
<script>
import products from '@/api/products.js'
export default {
  data() {
    return {
      item: {}
    }
  },
  // enter는 this를 사용할 수 없으므로 구현이 달라짐
  beforeRouteEnter(to, from, next) {
    products.asyncFind(Number(to.params.id), item => {
      next(vm => {
        vm.item = item
      })
    })
  },
  beforeRouteUpdate(to, from, next) {
    products.asyncFind(Number(to.params.id), item => {
      this.item = item
      next()
    })
  }
}
</script>
```

### 비동기로 컴포넌트 읽어 들이기

<code-caption>src/router.js</code-caption>
```js
// 비동기 컴포넌트
const About = () => import('@/views/About')
const router = new VueRouter({
  routes: [{
    path: '/about',
    component: About
    // 다음과 같이 작성할 수도 있음
    // component: () => import('@/views/About')
  }]
})
```

<code-caption>src/App.vue</code-caption>

```vue
<script>
export default {
  components: {
    MyComponent: () => import('@/components/MyComponent')
  }
}
</script>
```

### 라우트 접근 제한

<page-info page="317"/>

보다 자세한 구현 예는 튜토리얼 페이지의 인증 관련 예제를 참고해주세요.

```js
const router = new VueRouter({
  routes: [
    // 접근 제한 하고 싶은 라우트
    {
    path: '/user',
    component: User,
    meta: {
      requiresAuth: true
    }
  }]
})

router.beforeEach((to, from, next) => {
  // 상위 라우트를 포함해서 인증이 필요한 라우트가 있는지 확인
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 인증 상태 확인
    if (!auth.loggedIn()) {
      // 인증되어 있지 않으면 로그인 페이지로 리다이렉트
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next() // 인증이 필요하지 않은 라우트라면 next()로 이동
  }
})
```

### 스크롤 동작 조작하기

<page-info page="318"/>

```js
const router = new VueRouter({
  routes: [
    // ...
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
```
