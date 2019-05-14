---
sidebarDepth: 2
title: CHAPTER 2
---

# CH2 데이터 등록과 변경

## S08 텍스트와 속성 데이터 바인딩

<page-info page="37~50"></page-info>

### 객체와 배열 내부의 요소 출력하기

<page-info page="38"></page-info>

```html
<!-- 1. 객체의 속성 출력하기 -->
<p>{{ message.value }}</p>
<!-- 2. 문자열의 길이 출력하기 -->
<p>{{ message.value.length }}</p>
<!-- 3. 리스트 내부의 요소 출력하기 -->
<p>{{ list[2] }}</p>
<!-- 4. 속성을 조합해서 사용하기 -->
<p>{{ list[num] }}</p>
```

```js
new Vue({
  el: '#app',
  data: {
    // 객체 데이터
    message: {
      value: 'Hello Vue.js!'
    },
    // 배열 데이터
    list: ['사과', '바나나', '딸기'],
    // 4번을 위한 요소
    num: 1
  }
})
```

### 클릭으로 카운터의 수 늘리기

<page-info page="42"></page-info>

```html
<div id="app">
  <!-- count 속성 출력하기 -->
  <p>{{ count }}번 클릭했습니다. </p>
  <!-- 이 버튼을 클릭하면 increment 메소드가 호출됩니다 . -->
  <button v-on:click="increment">카운트하기</button>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    count: 0
  },
  methods: {
    // 버튼을 클릭할 때의 핸들러
    increment: function () {
      this.count += 1 // 다시 할당하는 처리만 합니다.
    }
  }
})
```

<demo-block demo="guide-ch2-demo01"/>

### 클래스와 스타일 데이터 바인딩

<page-info page="45"></page-info>

```html
<button v-on:click="isActive=!isActive">isActive 변경하기</button>
<p v-bind:class="{ child: isChild, 'is-active': isActive }" class="item">
  동적 클래스
</p>
<p v-bind:style="{ color: textColor, backgroundColor: bgColor }" class="item">
  동적 스타일
</p>
```

```js
new Vue({
  el: '#app',
  data: {
    isChild: true,
    isActive: true,
    textColor: 'red',
    bgColor: 'lightgray'
  }
})
```

```css
.item {
  padding: 4px 8px;
  transition: background-color 0.4s;
}
.is-active {
  background: #ffeaea;
}
```

<demo-block demo="guide-ch2-demo02"/>

### SVG 데이터 바인딩하기

<page-info page="49"></page-info>

```html
<div id="app">
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <circle cx="100" cy="75" v-bind:r="radius" fill="lightpink" />
  </svg>
  <input type="range" min="0" max="100" v-model="radius">
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    radius: 50
  }
})
```

<demo-block demo="guide-ch2-demo03"/>

::: tip
만약 전달 받은 `radius`의 값을 수식으로 사용하고 싶은 경우, `.number` 장식자를 사용하면 됩니다.

```html
<input type="range" min="0" max="100" v-model.number="radius">
```

:::


## S10 리스트 데이터 출력/변경하기

<page-info page="54~84"></page-info>

### 요소를 반복해서 렌더링하기

"반복 렌더링하면서 다양한 조건 적용하기" 부분도 함께 정리했습니다.

<page-info page="54~56"></page-info>

```html
<div id="app">
  <ul>
    <li v-for="item in list"
      v-bind:key="item.id"
      v-bind:class="{ strong: item.hp > 300 }">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
      <span v-if="item.hp > 300">강하다!</span>
    </li>
  </ul>
</div>
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
  }
})
```

<demo-block demo="guide-ch2-demo04"/>

::: tip

템플릿 내부의 `item.hp > 300`처럼 조건과 일치하는지를 확인하는 식은 메서드 또는 산출 속성으로 만드는 것이 이해도 쉽고, 유지보수도 쉽습니다.

추가적으로 디렉티브의 식 부분은 해당 요소를 감싸고 있는 컴포넌트의 가상 DOM이 변경될 때마다 호출됩니다(`v-on`은 콜백 함수이므로 제외).
책에서 설명하고 있는 사용자 정의 디렉티브의 동적과 마찬가지로 <mark>직접 관계가 없는 데이터의 변화가 없더라도</mark> 호출됩니다.

<code-caption>매번 isstrong() 호출하기</code-caption>
```
<li v-for="item in list" v-if="isstrong(item.hp)" ...>
```

<code-caption>매번 1+1 하기</code-caption>
```
{{ 1+1 }}
```

여러 상황에 의존하는 컴포넌트의 경우, 의미 없는 처리가 많이 발생하게 되므로 주의해주세요!
가능한 산출 속성 또는 `v-once`를 활용하거나, 일정 단위로 컴포넌트를 분할하는 것이 좋습니다.

:::

### 리스트에 요소 추가하기

<page-info page="60"></page-info>

```html
<div id="app">
  <!-- 입력 양식의 입력 값을 새로운 몬스터의 이름으로 사용하기 -->
  이름
  <input v-model="name">
  <button v-on:click="doAdd">몬스터 추가하기</button>
  <ul>
    <li v-for="item in list" v-bind:key="item.id">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
    </li>
  </ul>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    name: '키메라',
    list: [
      { id: 1, name: '슬라임', hp: 100 },
      { id: 2, name: '고블린', hp: 200 },
      { id: 3, name: '드래곤', hp: 500 }
    ]
  },
  methods: {
    // 추가 버튼을 클릭할 때의 핸들러
    doAdd: function () {
      // 리스트 내부에서 가장 큰 ID 추출하기
      var max = this.list.reduce(function (a, b) {
        return a > b.id ? a : b.id
      }, 0)
      // 새로운 몬스터를 리스트에 추가하기
      this.list.push({
        id: max + 1, // 현재 최대 ID에 1을 더해서 유니크 ID로 사용하기
        name: this.name, // 현재 입력 양식의 값
        hp: 500
      })
    }
  }
})
```

<demo-block demo="guide-ch2-demo05"/>

### 리스트에서 요소 제거하기

<page-info page="61"></page-info>

```html
<div id="app">
  <ul>
    <li v-for="(item, index) in list" v-bind:key="item.id">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
      <!-- 삭제 버튼을 v-for 내부에 만들기 -->
      <button v-on:click="doRemove(index)">몬스터 제거하기</button>
    </li>
  </ul>
</div>
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
    // 요소 삭제 버튼을 클릭할 때의 핸들러
    doRemove: function (index) {
      // 전달받은 인덱스 위치에서 한 개만큼 제거하기
      this.list.splice(index, 1)
    }
  }
})
```

<demo-block demo="guide-ch2-demo06"/>

### 리스트 요소 속성 변경하기

<page-info page="64"></page-info>

```html
<div id="app">
  <ul>
    <li v-for="(item, index) in list" v-bind:key="item.id" v-if="item.hp">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
      <span v-if="item.hp < 50">빈사 상태!</span>
      <!-- 버튼은 v-for 내부에 만들기 -->
      <button v-on:click="doAttack(index)">공격하기</button>
    </li>
  </ul>
</div>
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
    // 공격 버튼을 클릭할 때의 핸들러
    doAttack: function (index) {
      this.list[index].hp -= 10 // HP 감소시키기
    }
  }
})
```

<demo-block demo="guide-ch2-demo07"/>

### 외부에서 데이터 가져와서 출력하기

<page-info page="67"></page-info>

현재 샘플 코드에서는 [axios](/guide/chapter1.html#s04-%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)를 사용하고 있습니다. 실제 운용할 때는 "axios.min.js"을 사용해주세요.

<code-caption>list.json</code-caption>
```json
[
  { "id": 1, "name": "슬라임", "hp": 100 },
  { "id": 2, "name": "고블린", "hp": 200 },
  { "id": 3, "name": "드래곤", "hp": 500 }
]
```

```html
<div id="app">
  <ul>
    <li v-for="(item, index) in list" v-bind:key="item.id">
      ID.{{ item.id }} {{ item.name }} HP.{{ item.hp }}
    </li>
  </ul>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    // 미리 빈 리스트 준비하기
    list: []
  },
  created: function () {
    axios.get('list.json').then(function (response) {
      // 데이터를 읽어 들였다면 list에 할당하기
      this.list = response.data
    }.bind(this)).catch(function (e) {
      console.error(e)
    })
  }
})
```

::: tip

HTML 파일을 "file://"이라는 스키마를 사용해서 웹 브라우저에서 열은 상태에서 Ajax로 JSON을 읽어 들이면 로컬 파일을 읽어 들이는 것이 되므로, 보안 문제와 관련된 오류가 발생합니다.
JSON 파일을 적당한 호스팅 서버에 업로드해서, "http://" 또는 "https://"로 열고 호출하거나, 크롬을 실행할 때 `--allow-file-access-from-files` 옵션을 붙여서 웹 브라우저를 실행해주세요.

※ <mark>보안적인 문제가 있으므로, 위 옵션을 붙인 상태로는 일반적인 웹 브라우징을 하지 말기 바랍니다.</mark>

간단하게 XAMPP를 사용하거나, 도커를 활용해 "hello-world-nginx" 컨테이너를 만들고, `localhost`에서 HTML 파일을 여는 방법을 사용할 수도 있습니다.

:::

## S11 DOM을 직접 참조하는 $el과 $refs

<page-info page="69"></page-info>

### $el과 $refs는 일시적인 변경!

<page-info page="86"></page-info>

```html
<div id="app">
  <button v-on:click="handleClick">Count up</button>
  <button v-on:click="show=!show">표시/비표시</button>
  <span ref="count" v-if="show">0</span>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    show: true
  },
  methods: {
    handleClick() {
      var count = this.$refs.count
      if (count) {
        count.innerText = parseInt(count.innerText, 10) + 1
      }
    }
  }
})
```

## S12 템플릿 제어 디렉티브

<page-info page="72"></page-info>

### v-cloak

<page-info page="75"></page-info>

```html
<div id="app" v-cloak>
  {{ message }}
</div>
```

```css
@keyframes cloak-in {
  0% {
    opacity: 0;
  }
}
#app {
  animation: cloak-in 1s;
}
#app[v-cloak] {
  opacity: 0;
}
```
