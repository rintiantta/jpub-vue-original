---
pageClass: custom-page-class
---

# 스코프 있는 슬롯 응용 예

옵션 템플릿을 정할 수 있는, 사용자 정의 선택 박스의 예입니다.

## 데모

<client-only>
<demo-block>
  <examples-slot-scope-index/>
</demo-block>
</client-only>

## 사용하고 있는 주요 기능

<page-info page="105">입력 양식 입력 바인딩 v-model</page-info>
<page-info page="146">컴포넌트</page-info>
<page-info page="169">슬롯</page-info>
<page-info page="194">트랜지션</page-info>
<page-info page="103">이벤트 핸들링 키 장식자</page-info>

## 소스 코드

- [소스 코드](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/examples/slot-scope)

<code-caption>MySelect.vue</code-caption>
{include:examples/slot-scope/MySelect.vue}

<code-caption>index.vue</code-caption>
{include:examples/slot-scope/index.vue}

## 참고

키보드 조작과 윈도우 영역을 고려하면, 조금 더 코드가 복잡해집니다.
직접 만들어야 할 필요가 없다면 Element 등의 UI 킷을 사용하는 것을 추천합니다.
다만 입력 양식은 컴포넌트를 공부할 때 굉장히 좋은 재료라고 할 수 있으므로, 한 번 만들어 보는 것도 재미있는 공부가 될 것입니다!