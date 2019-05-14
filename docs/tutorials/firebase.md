---
sidebarDepth: 2
title: Vue.js＋Firebase로 로그인 상태 확인하기
---

# 간단하게 로그인 상태 확인 만들어보기!

이번 튜토리얼에서는 SNS 인증과 Firebase를 사용해서 인증을 하는 간단한 채팅 애플리케이션을 만들어보겠습니다.
Vue.js 이외에 다음과 같은 서비스를 사용합니다.

- **Firebase** 사용자 관리와 실시간 데이터베이스를 목적으로 사용합니다.
- **Twitter** 애플리케이션 인증을 목적으로 사용합니다.

Google 계정과 Twitter 계정이 있어야 이번 내용을 진행할 수 있습니다.
추가적으로 Twitter 애플리케이션을 기능을 사용하려면, Twitter 계정에 전화번호가 등록되어 있어야 합니다. 

## Firebase란?

Google이 운영하고 있는 소셜 로그인, 실시간 데이터베이스를 제공하는 서비스입니다.
인증과 데이터 관리를 위한 백앤드 시스템을 따로 구현하지 않아도 되므로, 프론트앤드 개발에 전념할 수 있습니다.

일정 용량과 전송량까지는 무료로 사용할 수 있습니다.
다양한 기능이 제공되는데요. 우리는 "Authentication"와 "Database" 기능만 사용하겠습니다.
실시간 데이터베이스는 데이터에 변경 사항이 있을 경우, 자동으로 통신이 이루어지는 특이한 형태의 구조를 갖고 있습니다.

## Firebase 프로젝트 설정하기

일단 Firebase 프로젝트와 Twitter 인증 전용 애플리케이션을 설정해봅시다.

- [Firebase 메인 페이지](https://firebase.google.com/?hl=ko)

### 프로젝트 추가하기

- [Firebase 콘솔](https://console.firebase.google.com/?hl=ko)

<code-caption>그림 1.1</code-caption>
<p align="center"><img src="/images/firebase/firebase1.png"></p>

콘솔에서 프로젝트를 추가합니다.
프로젝트 이름에는 원하는 이름을 붙여주세요.

### 인증 방법 선택하기

<code-caption>그림 1.2</code-caption>
<p align="center"><img src="/images/firebase/firebase2.png"></p>

프로젝트 메인 페이지 왼쪽에 있는 "Authentication"을 열고, "로그인 방법" 탭을 선택해서, 프로퍼티 목록의 "Twitter"를 선택합니다.

### Twitter 인증 설정하기

<code-caption>그림 1.3</code-caption>
<p align="center"><img src="/images/firebase/firebase3.png"></p>

오른쪽 위에 있는 "활성화 하기"를 설정합니다.

<span class="num">1</span>과 <span class="num">2</span>의 입력 양식에는 이후에 만드는 Twitter 애플리케이션의 "[API 키 확인하기](#api-키-확인하기)"(그림 1.6)에 출력되는 키를 입력해주세요.

추가적으로 <span class="num">3</span>에 출력되는 URL도 이후에 만드는 Twitter 애플리케이션 설정에 사용합니다. 따라서 현재 화면을 끄지 말고 그대로 두기 바랍니다.

## Twitter 애플리케이션 설정하기

이어서 Twitter를 사용해서 인증 전용 애플리케이션을 만들어봅시다.
다음 URL을 브라우저의 다른 탭에서 열고, 화면 중앙에 있는 "Create New App"을 클릭합니다.

- [Twitter Application Management](https://apps.twitter.com/)

### Twitter 애플리케이션 만들기

애플리케이션 생성 페이지에서 "애플리케이션 이름", "설명", "Website"를 설정하고, <span class="num">4</span>의 "CallbackURL"에는 [Twitter 인증 설정하기](#twitter-인증-설정하기)의 "그림 1.3"<span class="num">3</span>에 지정한 URL을 지정합니다.

<code-caption>그림 1.4</code-caption>
<p align="center"><img src="/images/firebase/firebase4.png"></p>

"Website"는 애플리케이션을 실제로 운영할 때 설명 페이지가 있는 URL을 입력하는 곳입니다. 하지만 다른 사이트를 지정해두고, 이후에 변경할 수 있습니다.

### 권한 설정하기

생성 후 화면의 "Pwemissions" 탭을 선택하고, Access를 "Read only"로 변경합니다.
보안을 위해서, 불필요한 권한을 갖지 않게 설정하는 것이 좋습니다.
"Update Setting" 버튼으로 설정을 저장합니다.

<code-caption>그림 1.5</code-caption>
<p align="center"><img src="/images/firebase/firebase5.png"></p>

### API 키 확인하기

같은 화면의 "Keys and Access Tokens" 탭을 선택하고, <span class="num">5</span> "Consumer Key(API Key)"와 <span class="num">6</span> "Consumer Secret (API Secret)"에 출력되는 키를 [Twitter 인증 설정하기](#twitter-인증-설정하기)(그림 1.3)의 Firebase 인증 설정에 붙여 넣어 주세요.

<code-caption>그림 1.6</code-caption>
<p align="center"><img src="/images/firebase/firebase6.png"></p>

설정을 저장해서, Twitter 애플리케이션 설정을 완료합니다.

## Firebase 규칙 정의하기

Firebase 데이터베이스의 접근 규칙을 정의합니다.

<code-caption>그림 1.7</code-caption>
<p align="center"><img src="/images/firebase/firebase-rules01.png"></p>

"Lock Mode"와 "Test Mode"를 선택할 수 있는데요. 일단 "Lock Mode"를 선택하도록 하겠습니다.
선택하고 진행하면, 다음과 같은 화면이 출력됩니다.

<code-caption>그림 1.8</code-caption>
<p align="center"><img src="/images/firebase/firebase-rules02.png"></p>

에디터 부분에 규칙을 추가합니다.
다음 규칙은

- 디폴트로는 누구도 읽을 수 없음
- 다만 인증된 사용자라면, `message` 속성 읽어 들이기 가능
- 다만 인증된 사용자라면, `message` 속성에 쓰기 가능

라는 규칙입니다.


```json
{
  "rules": {
    // 디폴트로 읽기와 쓰기를 모두 거부
    ".read": false,
    ".write": false,
    "message": {
      ".read": "auth != null", // 인증된 사용자라면 읽기 가능
      ".write": "auth != null" // 인증된 사용자라면 쓰기 가능
    }
  }
}
```

`messsage` 속성의 `.read`를 `"auth != null"`가 아니라 `true`로 설정하면, 읽기는 인증을 하지 않아도 된다라는 규칙이 됩니다. 어떤 것을 사용해도 괜찮습니다(현재 그림은 `true`로 설정해서 누구나 읽을 수 있게 한 것입니다).

<code-caption>그림 1.9</code-caption>
<p align="center"><img src="/images/firebase/firebase-rules03.png"></p>

간단한 애플리케이션이므로, 채팅방 기능을 제외하겠습니다. `message`라는 프로퍼티를 정의하고, 사용자 이름과 프로필 사진 URL도 전달할 수 있게 합니다.

## Vue.js에서 Firebase 사용하기

Vue.js에서 Firebase를 사용하는 애플리케이션을 만들어봅시다.

### Firebase 초기화하기

`firebase` 모듈을 설치하고, `main.js`에서 읽어 들입니다.

```bash
npm install firebase
```

<code-caption>src/main.js</code-caption>

```js
import firebase from 'firebase'
```

Firebase의 "Authentication" 페이지 오른쪽 위에 있는 "웹 설정"을 클릭하면, 다음과 같은 코드가 출력됩니다.

<code-caption>그림 1.10</code-caption>
<p align="center"><img src="/images/firebase/firebase-websetting.png"></p>

스크립트 부분만 `main.js`에 붙여 넣어주세요.

<code-caption>src/main.js</code-caption>
```js
import firebase from 'firebase'
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIza....",
  authDomain: "YOUR_APP.firebaseapp.com",
  databaseURL: "https://YOUR_APP.firebaseio.com",
  projectId: "YOUR_APP",
  storageBucket: "YOUR_APP.appspot.com",
  messagingSenderId: "123456789"
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

"apiKey"등이 직접 소스 코드에 포함되게 되지만, 클러이언트 사이드 애플리케이션에서는 원래 이처럼 사용하는 형태로 만들어진 것입니다.
대신 "**그림 1.2**"의 "로그인 방법" 탭의 아래에 있는 "[설명 추가]"에서 화이트리스트를 설정합니다.

### 인증 처리

Firebase를 사용해서 인증 처리를 구현하는 것은 굉장히 간단합니다.
일단 firebase 모듈의 사용 방법을 간단하게 설명하겠습니다.

#### 로그인 기능

첫 로그인 때만 Twitter 애플리케이션 연동 확인 화면이 출력됩니다.
다음 예는 인증 화면을 팝업 윈도로 출력하는 예입니다.

<code-caption>Twitter 인증으로 로그인하기</code-caption>
```js
const provider = new firebase.auth.TwitterAuthProvider()
firebase.auth().signInWithPopup(provider)
```

#### 로그아웃 기능

<code-caption>로그아웃 기능</code-caption>
```js
firebase.auth().signOut()
```

Firebase 로그인 상태 확인 방법은 확인할 때마다 호출하는 것이 아닙니다. 로그인 상태가 변경되면, 미리 등록한 콜백 함수가 자동적으로 호출되는 형태입니다.
`created` 훅 등에서 한 번만 옵저버를 등록해두면, 실시간으로 상태가 변경됩니다.

#### 로그아웃 상태를 확인하는 방법

<code-caption>로그아웃 상태를 확인하는 방법</code-caption>
```js
// 옵저버 등록
firebase.auth().onAuthStateChanged(user => {
  // 로그인 상태일 경우 user를 사용할 수 있음
  this.user = user ? user : {}
})
```

이 API를 사용해서 컴포넌트를 만듭니다.

### 채팅 컴포넌트 정의하기

입력한 "메시지", 사용자 정보의 "이름"과 "프로필 이미지"를 Firebase의 `message` 객체에 추가합니다.

현재 샘플은 줄바꿈을 `<br>` 태그로 변경해주는 [vue-nl2br](https://github.com/inouetakuya/vue-nl2br)라는 컴포넌트도 사용하고 있습니다.

```bash
npm install vue-nl2br
```

<code-caption>src/App.vue</code-caption>
```html
<template>
  <div id="app">
    <header class="header">
      <h1>Chat</h1>
      <!-- 로그인 상태에서는 입력 양식과 로그아웃 버튼 출력 -->
      <div v-if="user.uid" key="login">
        [{{ user.displayName }}]
        <button type="button" @click="doLogout">로그아웃</button>
      </div>
      <!-- 로그인을 안 했을 때에는 로그인 버튼 출력 -->
      <div v-else key="logout">
        <button type="button" @click="doLogin">로그인</button>
      </div>
    </header>

    <!--　Firebase 에서 읽어 들인 리스트 출력(트랜지션도 있습니다)　-->
    <transition-group name="chat" tag="div" class="list content">
      <section v-for="{ key, name, image, message } in chat" :key="key" class="item">
        <div class="item-image"><img :src="image" width="40" height="40"></div>
        <div class="item-detail">
          <div class="item-name">{{ name }}</div>
          <div class="item-message">
            <nl2br tag="div" :text="message"/>
          </div>
        </div>
      </section>
    </transition-group>
  
    <!-- 입력 양식 -->
    <form action="" @submit.prevent="doSend" class="form">
      <textarea
        v-model="input"
        :disabled="!user.uid"
        @keydown.enter.exact.prevent="doSend"></textarea>
      <button type="submit" :disabled="!user.uid" class="send-button">Send</button>
    </form>
  </div>
</template>

<script>
// firebase 모듈
import firebase from 'firebase'
// 줄바꿈을 <br> 태그로 변경해주는 모듈
import Nl2br from 'vue-nl2br'
export default {
  components: { Nl2br },
  data() {
    return {
      user: {},  // 사용자 정보
      chat: [],  // 추출한 메시지를 넣을 배열
      input: ''  // 입력한 메시지
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      const ref_message = firebase.database().ref('message')
      if (user) {
        this.chat = []
        // message 에 변경이 있을 때 실행할 핸들러 등록하기
        ref_message.limitToLast(10).on('child_added', this.childAdded)
      } else {
        // message 에 변경이 있을 때 실행할 핸들러 제거하기
        ref_message.limitToLast(10).off('child_added', this.childAdded)
      }
    })
  },
  methods: {
    // 로그인처리
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    // 로그아웃처리
    doLogout() {
      firebase.auth().signOut()
    },
    // 스크롤 위치를 가장 위로 이동
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight)
      })
    },
    // 받은 메시지를 chat에 추가
    // 데이터베이스에 새로운 요소가 추가되면, 호출됨
    childAdded(snap) {
      const message = snap.val()
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message
      })
      this.scrollBottom()
    },
    doSend() {
      if (this.user.uid && this.input.length) {
        // firebase 에 메시지 추가하기
        firebase.database().ref('message').push({
          message: this.input,
          name: this.user.displayName,
          image: this.user.photoURL
        }, () => {
          this.input = '' // 입력 양식의 내용 지우기
        })
      }
    }
  }
}
</script>
```

내용이 길기 때문에 별도의 파일 링크를 달아 두겠습니다. [app.css](https://github.com/mio3io/cr-vue/blob/master/codes/firebase/app.css)

<code-caption>채팅 화면</code-caption>
<p align="center"><img src="/images/firebase/firebase-image.png"></p>

Firebase와 Vue.js를 사용하면, 이정도의 코드로 실시간으로 변경이 일어나는 채팅 애플리케이션의 프로토타입을 만들 수 있습니다.

## 참고

컴포넌트를 전혀 나누지 않고 있으므로, VueCLI를 사용하는 의미 자체가 없기는 합니다. 실제로 구현할 때는 메시지 아이템, 입력 양식, 메뉴 등을 분리하고 Vuex 등을 사용해보면 좋을 것 입니다 (๑'ᴗ'๑).

Firebase를 사용할 때 가장 힘든 것은 규칙 정의입니다(개인적인 생각입니다). 어쨌거나 추가적으로 채팅 입장 비밀번호 기능 등을 구현해봐도 재미있을 것입니다.

보다 자세한 내용은 [Firebase 문서](https://firebase.google.com/docs/?hl=ko)를 참고해주세요.
