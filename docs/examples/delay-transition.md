# 시간 차 트랜지션

트랜지션 훅을 사용하면, 리스트 요소를 출력하는 시점에 시간차를 줄 수 있습니다.
이번 문서는 코드가 너무 길고, 책에서 제외한 내용이라, 약간의 추가적인 설명이 들어 있습니다.

## 데모

<client-only>
<demo-block>
  <examples-delay-transition-demo2/>
</demo-block>
</client-only>

## 사용하고 있는 주요 기능

<page-info page="205">트랜지션</page-info>
<page-info page="212">트랜지션 훅</page-info>
<page-info page="120">산출 속성(computed)</page-info>

## 소스 코드

- [소스 코드](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/examples/delay-transition)

## 동적으로 리스트 만들기

우선 트랜지션을 적용할 동적 리스트를 생성합시다.
리스트에 요소를 추가하고 제거하고, `current` 속성을 사용해서 특정 위치의 요소를 추출하는 내용을 구현했습니다.

<code-caption>demo0.vue</code-caption>
{include:examples/delay-transition/demo0.vue}

렌더링한 요소의 인덱스를 트랜지션 훅에서 추출할 수 있게 `<li>` 태그에 `data-index`라는 속성을 지정했습니다.

트랜지션 전용 CSS에서는 "추가될 때 왼쪽에서 페이드인", "제거될 때 오른쪽에서 페이드아웃"되는 스타일을 적용하고 있습니다.

<code-caption>style.css</code-caption>
{include:examples/delay-transition/style.css}

## 훅으로 지연 추가하기

리스트 트랜지션에서는 <mark>각 요소에 대해서</mark> 다른 트랜지션 훅을 적용할 수 있습니다.
인덱스 숫자를 기반으로 딜레이를 적용하는 함수를 정의해서, 훅합시다.

```html
<transition-group tag="ul" class="list"
  @before-enter="beforeEnter"
  @after-enter="afterEnter"
  @enter-cancelled="afterEnter">
```

```js
methods: {
  // ...
  // 트랜지션을 시작할 때 인덱스 * 100ms 만큼의 딜레이를 적용합니다.
  beforeEnter(el) {
    el.style.transitionDelay = 100 * parseInt(el.dataset.index, 10) + 'ms'
  },
  // 트랜지션 완료 또는 취소할 때는 딜레이를 제거합니다.
  afterEnter(el) {
    el.style.transitionDelay = ''
  }
}
```

추가한 코드는 다음과 같습니다.

<code-caption>demo1.vue</code-caption>
{include:examples/delay-transition/demo1.vue}

<demo-block>
  <examples-delay-transition-demo1/>
</demo-block>

요소를 추출하는 것이라면, 이것만으로도 충분합니다.
이 데모를 보면, 추가한 요소가 리스트 뒤에 있을 경우, 그만큼 더 딜레이 된다는 것을 알 수 있습니다.

## 요소를 추가한 때의 지연 조정하기

요소를 추가할 때는 딜레이를 적용하지 않게 기능을 개선해봅시다.

```js
data(){
  return {
    // ...
    // 추가 상태를 판단하기 위한 플래그
    addEnter: false
  }
},
methods: {
  // ...
  doAdd() {
    // 추가 플래그 True로 변경하기
    this.addEnter = true
    const newNumber = Math.max.apply(null, this.list) + 1
    const index = Math.floor(Math.random() * (this.list.length + 1))
    this.list.splice(index, 0, newNumber)
  },
  // ...
  beforeEnter(el) {
    this.$nextTick(() => {
      if (!this.addEnter) {
        // 추가가 아닌 경우 딜레이 부여
        el.style.transitionDelay = 100 * parseInt(el.dataset.index, 10) + 'ms'
      } else {
        // 추가된 후에는 플래그 제거
        this.addEnter = false
      }
    })
  }
}
```

수정한 코드는 다음과 같습니다.

<code-caption>demo2.vue</code-caption>
{include:examples/delay-transition/demo2.vue}

<demo-block>
  <examples-delay-transition-demo2/>
</demo-block>

새로 요소를 추가할 때는 딜레이를 적용하지 않게 트랜지션을 변경해보았습니다.

## 참고

스크롤 양에 따른 처리 또는 애니메이션 ㅎ효과는 웹 사이트의 디자인에서 빼놓을 수 없는 부분입니다.
가상 DOM을 통해 구축되는 DOM에 접근하는 경우 `nextTick`을 어떻게 사용하는지가 굉장히 중요한 요소가 됩니다.
`nextTick`의 사용 방법에 대해서는 3장에서 자세하게 설명합니다.