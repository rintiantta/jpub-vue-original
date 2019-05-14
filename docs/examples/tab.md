# 탭

## 데모

<client-only>
<demo-block>
  <examples-tab-index/>
</demo-block>
</client-only>

단순하면 재미가 없으므로, 트랜지션을 사용해서 슬라이드 하게 만들었습니다.

## 사용하고 있는 주요 기능

<page-info page="62">클래스 데이터 바인딩하기</page-info>
<page-info page="64">여러 속성 데이터 바인딩하기</page-info>
<page-info page="120">산출 속성(computed)</page-info>
<page-info page="146">컴포넌트</page-info>
<page-info page="153">컴포넌트와 컴포넌트 끼리의 통신</page-info>
<page-info page="194">트랜지션</page-info>

## 소스 코드

- [소스 코드](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/examples/tab)

<code-caption>index.vue</code-caption>
{include:examples/tab/index.vue}

<code-caption>TabItem.vue</code-caption>
{include:examples/tab/TabItem.vue}

::: tip 탭 요소 컴포넌트의 액티브 상태를 스스로 판단하게 하기

어떤 컴포넌트가 선택되어 있는 상태인지 판단해야 하는 상황은 굉장히 많습니다.

현재 샘플에서는 부모로부터 전달받은 `currentId` 속성을 자신의 ID와 비교해서, 자신이 액티브 상태(선택되어 있는 상태)인지 확인하고 있습니다. 굉장히 자주 사용하는 형태입니다.

:::
