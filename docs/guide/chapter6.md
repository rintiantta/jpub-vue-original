---
sidebarDepth: 2
title: CHAPTER 6
---

# CH6 트랜지션과 애니메이션

## S28 트랜지션이란?

<page-info page="184~188"/>

### 기본적인 트랜지션 사용 방법

<page-info page="195"/>

"스타일을 정의해서 움직여 보기"도 함께 정리했습니다.

```html
<div id="app">
  <p><button v-on:click="show=!show">변경하기</button></p>
  <transition>
    <div v-show="show">
      트랜지션 시킬 요소
    </div>
  </transition>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    show: true
  }
})
```

```css
/* 1초 동안 투명도를 변화 */
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
/* 더 이상 보이게 되지 않았을 때의 투명도 */
.v-enter, .v-leave-to {
  opacity: 0;
}
```

<demo-block demo="guide-ch6-demo01"/>

## S29 단일 요소 트랜지션

### Enter와 Leave에서 서로 다른 스타일 정의하기

<page-info page="192"/>

```css
.v-enter-active,
.v-leave-active {
  transition: opacity 1s, transform 1s;
}
/* 출력할 때는 왼쪽에서 오른쪽으로 */
.v-enter {
  opacity: 0;
  transform: translateX(-10px);
}
/* 사라질 때는 아래로 */
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
```

<demo-block demo="guide-ch6-demo02"/>


### 여러 개의 요소 그룹화하기

<page-info page="193"/>

```html
<div id="app">
  <p><button v-on:click="show=!show">변경하기</button></p>
  <transition>
    <div v-if="show" key="a">TRUE</div>
    <div v-else key="b">FALSE</div>
  </transition>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    show: true
  }
})
```

<code-caption>잘못된 스타일 정의</code-caption>
```css
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
```

<code-caption>정상적인 스타일 정의</code-caption>
```css
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
```

<demo-block demo="guide-ch6-demo03"/>

### Enter와 Leave 시점을 변경하기

<page-info page="194"/>

※ `position: absolute`는 지정하지 않았습니다.

<demo-block demo="guide-ch6-demo04"/>

### 키의 변화로 트랜지션 발동하기

<page-info page="204"/>

```html
<div id="app">
  <p><button v-on:click="count++">변경하기</button></p>
  <transition>
    <div v-bind:key="count">{{ count }}</div>
  </transition>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    count: 0
  }
})
```

```css
.v-enter-active {
  transition: opacity 1s;
}
/* 살짝 시간을 끌어서 문자 투명도 조정하기 */
.v-leave-active {
  transition: opacity 0.8s ease 0.2s;
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
```

<demo-block demo="guide-ch6-demo05"/>

## S30 리스트 트랜지션

<page-info page="196~200"/>

### 이동 트랜지션

<page-info page="197"/>

현재 샘플 코드에서는 [Lodash](/guide/chapter1.html#s04-%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)를 사용하고 있습니다. 실제 운용할 때는 "lodash.min.js"을 사용해주세요.

```html
<div id="app">
  <p><button v-on:click="order=!order">변경하기</button></p>
  <!-- transition-group으로 사용할 태그는 속성으로 지정함 -->
  <transition-group tag="ul" class="list">
    <li v-for="item in sortedList" v-bind:key="item.id">
      {{ item.name }} {{ item.price }}원
    </li>
  </transition-group>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    order: false,
    list: [
      { id: 1, name: '사과', price: 1000 },
      { id: 2, name: '바나나', price: 2000 },
      { id: 3, name: '딸기', price: 3000 }
    ]
  },
  computed: {
    // order 값에 따라 리스트의 순서를 반전하는 산출 속성
    sortedList: function () {
      // Lodash의 orderBy 메소드 사용하기
      return _.orderBy(this.list, 'price', this.order ? 'desc' : 'asc')
    }
  }
})
```

```css
/* 1초 동안 요소 이동하기 */
.v-move {
  transition: transform 1s;
}
```

<demo-block demo="guide-ch6-demo06"/>

### 이동 트랜지션 : X&Y 좌표

<page-info page="198"/>

요소 추가&제거와 관련된 내용도 추가했습니다.

현재 샘플 코드에서는 [Lodash](/guide/chapter1.html#s04-%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)를 사용하고 있습니다. 실제 운용할 때는 "lodash.min.js"을 사용해주세요.

```html
<div id="app">
  <p>
    <button v-on:click="doShuffle">셔플</button>
    <button v-on:click="doAdd">추가</button>
  </p>
  <transition-group tag="ul" class="list">
    <li v-for="(item, index) in list"
      v-bind:key="item"
      class="item"
      v-on:click="doRemove(index)">{{ item }}</li>
  </transition-group>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  methods: {
    doShuffle: function () {
      this.list = _.shuffle(this.list)
    },
    doAdd: function() {
      var newNumber = Math.max.apply(null, this.list) + 1
      var index = Math.floor(Math.random() * (this.list.length + 1))
      this.list.splice(index, 0, newNumber)
    },
    doRemove: function (index) {
      this.list.splice(index, 1)
    }
  }
})
```

```css
/* 박스 스타일 정의 */
.list {
  width: 240px;
  padding: 0;
}
.item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  width: 40px;
  height: 40px;
  background: #f5f5f5;
}
/* 트랜지션 전용 스타일 */
.v-enter-active, .v-leave-active, .v-move {
  transition: all 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
  background: #f9a3b1;
  transform: translateY(-30px);
}
```

<demo-block demo="guide-ch6-demo07"/>

::: tip

부모 요소가 Flexbox 이거나, 요소의 위치에 따라서 Leave 때의 좌표가 이상하거나, 원하지 않는 방향으로 날아가는 경우가 있습니다.

다음 데모는 훅을 사용해 위치를 보완하는 예입니다. 왼쪽 끝의 요소가 사라질 때의 움직임이 다르므로 확인해보세요.

<demo-block demo="guide-ch6-demo10"/>

뒤에서 나오는 "[트랜지션 훅](#Leave-때의-위치-보정)" 부분에 코드가 있으므로, 코드는 그쪽을 참고해주세요.

:::

## S31 SVG 트랜지션

<page-info page="201~202"/>

### SVG를 트랜지션으로 변경하기

<page-info page="201"/>

```html
<div id="app">
  <button v-on:click="toggle=!toggle">변경하기</button>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <!-- SVG 요소에 트랜지션 사용하기 -->
    <transition>
      <my-circle v-bind:fill="fill" v-bind:key="fill"></my-circle>
    </transition>
  </svg>
</div>
```

```js
// SVG 요소 컴포넌트 정의하기
Vue.component('my-circle', {
  template: '<circle cx="80" cy="75" r="50" v-bind:fill="fill"/>',
  props: {
    fill: String
  }
})
new Vue({
  el: '#app',
  data: {
    toggle: false
  },
  computed: {
    fill: function () {
      return this.toggle ? 'lightpink' : 'skyblue'
    }
  }
})
```

```css
.v-enter-active, .v-leave-active {
  transition: all 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
```

<demo-block demo="guide-ch6-demo08"/>

※ 오래된 웹 브라우저에서는 동작하지 않을 수 있습니다.

## S32 트랜지션 훅

<page-info page="203~205"/>

### 사용할 수 있는 트랜지션 훅

<page-info page="203"/>

모든 시점에서 훅을 한 예제입니다.

```html
<div id="app">
  <p><button v-on:click="show=!show">변경하기</button></p>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-on:enter-cancelled="enterCancelled"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave"
    v-on:leave-cancelled="leaveCancelled">
    <div v-if="show">example</div>
  </transition>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    show: true
  },
  methods: {
    // Enter
    beforeEnter: function (el) {
      console.log('before-enter')
    },
    enter: function (el, done) {
      console.log('enter')
      setTimeout(done, 1000)
    },
    afterEnter: function (el) {
      console.log('after-enter')
    },
    enterCancelled: function (el) {
      console.log('enter-cancelled')
    },
    // Leave
    beforeLeave: function (el) {
      console.log('before-leave')
    },
    leave: function (el, done) {
      console.log('leave')
      setTimeout(done, 1000)
    },
    afterLeave: function (el) {
      console.log('after-leave')
    },
    // v-show와 함께 사용하는 경우에만 leaveCancelled를 사용할 수 있습니다.
    leaveCancelled: function (el) {
      console.log('leave-cancelled')
    }
  }
})
```

```css
.v-enter-active, .v-leave-active {
  transition: all 1s;
}
.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
```

<demo-block demo="guide-ch6-demo09"/>

### Leave 때의 위치 보정

[이동 트랜지션 : X&Y 좌표](#이동 트랜지션-:-X&Y-좌표) 코드에 다음과 같이 `before-leave` 훅을 추가해서 위치를 보정하면, 원하지 않는 방향으로 날아가는 것을 회피할 수 있습니다.

```html
<transition-group tag="ul" class="list" v-on:before-leave="beforeLeave">
  ...
</transition-group>
```

```js
methods: {
  beforeLeave: function (el) {
    var style = window.getComputedStyle(el)
    el.style.left = el.offsetLeft - parseFloat(style.marginLeft, 10) + 'px'
    el.style.top = el.offsetTop - parseFloat(style.marginTop, 10) + 'px'
  }
}
```

<demo-block demo="guide-ch6-demo10"/>
