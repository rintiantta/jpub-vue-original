---
sidebarDepth: 2
title: CHAPTER 3
---

# CH3 이벤트와 입력 양식

## S13 이벤트 핸들링

<page-info page="80~89"></page-info>

### 메소드 이벤트 핸들링

<page-info page="80"></page-info>

```html
<button v-on:click="handleClick">클릭</button>
```

```js
new Vue({
  el: '#app',
  methods: {
    handleClick: function () {
      alert('클릭했어요!')
    }
  }
})
```

### 입력 양식 입력 추출하기

<page-info page="83"></page-info>

```html
<input v-bind:value="message" v-on:change="handleInput">
```

```js
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js',
  },
  methods: {
    handleInput: function (event) {
      // 할당 전에 어떤 처리하기
      this.message = event.target.value
    }
  }
})
```

### 이벤트 장식자

<page-info page="84"></page-info>

```html
<div v-on:click.right="handler">example</div>
<!-- 마우스 오른쪽 버튼을 눌렀을 때 컨텍스트 메뉴가 출력되지 않음 -->
<div v-on:click.right.prevent="handler">example</div>
```

```js
new Vue({
  el: '#app',
  methods: {
    handler: function (comment) {
      console.log(comment)
    }
  }
})
```

### .stop

```html
<div v-on:click="handler('div1')">
  div1
  <a href="#top" v-on:click.stop="handler('div2')">div2</a>
</div>
```

### .prevent

```html
<div v-on:click="handler('div1')">
  div1
  <a href="#top" v-on:click.prevent="handler('div2')">div2</a>
</div>
```

### .capture

```html
<div v-on:click.capture="handler('div1')">
  div1
  <div v-on:click="handler('div2')">
    div2
    <div v-on:click="handler('div3')">div3</div>
  </div>
</div>
```

### .native

```html
<!-- 컴포넌트를 클릭하면 핸들러가 호출됨 -->
<my-component v-on:click.native="handler"></my-component>
<!-- 컴포넌트를 클릭하더라도 핸들러가 호출되지 않음 -->
<my-component v-on:click="handler"></my-component>
```

## S14 입력 양식 입력 핸들링

<page-info page="90~99"></page-info>

### 텍스트 에리어

<page-info page="108"></page-info>

```html
<textarea v-model="message"></textarea>
<pre>{{ message }}</pre>
```

```js
new Vue({
  el: '#app',
  data: {
    message: 'Hello!'
  }
})
```

<demo-block demo="guide-ch3-demo06"/>

### 체크 박스

<page-info page="108"></page-info>

#### 하나의 요소를 선택

```html
<label>
  <input type="checkbox" v-model="val"> {{ val }}
</label>
```

```js
new Vue({
  el: '#app',
  data: {
    val: true
  }
})
```

<demo-block demo="guide-ch3-demo07"/>

#### 여러 개의 요소를 선택

```html
<label><input type="checkbox" v-model="val" value="A"> A</label>
<label><input type="checkbox" v-model="val" value="B"> B</label>
<label><input type="checkbox" v-model="val" value="C"> C</label>
<p>{{ val }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    val: []
  }
})
```

<demo-block demo="guide-ch3-demo08"/>

### 라디오 버튼

<page-info page="110"></page-info>

```html
<label><input type="radio" value="a" v-model="val"> A</label>
<label><input type="radio" value="b" v-model="val"> B</label>
<label><input type="radio" value="c" v-model="val"> C</label>
<p>{{ val }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    val: ''
  }
})
```

<demo-block demo="guide-ch3-demo09"/>

### 선택 박스

<page-info page="96"></page-info>

#### 하나의 요소를 선택

```html
<select v-model="val">
  <option disabled="disabled">선택해 주세요.</option>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
</select>
<p>{{ val }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    val: ''
  }
})
```

<demo-block demo="guide-ch3-demo10"/>

#### 여러 요소를 선택

```html
<select v-model="val" multiple>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
</select>
<p>{{ val }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    val: []
  }
})
```

<demo-block demo="guide-ch3-demo11"/>

### 이미지 파일

<page-info page="111"></page-info>

```html
<input type="file" v-on:change="handleChange">
<div v-if="preview"><img v-bind:src="preview"></div>
```

```js
new Vue({
  el: '#app',
  data: {
    preview: ''
  },
  methods: {
    handleChange: function (event) {
      var file = event.target.files[0]
      if (file && file.type.match(/^image\/(png|jpeg)$/)) {
        this.preview = window.URL.createObjectURL(file)
      }
    }
  }
})
```

<demo-block demo="guide-ch3-demo12"/>

※ 현재 예제에서는 브라우저 상에서 미리 보기하는 처리만 하고 있으며, 서버에 업로드 하는 처리는 따로 하고 있지 않습니다.

## S15 마운트 요소 외의 이벤트 조작

<page-info page="100~103"></page-info>

### 스크롤 이벤트 추출하기

<page-info page="100"></page-info>

```js
new Vue({
  el: '#app',
  data: {
    scrollY: 0,
    timer: null
  },
  created: function () {
    // 핸들러 등록하기
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy: function () {
    // 핸들러 제거하기(컴포넌트 또는 SPA 의 경우 절대 잊지 말아 주세요!)
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 위화감을 느끼지 않을 200ms 간격으로 scroll 데이터를 변경하는 예
    handleScroll: function () {
      if (this.timer === null) {
        this.timer = setTimeout(function () {
          this.scrollY = window.scrollY
          clearTimeout(this.timer)
          this.timer = null
        }.bind(this), 200)
      }
    }
  }
})
```

### 스무스 스크롤 구현하기

<page-info page="102"></page-info>


```html
<script src="https://cdn.jsdelivr.net/npm/smooth-scroll@12.1.5"></script>
<div id="app">
  <div class="content">...</div>
  <div v-on:click="scrollTop">
    페이지 상단으로 이동하기
  </div>
</div>
```

```js
var scroll = new SmoothScroll()
new Vue({
  el: '#app',
  methods: {
    scrollTop: function () {
      scroll.animateScroll(0)
    }
  }
})
```

## COLUMN Vue.js를 사용하지 않고 이벤트 핸들하기

<page-info page="103"></page-info>

```html
<div id="app">
  <input id="message" v-on:input="handleInput">
  <button data-update="jQuery!">jQuery로 변경하기</button>
</div>
```

```js
$(document).on('click', '[data-update]', function () {
  $('#message').val($(this).attr('data-update'))
  // 입력 값을 변경했다면 이벤트 발생시키기
  $('#message')[0].dispatchEvent(new Event('input'))
})
new Vue({
  el: '#app',
  methods: {
    handleInput: function (event) {
      console.log(event.target.value)
    }
  }
})
```
