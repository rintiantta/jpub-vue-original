---
sidebarDepth: 2
title: CHAPTER 7
---

# CH7 큰 규모의 애플리케이션 개발하기

## COLUMN 추상화는 왜 필요할까?

해당 컬럼의 추가적인 내용입니다.

1. 코드를 따로 빼기: <br>어느 정도 코드를 뭉칠 수 있다고 판단되는 경우, 따로 빼서 관리하는 것이 유지보수하기 쉽습니다(사용자 정보, 상품 정보 등).
2. 코드는 공통화하기: <br>같은 처리를 하는 경우, 함수 등으로 만들면 유지보수하기 쉽습니다(산출 처리 등).
3. 의존성이 적은 코드 작성하기：<br>예를 들어서 "강아지가 사료를 먹는 처리"라는 형태로 코드를 작성하면, 다른 동물이 등장했을 때 또는 다른 먹이가 등장했을 때 별도의 처리를 또 만들어줘야 합니다. 따라서 범용성이 높은 형태로 코드를 작성하는 것이 좋습니다.

## S35 단일 파일 컴포넌트

<page-info page="215~219"/>

<code-caption>Example 컴포넌트</code-caption>
```vue
<template>
  <div class="example">
    <span class="title">{{ text }}</span>
  </div>
</template>

<script>
  export default {
    name: 'Example',
    data() {
      return {
        text: 'example'
      }
    }
  }
</script>

<!-- scoped CSS -->
<style scoped>
  .title {
    color: #ffbb00;
  }
</style>
```

## S37 Node.js

- [Node.js 공식 사이트](https://nodejs.org/)
- [npm Documentation](https://docs.npmjs.com/)
- [Babel 공식 사이트](https://babeljs.io/)

## S38 Vue CLI

<page-info page="224~230"/>

### Vue CLI 설치하기

<code-caption>Vue CLI 전역 설치</code-caption>
```bash
npm install -g vue-cli
```

### 새 프로젝트 만들기

<code-caption>프로젝트 만들기</code-caption>
```bash
vue init webpack my-app
```

모듈들이 자동으로 설치되지 않는 경우, 다음 명령어로 `my-app` 디렉터리로 이동하고, 모듈을 따로 설치해주세요.

```bash
cd my-app
npm install
```

### 폴더와 파일 구성

<page-info page="227"/>

다음과 같이 루트 생성자의 템플릿을 렌더링 함수로 변경하고, 이외의 모든 것을 ".vue" 파일을 사용하는 형태로 만들면, 런타임 한정 빌드에서 사용할 수 있습니다.

템플릿 옵션을 사용하면, 컴파일이 필요하므로, 런타임 전용 빌드로는 코드를 실행할 수 없게 됩니다.

<code-caption>main.js 변경 전</code-caption>
```js
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

<code-caption>main.js 변경 후</code-caption>
```js
new Vue({
  el: '#app',
  render: h => h(App)
})
```

::: tip 런타임이란?

런타임 전용 빌드의 "런타임"이란 애플리케이션을 <mark>동작시키기 위해서</mark> 필요한 코드를 의미합니다.
컴파일을 포함하지 않으므로, 조금 크기가 작아집니다.

완전 빌드는 템플릿을 렌더링 함수로 변환하는 "컴파일러"도 포함한 코드입니다.
참고적으로 webpack 등을 사용해서 미리 컴파일을 해두면, 이러한 컴파일러를 포함하지 않아도 괜찮습니다.

:::

## [추가] Vue CLI 버전3

여기부터는 Vue CLI3 설명입니다.

### Vue CLI3 설치하기

`npm install -g vue-cli`가 아니라, 다음 명령어를 사용해서 버전3의 Vue CLI를 설치할 수 있습니다.

<code-caption>Vue CLI3 전역 설치</code-caption>
```bash
npm install -g @vue/cli
# or yarn를 사용하는 경우
yarn global add @vue/cli
```

### 프로젝트 생성 방법

프로젝트 생성은 `vue init webpack my-app`이 아니라, 다음 명령어로 합니다.

<code-caption>프로젝트 생성하기</code-caption>
```bash
# 프로젝트 생성
vue create my-app
```

Vue CLI3에서는 질문의 내용이 좀 많이 다릅니다.
추가적으로 템플릿을 지정하는 것이 아니라, 질문에 답해서 필요한 패키지를 선택하는 형태로 사용합니다.
공부를 하는 과정에서는 처음에 나오는 "simple"를 선택하거나 "Manually select features" 이후 "Babel", "CSS Pre-processors"만 선택해서 사용하는 것을 추천합니다.
방향키를 사용해서 항목을 이동하고, 스페이스 키를 이용해서 체크할 수 있습니다.

Vues와 Vue Router는 이 시점에 설치하지 않아도 괜찮습니다.
질문 답변이 끝나면, 곧바로 모듈 설치가 진행됩니다.

Vue CLI3는은빌드 도구 전용 파일이 모두 은닉되므로, 폴더 구조가 굉장히 깔끔합니다.
빌드 설정을 변경할 때는 프로젝트 루트에 있는 `vue.config.js`라는 파일을 편집합니다.

### 디렉터리 구조

"src" 디렉터리의 내용은 버전2와 같습니다. "public" 폴더에는 처음 실행되는 인덱스 HTML 템플릿인 "index.html" 파일이 들어 있으며, 정적 파일들이 들어갑니다(즉 버전2의 "static" 폴더와 같습니다).

<code-caption>디폴트</code-caption>
```
.git/ 3에서는 기본적으로 생성됩니다 ✨
public/ 정적 파일
src/
 ├ assets/
 ├ components/
 ├ App.vue
 └ main.js
```

<code-caption>Vuex와 VueRouter를 사용할 경우 다음과 같은 형태로 구성하게 됩니다</code-caption>
```
.git/ 
public/
src/
 ├ assets/
 ├ components/
 ├ store/ Vuex 모듈
 ├ views/ 페이지 전용 컴포넌트
 ├ App.vue
 ├ main.js
 ├ router.js
 └ store.js
```

개발 서버 실행 명령어도 다음과 같이 바뀌었습니다.

```bash
npm run serve
# or
yarn serve
```

## S39 Vue.js플러그인

<page-info page="231"/>

### 사용자 정의 플러그인 만들기

<page-info page="232"/>

<code-caption>스크롤 위치를 공유하는 플러그인</code-caption>
```js
var windowPlugin = {
  install: function(Vue) {
    // 플러그인 데이터 전용으로 Vue 인스턴스 사용하기
    var store = new Vue({
      data: {
        scrollY: 0
      }
    })
    // 윈도우 스크롤 이벤트 핸들하기
    var timer = null
    window.addEventListener('scroll', function() {
      if (timer === null) {
        timer = setTimeout(function() {
          // 200ms 간격으로 scrollY 속성에 할당하기
          store.scrollY = window.scrollY
          clearTimeout(timer)
          timer = null
        }, 200)
      }
    })
    // 인스턴스 속성에 등록하기
    Vue.prototype.$window = store.$data
  }
}
```

<code-caption>플러그인 등록하기</code-caption>
```js
Vue.use(windowPlugin)
```

<code-caption>모든 Vue 인스턴스에서 사용 가능</code-caption>
```js
Vue.component('my-component', {
  template: '<div>{{ scrollY }}</div>',
  computed: {
    scrollY: function() {
      return this.$window.scrollY
    }
  }
})
```

## S40 ES2015로 작성해보기

<page-info page="235~243"/>

### 변수 생성 방법

<code-caption>재할당</code-caption>
```js
let x = 0
console.log(x++) // -> 1
const x = 0
console.log(x++) // -> Identifier 'x' has already been declared
```

<code-caption>스코프</code-caption>
```js
{
  let x = 1
}
console.log(x) // -> x is not defined
```

<code-caption>배열 비우기</code-caption>
```js
const array = [1, 2]
array.push(3)
console.log(array) // -> (3) [1, 2, 3]
array.length = 0
console.log(array) // -> []
```

- [MDN web docs - const](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/const)

### 함수와 메소드 생성 방법

#### function 생략

<code-caption>Vue의 this를 사용하고 싶은 경우 다음과 같이~!</code-caption>
```js
new Vue({
  methods: {
    handleClick() { ... }
  }
})
```

- [MDN web docs - 메소드 정의](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Method_definitions)

#### 화살표 함수

<code-caption>STEP1</code-caption>
```js
const newArray = array.map(el => {
  return el * 2
})
```

<code-caption>STEP2 return 키워드 생략</code-caption>
```js
const newArray = array.map(el => el * 2)
```

<code-caption>STEP3 매개 변수가 여러 개인 경우</code-caption>
```js
const newArray = array.map((el, index) => el * 2)
```

<code-caption>STEP4 객체 리턴</code-caption>
```js
const newArray = array.map(el => ({ value: el * 2 }))
```

- [MDN web docs - 화살표 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### 템플릿 리터럴

```js
const name = '구름'
const template = `
  <div class="template">
    <strong>${ name }</strong>
  </div>`
console.log(template)
```

- [MDN web docs - 템플릿 문자열]( https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)

### 객체 속성 생략 지정

```js
const a = 'foo'
const b = 'bar'
const newObject = { a, b }
```

- [MDN web docs - 객체 초기자]( https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Object_initializer)

### 비구조화 할당

```js
// 배열 요소 1, 2를 각각 변수 a, b에 할당
const [a, b] = [1, 2]
console.log(a) // -> 1
// name 속성만 추출하기
const { name } = { id: 1, name: '사과' }
console.log(name) // -> 사과
```

```js
function myFunction({ id, name }) {
  console.log(name) // -> 사과
}
myFunction({ id: 1, name: '사과' })
```

- [MDN web docs - 비구조화 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### 전개 연산자

```js
const array = [1, 2, 3]
// 각각 매개변수로 전달됨
myFunction(...array)
// array를 전개하고, 뒤에 새로운 요소 4 추가하기
const newArray = [...array, 4] // -> (4) [1, 2, 3, 4]
```

- [MDN web docs - 전개 연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_operator)

### 배열 메소드

#### find

```js
const array = [
  { id: 1, name: '사과' },
  { id: 2, name: '바나나' }
]
const result = array.find(el => el.id === 2)
console.log(result) // -> { id: 2, name: '바나나' }
```

- [MDN web docs - Array.prototype.find()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/ﬁnd)

#### findIndex

```js
const array = [
  { id: 1, name: '사과' },
  { id: 2, name: '바나나' }
]
const result = array.findIndex(el => el.id === 2)
console.log(result) // -> 1
```

- [MDN web docs - Array.prototype.findIndex()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/ﬁndIndex)

### Promise

<code-caption>성공 확인</code-caption>
```js
function myFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 성공한 경우 통지
      resolve('성공!')
    }, 1000)
  })
}
// 1초 후에 myFunction이 종료되면 , then 처리가 실행됨
myFunction().then(value => {
  console.log(value) // -> 성공!
})
```

<code-caption>실패 통지</code-caption>
```js
function myFunction(num) {
  return new Promise((resolve, reject) => {
    if (num < 10) {
      resolve('success!')
    } else {
      reject('error!')
    }
  })
}
myFunction(100).catch(value => {
  console.log(value) // -> 에러!
})
```

<code-caption>성공과 실패가 상관 없는 경우</code-caption>
```js
myFunction().then().catch().finally(() => {
  // 성공/실패와 상관 없이 호출
})
```

- [MDN web docs - Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)
