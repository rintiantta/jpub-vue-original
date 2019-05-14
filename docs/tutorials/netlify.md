---
sidebarDepth: 2
title: Vue.js＋Netlify로 자동 디플로이하기
---

# Netlify 자동 디플로이 해보기

이번 튜토리얼에서는 Vue CLI를 사용해서 만든 Vue.js 프로젝트를 Netlify에 수동 디플로이 하는 방법과 자동 디플로이 하는 방법을 설명하겠습니다.

## Netlify란?

정적 사이트를 위한 고성능 호스팅 서비스입니다.
Git 호스팅 서비스와 연동하는 자동 디플로이, SSL/HTTPS를 무료로 사용할 수 있습니다.
특히 포트폴리오를 위한 정적 사이트 등을 구축할 때 굉장히 좋습니다.
이 문서에서는 GitHub 계정을 사용해서 등록하는 방법을 설명하겠습니다.

## Netlify 가입하기

- [netlify 메인 페이지](https://www.netlify.com/)
- [netlify Signup 페이지](https://app.netlify.com/signup)

"signup" 페이지를 열고, 인증 방법으로 "GitHub"을 선택합니다.

<code-caption>그림 2.1</code-caption>
<p align="center"><img src="/images/netlify/netlify-singup1.png"></p>

새 화면이 뜨면서 GitHub 인증 허가를 요구할 것입니다. 내용에 별다른 문제가 없는지 확인하고, "Authorize" 버튼을 눌러주세요.
등록은 이것으로 모두 완료입니다.
관리 화면을 열어주세요.

- [netlify 관리 화면 페이지](https://app.netlify.com/)

## 로컬 빌드로 디플로이하기

로컬에서 빌드한 파일을 Netlify에 공개해봅시다.

### 빌드 파일 압축하기

미리 `dist` 폴더와 `index.html`을 ZIP 파일로 압축해둡니다.

<p align="center"><img src="/images/netlify/netlify-zip.png"></p>

### ZIP 파일 업로드하기

관리 화면 메인 페이지는 다음과 같습니다.
화면 상에 있는 점선으로 감싼 부분에 ZIP 파일을 드래그하면, 곧 바로 웹 사이트를 공개할 수 있습니다.

<code-caption>그림 2.2</code-caption>
<p align="center"><img src="/images/netlify/netlify-static-deploy1.png"></p>

ZIP 파일을 <span class="num">1</span>의 점선으로 표시한 부분에 드래그합니다.
조금 기다리면, 다음과 같은 화면이 출력됩니다.

<code-caption>그림 2.3</code-caption>
<p align="center"><img src="/images/netlify/netlify-static-deploy2.png"></p>

### 사이트 확인하기

<span class="num">2</span>의 URL을 열면, 웹 사이트가 공개되어 있는 것을 확인할 수 있습니다.

<code-caption>그림 2.4</code-caption>
<p align="center"><img src="/images/netlify/netlify-static-deploy3.png"></p>

## GitHub 자동 디플로이

이어서 GitHub 리포지토리를 연동해서, 자동 디플로이 해봅시다.

### 리포지토리 만들기

미리 준비한 GitHub 리포지토리에 Vue CLI로 만든 프로젝트를 Push합니다.
좋아하는 이름으로 만들어주세요.

<code-caption>그림 2.8</code-caption>
<p align="center"><img src="/images/netlify/netlify-github1.png"></p>

빌드 파일이 아니라, 그림처럼 프로젝트 루트에 소스 코드를 올릴 리포지토리를 생성합니다.

### 새로운 사이트 만들기

Netlify 관리 화면 오른쪽 위에 있는 <span class="num">1</span> "New site from Git"을 선택합니다.

<code-caption>그림 2.9</code-caption>
<p align="center"><img src="/images/netlify/netlify-auto-deploy1.png"></p>

### Git 호스팅 선택하기

Git 호스팅 서비스 선택 화면에서 <span class="num">2</span> "GitHub"을 선택합니다.
인증 방법이 같다면, 곧바로 리포지토리 목록이 나오지만, 다른 인증 방법을 선택한 경우 GitHub 인증을 요구합니다.

<code-caption>그림 2.10</code-caption>
<p align="center"><img src="/images/netlify/netlify-auto-deploy2.png"></p>

### 리포지토리 선택하기

GitHub 계정에 있는 리포지토리 목록이 나오면, Netlify에 공개하고 싶은 리포지토리를 선택해주세요.

<code-caption>그림 2.11</code-caption>
<p align="center"><img src="/images/netlify/netlify-auto-deploy3.png"></p>

### 빌드 설정

다음 화면에서 빌드 명령어와 폴더를 설정합니다.
<span class="num">4</span> 브랜치는 기본적으로 "master"이지만, 다른 브랜치를 선택하고 싶은 경우, 변경할 수도 있습니다.

<code-caption>그림 2.12</code-caption>
<p align="center"><img src="/images/netlify/netlify-auto-deploy4.png"></p>


<span class="num">5</span> 빌드 명령어는 로컬에서의 빌드와 같은 명령어를 설정해주세요.

```
npm run build
```

<span class="num">6</span> 의 공개 디렉터리는 `index.html`이 있는 폴더를 지정합니다.
디폴트 설정에서는 `dist` 폴더 내부에 `index.html`가 만들어지므로, 다음과 같이 설정합니다.

```
dist
```

VUE CLI로 만들어진 `package.json`과 webpack 설정을 따로 편집하지 않는다면, 이 상태로 디플로이 할 수 있습니다.

### 빌드

처음 빌드할 때는 모듈 설치 때문에 시간이 좀 걸립니다. 느긋하게 기다려주세요.
빌드 로그에서 현재 무엇을 하고 있는지 확인할 수 있습니다.

<p align="center"><img src="/images/netlify/netlify-complete-deploy.png"></p>

빌드가 완료되면, 페이지 위에 <span class="num">7</span> "Preview deploy"라는 링크가 출력됩니다.
공개된 사이트를 확인해봅시다.
화면은 정적 사이트를 업로드 했을 때와 같으므로 생략하겠습니다.
한 번 설정한 후에는 연동한 GitHub 리포지토리에 Push할 때마다 차이를 확인하고 자동적으로 디플로이합니다.

## 사이트 제거하기

사이트를 제거하고 싶은 경우에는 "그림 2.3"의 "<span class="num">3</span> Site settings" 페이지를 열고, 아래에 있는 "Delete Site"를 누릅니다.

<code-caption>그림 2.5</code-caption>
<p align="center"><img src="/images/netlify/netlify-delete.png"></p>

## 서브 도메인 변경하기

디폴트로 랜덤하게 긴 URL이 설정되지만, 이는 사이트 이름을 변경해서 원하는 것으로 변경할 수 있습니다.
"그림 2.3"에 있는 <span class="num">4</span> Domain settings" 페이지를 열고, "Cutom Domain"의 "…"을 누른 뒤, "Edit site name"을 선택합니다.

<code-caption>그림 2.6</code-caption>
<p align="center"><img src="/images/netlify/netlify-rename1.png"></p>

원하는 서브 도메인으로 변경해서 사용하기 바랍니다.

<code-caption>그림 2.7</code-caption>
<p align="center"><img src="/images/netlify/netlify-rename2.png"></p>

이 문서에서 자세하게 설명하지는 않았지만, 독자 도메인을 사용할 수도 있습니다.

최근에는 고성능 호스팅 서비스와 추가적인 백엔드 서비스도 제공하고 있습니다.
이러한 서비스를 사용하면, Vue.js를 사용해서 만든 애플리케이션을 쉽게 웹에 공개할 수 있을 것입니다.

