# 추가 예제 모음집에 대해서

이 페이지에서는 범용적인 UI와 관련된 샘플을 설명합니다.
자세한 설명은 따로 없지만, 코드를 포함하고 있으므로 꼭 참고하기 바랍니다.
Vue.js는 비교적 규칙이 유연해서, 어떤 기능을 구현하기 위한 방법이 굉장히 많습니다.
그래서 최적의 구현 방법을 사람들이 공유하는 경우가 많은데요. 그런 것들을 정리해보았습니다.

## 추가 예제 모음집에 대해서

이 문서는 모두 <mark>단일 파일 컴포넌트, ES2015+</mark>로 구현되어 있습니다.
단일 파일 컴포넌트를 사용하지 않는 경우, 다음과 같은 형태로 변경해서 사용해주세요.

### 루트가 될 컴포넌트의 데이터를 객체로 변경하기

<code-caption>변경 전</code-caption>
```js
export default {
  components: { MyComponent },
  data() {
    return {
      foo: true
    }
  }
}
```

<code-caption>변경 후</code-caption>
```js
new Vue({
  components: { 'my-component': MyComponent },
  data: {
    foo: true
  }
})
```

### 컴포넌트의 태그를 옵션으로 변경하기

<code-caption>변경 전</code-caption>
```vue
<template>
  <div class="my-component">
    ...
  </div>
</template>

<script>
export default {
  data() {
    return {
      bar: true
    }
  }
}
</script>
```

<code-caption>변경 후</code-caption>
```js
var MyComponent = {
  template: '<div class="my-component">\
    ...\
  </div>',
  data() {
    return {
      bar: true
    }
  }
}
```
