# 텍스트 애니메이션

## 데모

<client-only>
<demo-block>
  <examples-text-animation-index/>
</demo-block>
</client-only>

## 사용하고 있는 주요 기능

<page-info page="62">클래스와 스타일 데이터 바인딩</page-info>
<page-info page="205">리스트 트랜지션</page-info>
<page-info page="120">산출 속성(computed)</page-info>
<page-info page="128">워처(watch)</page-info>

## 소스 코드

- [소스 코드](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/examples/text-animation)

<code-caption>index.vue</code-caption>
{include:examples/text-animation/index.vue}

### TextAnime1

문자 수가 적은 경우, 스타일을 조합해서 애니메이션을 만들고자 하는 경우에는 이를 활용하는 것이 좋습니다.

<code-caption>TextAnime1.vue</code-caption>
{include:examples/text-animation/TextAnime1.vue}

당연히 고정 문자열이라면, `v-for`가 아니라, 정적 콘텐츠를 바로 넣어서 사용하는 것이 성능적으로 좋습니다.

### TextAnime2

문자 수가 많고, 변화가 많을 수 있는 경우라면 이를 활용하는 것이 좋습니다.

<code-caption>TextAnime2.vue</code-caption>
{include:examples/text-animation/TextAnime2.vue}

### TextAnime3

키가 같다면 `v-move`가 적용되는 것을 사용해서, 문자와 인덱스를 조합해서 키를 생성하고 있습니다.

문자 수가 많으면 비용이 약간 높아질 수 있으므로, 인스턴스 초기화와 메시지 편집이 일어날 때, 미리 분자열을 분석하고 키를 생성해두는 것을 주목해주세요.

<code-caption>TextAnime3.vue</code-caption>
{include:examples/text-animation/TextAnime3.vue}
