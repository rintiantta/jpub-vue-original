---
sidebarDepth: 2
title: 머릿말
---

# 머릿말

## Vue.js는 어떤 아이인가요?

<page-info page="3"></page-info>

일단 Vue.js를 아주 조금만 체험해봅시다.

```html
<!DOCTYPE html>
<html>
<body>
<div id="app">
  <h1>{{ message }}</h1>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.13"></script>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js!'
    }
  })
</script>
</body>
</html>
```

이 HTML을 적당한 폴더 안에 파일로 만들고, 브라우저에서 실행하면 곧바로 동작합니다.
