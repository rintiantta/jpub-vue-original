---
sidebarDepth: 2
title: CHAPTER 4
---

# CH4 데이터 감시하고 가공하기

## S16 산출 속성으로 처리를 포함한 데이터 만들기

<page-info page="106~"/>

### 산출 속성 사용 방법

<page-info page="106"/>

```html
<p>{{ width }}의 절반은 {{ halfWidth }}입니다.</p>
```

```js
new Vue({
  el: '#app',
  data: {
    width: 800
  },
  computed: {
    // 산출 속성 halfWidth 정의하기
    halfWidth: function() {
      return this.width / 2
    }
  }
})
```

<demo-block demo="guide-ch4-demo01"/>

### 산출 속성을 조합해서 사용하기

<page-info page="107"/>

```html
<p>X: {{ halfPoint.x }}</p>
<p>Y: {{ halfPoint.y }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    width: 800,
    height: 600
  },
  computed: {
    halfWidth: function() {
      return this.width / 2
    },
    halfHeight: function() {
      return this.height / 2
    },
    // 'width×height' 의 중심 좌표 객체 리턴하기
    halfPoint: function() {
      return {
        x: this.halfWidth,
        y: this.halfHeight
      }
    }
  }
})
```

### 겟터와 셋터

<page-info page="108"/>

```html
<input v-model.number="width"> {{ width }}
<input v-model.number="halfWidth"> {{ halfWidth }}
```

```js
new Vue({
  el: '#app',
  data: {
    width: 800
  },
  computed: {
    halfWidth: {
      get: function() {
        return this.width / 2
      },
      // halfWidth 를 2 배수한 숫자를 width 에 할당하기
      set: function(val) {
        this.width = val * 2
      }
    }
  }
})
```

<demo-block demo="guide-ch4-demo03"/>

### 산출 속성 캐시 기능

<page-info page="109"/>

```html
<p>산출 속성</p>
<ol>
  <li>{{ computedData }}</li>
  <li>{{ computedData }}</li>
</ol>
<p>메소드</p>
<ol>
  <li>{{ methodsData() }}</li>
  <li>{{ methodsData() }}</li>
</ol>
```

```js
new Vue({
  el: '#app',
  computed: {
    computedData: function() { return Math.random() }
  },
  methods: {
    methodsData: function() { return Math.random() }
  }
})
```

<demo-block demo="guide-ch4-demo04"/>

### 리스트 필터링

<page-info page="124"/>

```html
<div id="app">
  <input v-model.number="budget">원 이하 필터링하기 
  <input v-model.number="limit"> 개의 결과 출력하기
  <p>{{ matched.length }}개 중에 {{ limited.length }}개를 출력하고 있습니다.</p>
  <ul>
    <!-- v-for에 최종 결과라고 할 수 있는 산출 속성 limited 사용하기 -->
    <li v-for="item in limited" v-bind:key="item.id">
      {{ item.name }} {{ item.price }}원
    </li>
  </ul>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    // 입력 양식에 출력할 데이터
    budget: 3000,
    // 출력할 개수
    limit: 2,
    // 데이터 리스트
    list: [
      { id: 1, name: '사과', price: 1000 },
      { id: 2, name: '바나나', price: 2000 },
      { id: 3, name: '딸기', price: 4000 },
      { id: 4, name: '오렌지', price: 3000 },
      { id: 5, name: '메론', price: 5000 }
    ]
  },
  computed: {
    // budget 아래의 리스트를 리턴하는 산출 속성
    matched: function () {
      return this.list.filter(function (el) {
        return el.price <= this.budget
      }, this)
    },
    // matched 로 리턴한 데이터를 limit 조건을 걸어 리턴하는 산출 속성
    limited: function () {
      return this.matched.slice(0, this.limit)
    }
  }
})
```

<demo-block demo="guide-ch4-demo05"/>

### 정렬 기능 추가하기

<page-info page="113"/>

현재 샘플 코드에서는 [Lodash](/guide/chapter1.html#s04-%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)를 사용하고 있습니다. 실제 운용할 때는 "lodash.min.js"을 사용해주세요.

```html
<div id="app">
  <input v-model.number="budget">원 이하 필터링하기 
  <input v-model.number="limit"> 개의 결과 출력하기
  <button v-on:click="order=!order">변경하기</button>
  <p>{{ matched.length }}개 중에 {{ limited.length }}개를 출력하고 있습니다.</p>
  <ul>
    <!-- v-for에 최종 결과라고 할 수 있는 산출 속성 limited 사용하기 -->
    <li v-for="item in limited" v-bind:key="item.id">
      {{ item.name }} {{ item.price }}원
    </li>
  </ul>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    order: false,
    // 입력 양식에 출력할 데이터
    budget: 3000,
    // 출력할 개수
    limit: 2,
    // 데이터 리스트
    list: [
      { id: 1, name: '사과', price: 1000 },
      { id: 2, name: '바나나', price: 2000 },
      { id: 3, name: '딸기', price: 4000 },
      { id: 4, name: '오렌지', price: 3000 },
      { id: 5, name: '메론', price: 5000 }
    ]
  },
  computed: {
    // budget 아래의 리스트를 리턴하는 산출 속성
    matched: function() {
      return this.list.filter(function(el) {
        return el.price <= this.budget
      }, this)
    },
    // sorted를 새로 추가하기
    sorted: function() {
      return _.orderBy(this.matched, 'price', this.order ? 'desc' : 'asc')
    },
    // limited에서 사용하는 리스트를 sorted 로 변경하기
    limited: function() {
      return this.sorted.slice(0, this.limit)
    }
  }
})
```

<demo-block demo="guide-ch4-demo06"/>

## S17 워처로 데이터 감시해서 처리 자동화하기

<page-info page="115~121"/>

### 워처 사용 방법

<page-info page="115"/>

옵션을 사용하지 않는 경우

```js
new Vue({
  // ...
  watch: {
    감시할데이터: function (새로운값, 이전값) {
      // value가 변화했을 때 하고 싶은 처리
    },
    'item.value': function (newVal, oldVal) {
      // 객체의 속성도 감시할 수 있음
    }
  }
})
```

옵션을 사용하는 경우

```js
new Vue({
  // ...
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        // list 가 변경될 때 하고 싶은 처리
      },
      deep: true,
      immediate: true
    }
  }
})
```

인스턴스 메소드로 등록하는 경우

```js
this.$watch('value', function(newVal, oldVal) {
  // ...
})
```

인스턴스 메소드 등록과 옵션 등록을 함께 사용하는 경우

```js
this.$watch('value', function (newVal, oldVal) {
  // ...
}, {
  immediate: true,
  deep: true
})
```

### 한 번만 동작하는 워처

<page-info page="118"/>

```js
new Vue({
  el: '#app',
  data: {
    edited: false,
    list: [
      { id: 1, name: '사과', price: 1000 },
      { id: 2, name: '바나나', price: 2000 },
    ]
  },
  created: function() {
    var unwatch = this.$watch('list', function () {
      // list가 편집되었는지 기록하기
      this.edited = true
      // 감시 제거하기
      unwatch()
    }, {
      deep: true
    })
  }
})
```

### 실행 빈도 제어하기

<page-info page="118"/>

현재 샘플 코드에서는 [Lodash](/guide/chapter1.html#s04-%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)를 사용하고 있습니다. 실제 운용할 때는 "lodash.min.js"을 사용해주세요.

```html
<input type="text" v-model="value">
```

```js
new Vue({
  el: '#app',
  data: {
    value: '편집해보세요'
  },
  watch: {
    value: _.debounce(function (newVal) {
        // 여기에 비용이 높은 처리 작성하기
        console.log(newVal)
      },
      // value의 변화가 끝나고 500밀리 초 동안 대기하기
      500)
  }
})
```

### 입력 양식을 감시하고 API로 데이터 가져오기

<page-info page="120"/>

현재 샘플 코드에서는 [Lodash](/guide/chapter1.html#s04-%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)를 사용하고 있습니다. 실제 운용할 때는 "lodash.min.js"을 사용해주세요.

```html
<div id="app">
  <select v-model="current">
    <option v-for="topic in topics" v-bind:value="topic.value">
      {{ topic.name }}
    </option>
  </select>
  <div v-for="item in list">{{ item.full_name }}</div>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    list: [],
    current: '',
    topics: [
      { value: 'vue', name: 'Vue.js' },
      { value: 'jQuery', name: 'jQuery' }
    ]
  },
  watch: {
    current: function (val) {
      // 깃헙 API에서 토픽 리포지토리 검색하기
      axios.get('https://api.github.com/search/repositories', {
        params: {
          q: 'topic:' + val
        }
      }).then(function (response) {
        this.list = response.data.items
      }.bind(this))
    }
  },
})
```

## S18 필터로 텍스트 변환 처리하기

<page-info page="122~125"/>

### 필터 사용 방법

<page-info page="122"/>

```js
new Vue({
  el: '#app',
  data: {
    price: 19800
  },
  filters: {
    localeNum: function (val) {
      return val.toLocaleString()
    }
  }
})
```

### 여러 개의 필터를 연결해서 사용하기

<page-info page="124"/>

```js
new Vue({
  el: '#app',
  filters: {
    // 소수점 이하 두 번째 자리까지 끊는 필터
    round: function (val) {
      return Math.round(val * 100) / 100
    },
    // 도 단위를 라디안 단위로 변환하는 필터
    radian: function (val) {
      return val * Math.PI / 180
    }
  }
})
```

```html
180도는 {{ 180 | radian | round }} 라디안입니다 .
```

## S19 사용자 정의 디렉티브로 데이터를 감시하면서 DOM 조작하기

<page-info page="126~131"/>

### 사용자 정의 디렉티브 사용 방법

<page-info page="126"/>

```js
new Vue({
  el: '#app',
  directives: {
    focus: {
      // 연결되어 있는 요소가 DOM 에 추가될 때
      inserted: function (el) {
        el.focus() // 요소에 초점을 맞춤
      }
    }
  }
})
```

```html
<input type="text" v-focus>
```

### 사용할 수 있는 훅

<page-info page="139"/>

```js
Vue.directive('example', {
  bind: function (el, binding) {
    console.log('v-example bind')
  },
  inserted: function (el, binding) {
    console.log('v-example inserted')
  },
  update: function (el, binding) {
    console.log('v-example update')
  },
  componentUpdated: function (el, binding) {
    console.log('v-example componentUpdated')
  },
  unbind: function (el, binding) {
    console.log('v-example unbind')
  }
})
```

## S20 nextTick으로 변경 후의 DOM에 접근하기

<page-info page="132~134"/>

### 변경 후의 DOM 높이 확인하기

<page-info page="133"/>

```html
<button v-on:click="list.push(list.length+1)">추가</button>
<ul ref="list">
  <li v-for="item in list">{{ item }}</li>
</ul>
```

```js
new Vue({
  el: '#app',
  data: {
    list: []
  },
  watch: {
    list: function () {
      // 이렇게 해서는 변경 후 ul 태그의 높이를 추출할 수 없음
      console.log('기본 출력:', this.$refs.list.offsetHeight)
      // nextTick 을 사용하면 할 수 있어요!
      this.$nextTick(function () {
        console.log('nextTick:', this.$refs.list.offsetHeight)
      })
    }
  }
})
```
