---
sidebarDepth: 2
title: CHAPTER 1
---

# CH1 Vue.js 프레임워크의 기초

## S04 설치하기

<page-info page="16"></page-info>

6장까지는 `<script>` 태그로 파일을 읽어 들이기만 하면 사용할 수 있는 **스탠드얼론(Standalone)** 버전의 ‘Vue.js’ 파일을 사용합니다

- [Lodash 문서](https://lodash.com/)
- [axios 문서 GitHub](https://github.com/axios/axios)

<code-caption>vue.js</code-caption>
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
```

<code-caption>lodash.min.js</code-caption>
```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.5/lodash.min.js"></script>
```

<code-caption>axios.min.js</code-caption>
```html
<script src="https://cdn.jsdelivr.net/npm/axios@0.17.1/dist/axios.min.js"></script>
```


### 공부 전용 파일

<page-info page="17"></page-info>

<code-caption>index.html</code-caption>
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>Vue.js App</title>
  <link href="main.css" rel="stylesheet">
</head>
<body>
  <div id="app">
    <!-- 여기 #app 내부에 템플릿을 출력할 것입니다. -->
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

<code-caption>main.js</code-caption>
```js
var app = new Vue({
  el: '#app'
})
```

<code-caption>main.css</code-caption>
```css
/* StyleSheet */
```

환경 설정이 따로 필요 없고, 가볍게 사용할 수 있는 [온라인 에디터 서비스](./#온라인-에디터-활용하기)도 참고해보기 바랍니다.

## S05 Vue.js의 기본 기능

<page-info page="20~24"></page-info>

### 텍스트 바인딩

<page-info page="20"></page-info>

```html
<p>{{ message }}</p>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})
```

<demo-block demo="guide-ch1-demo01"/>

### 반복 렌더링

<page-info page="21"></page-info>

```html
<ol>
  <li v-for="item in list">{{ item }}</li>
</ol>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    list: ['사과', '바나나', '딸기']
  }
})
```

<demo-block demo="guide-ch1-demo02"/>

### 이벤트 사용하기

<page-info page="22"></page-info>

```html
<button v-on:click="handleClick">Click</button>
```

```js
var app = new Vue({
  el: '#app',
  methods: {
    handleClick: function (event) {
      alert(event.target) // [object HTMLButtonElement]
    }
  }
})
```

<demo-block demo="guide-ch1-demo03"/>

### 입력 양식과 동기화하기

<page-info page="22"></page-info>

```html
<input v-model="message">
<p>{{ message }}</p>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: '초기 메시지'
  }
})
```

<demo-block demo="guide-ch1-demo04"/>

### 조건 분기

<page-info page="23"></page-info>

```html
<button v-on:click="show=!show">변경하기</button>
<p v-if="show">Hello Vue.js!</p>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    show: true
  }
})
```

<demo-block demo="guide-ch1-demo05"/>

### 트랜지션과 애니메이션

<page-info page="24"></page-info>

```html
<button v-on:click="show=!show">변경하기</button>
<transition>
  <p v-if="show">Hello Vue.js!</p>
</transition>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    show: true
  }
})
```

```css
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
/* opacity:0에서 1까지 페이드인&페이드아웃하기 */
.v-enter, .v-leave-to {
  opacity: 0;
}
```

<demo-block demo="guide-ch1-demo06"/>

<!-- ★ 예제
<exercise-block>
  <template slot="q">
    이것저것
  </template>
  <div slot="a">

  ```js
  new Vue()
  ```

  </div>
</exercise-block>
-->
