# ToDo 리스트 만들면서 알아보기

이번 튜토리얼에서는 책의 1~4장에서 설명하고 있는 기능을 사용해서, ToDo 리스트를 만들어보겠습니다.
튜토리얼을 진행하다보면, Vue.js의 기본 기능에 대해서 이해할 수 있을 것입니다.

## 미리보기

다음과 같은 ToDO 리스트를 만들겠습니다.

- ToDo 추가・제거
- 진행・완료 상태 변경
- 상태에 따라서 필터링하는 기능

<code-caption>화면 예</code-caption>
![todo-image](/jpub-vue/images/todo/todo-image.png)

로컬 스토리지를 사용하므로, 해당 장치(웹 브라우저)에서만 데이터를 확인할 수 있습니다.

## 파일 준비하기

사용할 파일은 "index.html", "main.js", "main.css"로 3가지입니다. 뷰는 CDN 스탠드얼론 버전을 사용하겠습니다.

### 코드 미리보기

- [index.html](https://github.com/mio3io/cr-vue/blob/master/codes/tutorial-todo/index.html)
- [main.js](https://github.com/mio3io/cr-vue/blob/master/codes/tutorial-todo/main.js)
- [main.css](https://github.com/mio3io/cr-vue/blob/master/codes/tutorial-todo/main.css)

CSS 설명은 따로 하지 않으므로, 복사해서 사용해주세요.

페이지 레이아웃은 다음과 같습니다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vue.js App</title>
  <link rel="stylesheet" href="main.css">
</head>
<body>
  <div id="app">
    <!-- 필터링 라디오 버튼 -->
    <!-- ToDo 테이블 -->
    <!-- 신규 등록 입력 양식 -->
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

## STEP1 인스턴스 생성하기

일단 애플리케이션을 나타내는 `#app` 요소를 생성합니다.

<code-caption>index.html</code-caption>
```html
<body>
  <div id="app">
    <!-- 여기에 템플릿을 작성할 것입니다. -->
  </div>
</body>
```

생성자 함수 `Vue`를 사용해서 루트 인스턴스를 생성합니다.
애플리케이션에서 사용하려는 데이터는 `data` 옵션으로 등록해둡니다.

<code-caption>main.js</code-caption>
```js
const app = new Vue({
  el: '#app',
  data: {
    // 사용할 데이터
  },
  methods: {
    // 사용할 메소드
  }
})
```

`data` 옵션에 등록한 데이터는 모두 리액티브 데이터가 됩니다.

## STEP2 로컬 스토리지 API 적용하기

데이터는 서버로부터 받는 형태가 아니라, "로컬 스토리지"를 사용해서 저장하고 읽어 들이겠습니다.
스토리지 관련 구현은 공식 사이트의 예제인 [TodoMVC Example(한글)](https://kr.vuejs.org/v2/examples/todomvc.html)를 사용하겠습니다.

```js
// https://kr.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuekr-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
```

이 공식 코드의 내용에 대해서는 따로 자세히 설명하지 않겠지만, 이는 `Storage API`를 사용한 데이터 처리를 별도로 빼낸 것입니다.
작은 라이브러리라고 생각해주세요.
왜 처리를 이러한 형태로 빼내었는지는 책의 7장에 있는 컬럼(219페이지)의 설명을 참고해주세요.
이것 이외에 별도로 추가할 내용이 없으므로, 이 코드는 `main.js` 파일의 가장 윗 부분에 추가합니다.

실제로 스토리지에 저장되는 데이터 형식은 다음과 같은 JSON입니다.

```json
[
  { "id": 1, "comment": "새로운 Todo 1", "state": 0 },
  { "id": 2, "comment": "새로운 Todo 2", "state": 0 }
]
```

## STEP3 데이터 설계하기

그럼 지금부터 본격적으로 구현해봅시다!

어떤 데이터가 필요한지 간단하게 생각해봅시다.

- ToDo 리스트 데이터
  - 요소의 고유한 ID
  - 내용
  - 현재 상태
- 작업 중・완료・전체 등의 옵션 레이블로 사용할 이름 목록
- 필터링을 위한 Todo의 상태

애플리케이션에 추가할 기능을 생각해보면, 이정도면 충분할 것입니다.

## STEP4 리스트 전용 테이블

일단 Todo 리스트 데이터를 출력할 테이블 레이아웃을 잡아봅시다.

```html
<div id="app">
  <table>
    <!-- 테이블 헤더 -->
    <thead>
      <tr>
        <th class="id">ID</th>
        <th class="comment">내용</th>
        <th class="state">상태</th>
        <th class="button">-</th>
      </tr>
    </thead>
    <tbody>
      <!-- [1] 여기에 <tr>을 사용해서 Todo 요소를 반복 출력したい -->
    </tbody>
  </table>
</div>
```

## STEP5 리스트 렌더링

Todo 리스트 데이터 전용으로 만든 빈 배열을 `data` 옵션에 등록합니다.

이는 데이터가 없는 때에도 배열로 인식시키기 위해서이며, 추가적으로 원래 `data` 옵션 바로 아래의 데이터는 초기 선언 이후에 추가할 수 없으므로, 미리 선언하기 위함입니다.

```js
var app = new Vue({
  el: '#app',
  data: {
    todos: []
  }
})
```

테이블 태그의 [1]에서 배열 요소의 수만큼 반복 출력하려면, 대상이 되는 태그(현재는 `<tr>` 태그)에 `v-for` 디렉티브를 사용합니다.

```html
<!-- 여기에 <tr>을 사용해서 Todo 요소를 반복 출력 -->
<tr v-for="item in todos" v-bind:key="item.id">
  <!-- 요소의 정보 -->
</tr>
```

디렉티브의 값은 자바스크립트 식이므로, 다음과 같이 작성합니다.

```
v-for="<요소> in <배열 또는 객체>"
```

`v-for`을 작성한 태그 내부에서는 `todos` 데이터의 각 속성을 사용할 수 있게 됩니다.
`<tr>` 태그 내부에 "ID", "내용", "상태 변화 버튼", "제거 버튼" 등의 컬럼을 추가하도록 합시다.

```html
<tbody>
  <!-- 여기에 <tr>을 사용해서 Todo 요소를 반복 출력 -->
  <tr v-for="item in todos" v-bind:key="item.id">
    <th>{{ item.id }}</th>
    <td>{{ item.comment }}</td>
    <td class="state">
      <!-- 상태変更 버튼 목업 -->
      <button>{{ item.state }}</button>
    </td>
    <td class="button">
      <!-- 제거 버튼 목업 -->
      <button>제거</button>
    </td>
  </tr>
</tbody>
```

이 버튼은 아직 어떠한 기능도 갖고 있지 않은 목업이므로, 기능을 이제부터 구현해보도록 합시다.

<page-info page="70">리스트 데이터 출력과 변경</page-info>

## STEP6 입력 양식의 값 추출하기

새로운 Todo를 리스트에 추가하기 위한 입력 양식을 만듭니다.

`ref` 속성을 사용해서 참조를 위한 이름을 태그를 붙이면, 이를 사용해서 DOM에 직접 접근할 수 있습니다.

```html
<input type="text" ref="comment">
```

`ref` 속성을 사용해서 이름을 붙인 태그는 메소드 내부에서 다음과 같은 형태로 사용할 수 있습니다.

```js
this.$refs.이름
```

템플릿에서는 변수 이름(속성 이름)만으로 데이터를 사용할 수 있었지만, 메서드 내부에서 데이터와 메서드를 사용하려면, `this`를 붙여야 하므로 주의해주세요.

예를 들어서 `comment`의 경우 다음과 같이 사용합니다.

```js
this.$refs.comment.value
```

이를 사용하는 예는 이어지는 STEP7에서 살펴보겠습니다.

`v-model` 디렉티브를 사용하면, 데이터와 입력 양식 입력을 동기화 시킬 수 있습니다. 하지만 이번 예제는 입력한 데이터를 따로 저장하고 있을 필요가 없으므로, 그냥 간단하게 `$refs`를 사용해서 값을 추출해 사용하도록 하겠습니다.

```html
  <!-- Todo 리스트 테이블 -->
  </tbody>
</table>

<h2>새로운 작업 추가</h2>
<form class="add-form" v-on:submit.prevent="doAdd">
  <!-- 내용입력 양식 -->
  내용 <input type="text" ref="comment">
  <!-- 추가 버튼 목업 -->
  <button type="submit">추가</button>
</form>
```

테이블 아래에 추가해둡니다.

```html
v-on:submit.prevent="doAdd"
```

이러한 `v-on` 디렉티브에 의해서 버튼을 클릭하거나, 입력 양식에서 엔터 키를 눌러 입력 양식을 Submit하면, `doAdd` 메서드가 호출됩니다.

<page-info page="85">$refs</page-info>
<page-info page="105">v-model</page-info>
<page-info page="96">이벤트 핸들링(v-on)</page-info>

## STEP7 리스트에 Todo 추가하기

이어서 `doAdd` 메소드를 정의합시다.

이 메소드는 입력 양식의 입력 값을 추출해서, 새로운 Todo를 추가하는 처리를 합니다.
루트 생성자 함수의 `methods` 옵션에 메서드를 등록합니다.

```js
new Vue({
  // ...
  methods: {
    // ToDo 추가 처리
    doAdd: function(event, value) {
      // ref로 이름이 붙어 있는 요소를 참조합니다.
      var comment = this.$refs.comment
      // 입력이 없다면 아무 것도 하지 않음 return
      if (!comment.value.length) {
        return
      }
      // { 새로운ID, 내용, 작업상태 }
      // 형태의 객체를 todos 리스트에 추가
      // 작업 상태 "state"는 디폴트로 "작업 중 = 0"으로 생성
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      // 입력 양식의 내용 제거하기
      comment.value = ''
    }
  }
})
```

조금 길어졌지만, `$refs`를 사용하는 부분 이외에는 일반적인 자바스크립트 코드일 뿐입니다.
내용을 차근차근 읽어보면, 쉽게 이해할 수 있을 것입니다.

일반적인 배열 메소드인 `push`를 사용하기만 하면, 리스트에 데이터를 추가할 수 있습니다.

## STEP8 스토리지 저장 기능

자바스크립트 내부에서 데이터 추가 등은 이루어지지만, 아직 로컬 스토리지에 저장하는 과정을 만들지 않았습니다.
그래서 브라우저를 새로고침하면 사라집니다.

`doAdd` 메소드의 마지막 부분에 `todoStorage.save` 메소드를 사용하게 해도 괜찮지만, 이렇게 하면 추가・제거・작업 상태 변경 처리마다 같은 코드를 반복해서 작성해야 합니다.

따라서 `todos` 데이터의 내용이 변경되면, 자동적으로 데이터에 저장하게 만드는 것이 가장 좋습니다.
이는 `watch` 옵션을 사용한 "워처" 기능으로 구현할 수 있습니다.
워처는 데이터의 변화에 반응해서, 특정 처리를 자동적으로 해주는 기능입니다.

```js
watch: {
  감시할데이터: function(newVal, oldVal) {
    // 변화가 있을 때 할 처리
  }
}
```

```js
new Vue({
  // ...
  watch: {
    // 옵셥을 사용하는 경우, 객체 형식으로 지정합니다.
    todos: {
      // 매개 변수로는 속성의 변경 후 값이 들어옵니다.
      handler: function(todos) {
        todoStorage.save(todos)
      },
      // deep 옵션으로 내부의 데이터까지 감시
      deep: true
    }
  }
})
```

이것으로 `todos` 데이터에 어떠한 변화가 있는 경우, 자동적으로 스토리지에 데이터를 저장할 수 있게 됩니다.

<page-info page="128">워처(watch)</page-info>


## STEP9 저장된 리스트 추출하기

스토리지에 데이터를 저장했으므로, 이어서 스토리지에서 데이터를 추출해봅시다.
이 애플리케이션의 "인스턴스 생성 때"에 로컬 스토리지에 저장되는 데이터를 "**자동적**"으로 추출하고, 이를 Vue.js 데이터로 읽어 들입니다.
**특정 시점에서 어떤 처리를 하고 싶은 경우**에는 "**라이프 사이클 훅**" 메소드를 사용합니다.

여러 라이프 사이클을 사용할 수 있겠지만, 이 샘플에서는 "인스턴스 생성 때"를 나타내는 `created`  메소드를 사용합니다.

```js
new Vue({
  // ...
  created() {
    // 인스턴스 생성 때에 자동적으로 fetch() 기능 실행
    this.todos = todoStorage.fetch()
  }
})
```

데이터 추출에는 앞서 만들었던 `todoStorage` 객체의 `fetch` 메소드를 사용하겠습니다.

라이프 사이클 메소드 정의는 "`methods` 내부에 하는 것이 아니다"라는 것을 주의해주세요.

로컬 스토리지는 Ajax와 다르게 동기적으로 결과를 추출하므로, 값을 대입하기만 하면 되므로, 굉장히 간단합니다!

<page-info page="45">라이프사이클 훅</page-info>

## STEP10 상태 변경과 제거 처리

이어서 "상태 변경"과 "제거" 기능을 구현하겠습니다.
`methods` 옵션에 각각의 메소드를 작성합니다.

### doChangeState 메소드(상태 변경)

`item.state`의 값을 반전합니다.

### doRemove 메소드(제거)

인덱스를 추출하고, 배열 메소드인 `splice`를 사용해서 제거합니다.

두 가지 모두 매개 변수로 요소의 참조를 전달하는 형태로 구현합니다.

```js
new Vue({
  // ...
  methods: {
    // ...
    // 상태 변경 처리
    doChangeState: function(item) {
      item.state = item.state ? 0 : 1
    },
    // 제거 처리
    doRemove: function(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  }
})
```

아직 목업 상태이므로, 상태 변경 버튼에 이벤트를 연결해두도록 합시다.

```html
<button v-on:click="doChangeState(item)">
  {{ item.state }}
</button>
```

이어서 제거 버튼도 핸들러를 연결합니다.
제거는 굉장히 위험한 기능이므로, 키 장식자인 `.ctrl`을 사용해서, "**컨트롤 키를 누르고 클릭**"해야 작동하게 만들겠습니다.

```html
<button v-on:click.ctrl="doRemove(item)">
  제거
</button>
```

## STEP11 선택 전용 입력 양식 만들기

특정 작업 상태 목록만을 출력하는 "필터링 기능"을 추가합시다.

애플리케이션 제목 아래에 라디오 버튼을 목록으로 출력합시다.
Todo 리스트와 마찬가지로 동적으로 만들 것이므로, 선택지를 나타내는 `options` 목록을 데이터로 생성합니다.

```js
data: {
  // ...
  options: [
    { value: -1, label: '전체' },
    { value: 0,  label: '작업 중' },
    { value: 1,  label: '완료' }
  ],
  // 선택되어 있는 options의 value를 저장하기 위한 데이터
  // 초기값은 -1(따라서 "전체")
  current: -1
}
```

`options` 리스트를 `<label>` 태그로 반복 렌더링하고, 내부의 `<input>` 태그가 가진 `value` 속성에 `label.value` 데이터를 바인드합니다.

```html
<label v-for="label in options">
  <input type="radio"
    v-model="current"
    v-bind:value="label.value">{{ label.label }}
</label>
```

`v-model` 디렉티브를 사용해서, 라디오 버튼의 선택 값과 `current` 데이터를 동기화 시킵니다.
라디오 버튼이 변경되면, 해당 요소의 `label.value`가 `current` 속성에 자동으로 할당되는 구조입니다.

<page-info page="105">입력 양식 입력 바인딩(v-model)</page-info>

## STEP12 리스트 필터링 기능

`current` 데이터의 선택 값에 따라서 출력할 Todo 리스트의 내용을 필터링하는 "산출 속성"을 만들어봅시다.
산출 속성은 데이터를 기반으로 다른 새로운 데이터를 생성하는 함수형 데이터입니다.

정의 방법은 `computed` 옵션에 데이터를 가공해서 리턴하는 메서드를 등록하면 됩니다.
산출 속성은 원본이 되는 데이터에 변경이 있기 전까지, 결과를 **캐시**하는 성질을 갖고 있습니다.

```js
new Vue({
  // ...
  computed: {
    computedTodos: function() {
      // 데이터 current가 -1라면 전체 출력
      // 이 이외의 경우에는 current와 state의 상태를 기반으로 필터링
      return this.todos.filter(function(el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    }
  }
})
```

정의 방법은 다르지만, 사용 방법은 데이터와 같습니다.
목폭 출력 테이블의 `v-for` 디렉티브 내부에서 있는 `todos` 부분을 `computedTodos`로 변경합니다.

<code-caption>변경 전</code-caption>
```html
<tr v-for="item in todos" v-bind:key="item.id">
```

<code-caption>변경 후</code-caption>
```html
<tr v-for="item in computedTodos" v-bind:key="item.id">
```

예를 들어서 "◯개를 찾았다"라는 결과 요소 수를 출력하고 싶은 경우, 단순하게 `computedTodos.length` 형태로 요소 수를 구할 수 있습니다.

```
{{ computedTodos.length }} 개의 결과 출력 중
```

캐시 기능이 있으므로, 메소드와 다르게, 몇 번 실행해도 처리는 한 번만 이루어집니다.

<page-info page="120">산출 속성 computed</page-info>

## STEP13 문자열 변환 처리

마지막으로 "상태 변경 버튼"의 레이블이 숫자로 되어 있는 것을 수정하겠습니다.

상태 변경 버튼에서 사용하고 있는 상태인 `item.state` 데이터에는 문자열이 아니라, "키"가 되는 숫자를 저장하고 있습니다.
일반적으로 카테고리 등의 데이터는 이처럼 숫자 또는 짧은 알파벳을 키로 사용하는 경우가 많습니다.
하지만 이런 상태라면 작업 중을 "0", 완료를 "1"로 출력해버려서, 사용자가 무슨 의미인지 알지 못 할 것입니다.

따라서 필터링 선택 박스 전용으로 만든 `options` 데이터를 기반으로, `value`을 `label`로 변환하기 위한 `labels` 산출 속성을 만들었습니다.

```js
computed: {
  labels() {
    return this.options.reduce(function(a, b) {
      return Object.assign(a, { [b.value]: b.label })
    }, {})
    // 키를 기반으로 쉽게 볼 수 있게, 다음과 같이 변환합니다.
    // {0: '작업 중', 1: '완료', -1: '전체'}
  }
}
```

Mustache에서 `labels` 객체를 사용하는 형태로 변경합니다.

```html
<button v-on:click="doChangeState(item)">
  {{ labels[item.state] }}
</button>
```

이렇게 하면 사람이 이해할 수 있는 문자 형태로 출력되는 것을 확인할 수 있습니다.
이와 같은 문자 처리는 필터 기능을 사용해서도 구현할 수 있습니다.

<page-info page="134">필터</page-info>

## 완전한 HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Vue.js App</title>
  <link rel="stylesheet" href="./main.css">
</head>
<body>

  <div id="app">
    <h1>튜토리얼Todo 리스트</h1>

    <!-- ★STEP11 -->
    <label v-for="label in options" >
      <input type="radio"
        v-model="current"
        v-bind:value="label.value">{{ label.label }}
    </label>
      
    <!-- ★STEP12 -->
    ({{ computedTodos.length }} 개의 결과 출력하기)

    <!-- ★STEP4 리스트 전용 테이블 -->
    <table>
      <thead v-pre>
        <tr>
          <th class="id">ID</th>
          <th class="comment">내용</th>
          <th class="state">상태</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <!-- ★STEP5 ToDo 요소 반복 출력-->
        <tr
          v-for="item in computedTodos"
          v-bind:key="item.id"
          v-bind:class="{done:item.state}">
          <th>{{ item.id }}</th>
          <td>{{ item.comment }}</td>
          <td class="state">
            <!-- ★STEP10 상태 변경 버튼 -->
            <button v-on:click="doChangeState(item)">
              {{ labels[item.state] }}
            </button>
          </td>
          <td class="button">
            <!-- ★STEP10 제거 버튼 -->
            <button v-on:click.ctrl="doRemove(item)">
              제거
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>※제거 버튼은 컨트롤 키를 누르고 클릭해주세요.</p>

    <!-- ★STEP6 -->
    <h2>새로운 작업 추가</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
      <!-- 내용입력 양식 -->
      내용 <input type="text" ref="comment">
      <!-- 추가 버튼 목업 -->
      <button type="submit">추가</button>
    </form>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="./main.js"></script>
</body>
</html>
``` 
