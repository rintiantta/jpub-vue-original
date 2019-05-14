---
sidebarDepth: 2
title: CHAPTER 5
---

# CH5 컴포넌트로 UI 부품 만들기

## S23 컴포넌트 끼리의 통신 : 부모에서 자식으로

<page-info page="155～160"/>

<code-caption>컴포넌트에서 프로퍼티를 전달하기 위한 props를 정의합니다.</code-caption>
```js
Vue.component('comp-child', {
  // 템플릿에서 val 사용하기
  template: '<p>{{ val }}</p>',
  // 받을 속성 이름 지정하기
  props: ['val']
})
```

<code-caption>프로퍼티로 문자열 전달하기</code-caption>
```html
<comp-child val="자식A"></comp-child>
<comp-child val="자식B"></comp-child>
```

<code-caption>프로퍼티로 데이터 전달하기</code-caption>
```html
<comp-child :val="valueA"></comp-child>
<comp-child :val="valueB"></comp-child>
```

```js
new Vue({
  data: {
    valueA: '자식A',
    valueB: '자식B'
  }
})
```

<demo-block demo="guide-ch5-demo01"/>

※ 프로퍼티로 받는 방법은 같음

### 컴포넌트를 리스트 렌더링하기

<page-info page="157"/>

#### 자식 컴포넌트

```js
Vue.component('comp-child', {
  template: '<li>{{ name }} HP.{{ hp }}</li>',
  props: ['name', 'hp']
})
```

```html
<ul>
  <comp-child v-for="item in list"
    v-bind:key="item.id"
    v-bind:name="item.name"
    v-bind:hp="item.hp"></comp-child>
</ul>
```

#### 부모 컴포넌트

```js
new Vue({
  el: '#app',
  data: {
    list: [
      { id: 1, name: '슬라임', hp: 100 },
      { id: 2, name: '고블린', hp: 200 },
      { id: 3, name: '드래곤', hp: 500 }
    ]
  }
})
```

<demo-block demo="guide-ch5-demo02"/>

#### 오류가 발생하는 패턴

```js
Vue.component('comp-child', {
  template: '<li>{{ name }} HP.{{ hp }}\
  <button v-on:click="doAttack">공격하기</button></li>',
  props: ['name', 'hp'],
  methods: {
    doAttack: function () {
      // 공격하기
      this.hp -= 10 // -> [Vue warn] error!
    }
  }
})
```

### props로 받을 자료형 지정하기

<page-info page="150"/>

책에는 짧게 나오지만, 이해를 도울 수 있게, 내용을 추가했습니다.

#### 자료형

특정 생성자의 인스턴스인지 확인할 수 있습니다.

|자료형|설명|예|
|---|---|---|
|String|문자열|`'1'`|
|Number|숫자|`1`|
|Boolean|불|`true`, `false`|
|Function|함수|`function() {}`|
|Object|객체|`{ name: 'foo' }`|
|Array|배열|`[1, 2, 3]`, `[{ id: 1 }, { id: 2 }]`|
|생성자 함수|인스턴스|`new Cat()`|
|null|모든 자료형|`1`, `'1'`, `[1]`|

<code-caption>자료형 확인을 생략하는 경우</code-caption>
```js
Vue.component('example', {
  props: ['value']
})
```

<code-caption>자료형만 하는 경우</code-caption>
```js
Vue.component('example', {
  props: {
    value: 자료형
  }
})
```

<code-caption>인스턴스 확인</code-caption>
```js
function Cat(name) {
  this.name = name
}
Vue.component('example', {
  props: {
    value: Cat // 고양이 데이터만 허가
  }
})
new Vue({
  data: {
    value: new Cat('구름') // value는 고양이 데이터
  }
})
```
```html
<example v-bind:value="value"></example>
```

#### 옵션

|옵션|자료형|설명|
|---|---|---|
|type|자료형, 배열|허가할 자료형, 배열로 여러 개를 지정할 수 있습니다.|
|default|데이터, 함수|디폴트 값|
|required|Boolean|필수인지|
|validator|함수|사용자 정의 유효성 검사 함수, 확인한 뒤 불을 리턴하면 됩니다.|


<code-caption>옵션도 사용하는 경우</code-caption>
```js
Vue.component('example', {
  props: {
    value: {
      type: [String, Number],
      default: 100,
      required: true,
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```

::: tip

아무 것이나 받는 형태로 만들어버리면, 오류가 발생할 가능성이 늘어납니다. 또한 이 기능을 따로 구현하기 위해 같은 코드를 여러 번 사용해야 할 것입니다.
가정하지 않은 자료형이 들어올 때 그냥 오류를 발생시켜 버리는 것이 대처하기 쉽습니다🐾.


:::

## S23 컴포넌트 끼리의 통신 : 자식에서 부모로

<page-info page="144~"/>

### 자식 이벤트를 부모에서 잡기

<page-info page="161"/>

#### 자식 컴포넌트

<code-caption>자식에서 자식의 이벤트 실행하기</code-caption>
```js
Vue.component('comp-child', {
  template: '<button v-on:click="handleClick">이벤트 실행</button>',
  methods: {
    // 버튼 클릭 이벤트 핸들러로 childs-event 실행하기
    handleClick: function () {
      this.$emit('childs-event')
    }
  }
})
```

#### 부모 컴포넌트

<code-caption>부모 템플릿</code-caption>
```html
<comp-child v-on:childs-event="parentsMethod"></comp-child>
```

<code-caption>부모에서 받기</code-caption>
```js
new Vue({
  el: '#app',
  methods: {
    // childs-event가 실행되었을 경우 실행됨
    parentsMethod: function () {
      alert('자식에서 전달 받은 이벤트입니다!')
    }
  }
})
```

<demo-block demo="guide-ch5-demo03"/>

### 부모가 가진 데이터 조작하기

<page-info page="163"/>

<code-caption>자식 컴포넌트</code-caption>
```js
Vue.component('comp-child', {
  template: '<li>{{ name }} HP.{{ hp }}\
  <button v-on:click="doAttack">공격하기</button></li>',
  props: {
    id: Number,
    name: String,
    hp: Number
  },
  methods: {
    // 버튼 클릭 이벤트 핸들러에서 $emit을 호출해서, attack 이벤트 실행하기
    doAttack: function () {
      // 매개 변수로 자신의 ID 전달하기
      this.$emit('attack', this.id)
    }
  }
})
``` 

<code-caption>부모 컴포넌트</code-caption>
```html
<ul>
  <comp-child v-for="item in list"
    v-bind:key="item.id"
    v-bind="item"
    v-on:attack="handleAttack"></comp-child>
</ul>
```

```js
new Vue({
  el: '#app',
  data: {
    list: [
      { id: 1, name: '슬라임', hp: 100 },
      { id: 2, name: '고블린', hp: 200 },
      { id: 3, name: '드래곤', hp: 500 }
    ]
  },
  methods: {
    // attack가 실행된 경우
    handleAttack: function (id) {
      // 매개 변수의 ID를 기반으로 요소 검색
      var item = this.list.find(function (el) {
        return el.id === id
      })
      // HP가 0보다 크면 10 줄이기
      if (item !== undefined && item.hp > 0) item.hp -= 10
    }
  }
})
```

## S23 컴포넌트 끼리의 통신 : 부모 자식 관계가 아닌 경우

<page-info page="165～166"/>

```js
var bus = new Vue({
  data: {
    count: 0
  }
})
Vue.component('component-b', {
  template: '<p>bus: {{ bus.count }}</p>',
  computed: {
    // bus 데이터를 산출 속성으로 사용하기
    bus: function () {
      return bus.$data
    }
  },
  created: function () {
    bus.$on('bus-event', function () {
      this.count++
    })
  }
})
```

## S23 컴포넌트 끼리의 통신 / 이외의 경우

<page-info page="166～168"/>

### 자식 컴포넌트를 참조하는 $refs

<page-info page="166"/>

<code-caption>부모 컴포넌트</code-caption>
```html
<comp-child ref="child">
```

```js
new Vue({
  el: '#app',
  methods: {
    handleClick: function () {
      // 자식 컴포넌트의 이벤트 실행하기
      this.$refs.child.$emit('open')
    }
  }
})
```

<code-caption>자식 컴포넌트</code-caption>
```js
Vue.component('comp-child', {
  template: '<div>...</div>',
  created: function () {
    // 자신의 처리
    this.$on('open', function () {
      console.log('무언가 처리하기')
    })
  }
})
```

## S24 슬롯을 사용한 사용자 정의 컴포넌트

<page-info page="160~166"/>

### 이름 있는 슬롯

<page-info page="171"/>

<code-caption>부모 컴포넌트 / 슬롯 콘텐츠 정의하기</code-caption>
```html
<comp-child>
  <header slot="header">
    Hello Vue.js!
  </header>
  Vue.js는 JavaScript 프레임워크입니다.
</comp-child>
```

<code-caption>자식 컴포넌트 / 슬롯 사용하기</code-caption>
```html
<section class="comp-child">
  <slot name="header">
    <header>
      디폴트 타이틀
    </header>
  </slot>
  <div class="content">
    <slot>디폴트 콘텐츠</slot>
  </div>
  <slot name="footer">
    <!-- 없다면 아무 것도 출력하지 않습니다. -->
  </slot>
</section>
```

<demo-block demo="guide-ch5-demo06"/>

## S25 컴포넌트의 양방향 데이터 바인딩

<page-info page="175～178"/>

### 컴포넌트의 v-model

<page-info page="175"/>

<code-caption>v-model 사용자 정의</code-caption>
```js
Vue.component('my-calendar', {
  model: {
    // 현재 값을 value가 아니라 current로 할당하고 싶은 경우
    prop: 'current',
    // 이벤트를 change로 사용하고 싶은 경우
    event: 'change'
  },
  // props에서 설정하기
  props: {
    current: String
  },
  created: function () {
    this.$emit('change', '2018-01-01')
  }
})
```

### .sync로 양방향 데이터 바인딩하기

<page-info page="168"/>

<code-caption>부모 컴포넌트</code-caption>
```html
<my-component v-bind:name.sync="name" v-bind:hp.sync="hp"></my-component>
```

```js
new Vue({
  el: '#app',
  data: {
    name: '슬라임',
    hp: 100
  }
})
```

<code-caption>자식 컴포넌트</code-caption>
```js
Vue.component('my-component', {
  template: '<div class="my-component">\
  <p>이름.{{ name }} HP.{{ hp }}</p>\
  <p>이름 <input v-model="localName"></p>\
  <p>HP <input size="5" v-model.number="localHp"></p>\
  </div>',
  props: {
    name: String,
    hp: Number
  },
  computed: {
    // 산출 속성의 셋타와 겟터를 통해 v-model 사용하기
    localName: {
      get: function () {
        return this.name
      },
      set: function (val) {
        this.$emit('update:name', val)
      }
    },
    localHp: {
      get: function () {
        return this.hp
      },
      set: function (val) {
        this.$emit('update:hp', val)
      }
    }
  }
})
```

## S27 이 이외의 기능과 옵션

<page-info page="184～189"/>

### 함수형 컴포넌트

<page-info page="184"/>

```js
Vue.component('functional-component', {
  functional: true,
  render: function (createElement, context) {
    return createElement('div', context.props.message)
  },
  props: {
    message: String
  }
})
```

### 동적 컴포넌트

<page-info page="185"/>

<code-caption>자식 컴포넌트</code-caption>
```js
// 컴포넌트A
Vue.component('my-component-a', {
  template: '<div class="my-component-a">component A</div>'
})
// 컴포넌트B
Vue.component('my-component-b', {
  template: '<div class="my-component-b">component B</div>'
})
```

<code-caption>부모 컴포넌트</code-caption>
```html
<button v-on:click="current^=1">컴포넌트 변경하기</button>
<div v-bind:is="component"></div>
```

```js
new Vue({
  el: '#app',
  data: {
    // 컴포넌트 리스트
    componentTypes: ['my-component-a', 'my-component-b'],
    // 렌더링할 컴포넌트를 선택하는 index
    current: 0
  },
  computed: {
    component: function () {
      // current와 일치하는 index 컴포넌트 사용하기
      return this.componentTypes[this.current]
      // `return current ? 'my-component-b' : 'my-component-a'`를 사용해도 괜찮습니다.
    }
  }
})
```

### 공통 처리는 Mixin으로 만들기

<page-info page="186"/>

<code-caption>믹스인 정의</code-caption>
```js
var mixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
```

<code-caption>믹스인 사용</code-caption>
```js
Vue.component('my-component-a', {
  mixins: [mixin], // 믹스인 등록
  template: '<p>MyComponentA</p>'
})
Vue.component('my-component-b', {
  mixins: [mixin], // 믹스인 등록
  template: '<p>MyComponentB</p>'
})
```

### keep-alive를 사용해서 상태 유지하기

<page-info page="188"/>

<code-caption>자식 컴포넌트 x 2</code-caption>
```js
// 메시지 목록 전용 컴포넌트
Vue.component('comp-board', {
  template: '<div>Message Board</div>',
})
// 입력 양식 전용 컴포넌트
Vue.component('comp-form', {
  template: '<div>Form<textarea v-model="message"></textarea></div>',
  data: function () {
    return {
      message: ''
    }
  }
})
```

<code-caption>부모 컴포넌트</code-caption>
```html
<button v-on:click="current='comp-board'">메시지 목록</button>
<button v-on:click="current='comp-form'">입력 양식</button>
<div v-bind:is="current"></div>
```

```js
new Vue({
  el: '#app',
  data: {
    current: 'comp-board' // 동적으로 변경하기
  }
})
```

<code-caption>keep-alive를 사용한 경우의 부모 템플릿</code-caption>
```html
<button v-on:click="current='comp-board'">메시지 목록</button>
<button v-on:click="current='comp-form'">입력 양식</button>
<keep-alive>
  <div v-bind:is="current"></div>
</keep-alive>
```
