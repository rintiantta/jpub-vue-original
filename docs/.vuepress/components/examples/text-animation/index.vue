<template>
  <div class="example">
    <h3>TextAnime1 <button @click="anime1=!anime1">변경하기</button></h3>
    <TextAnime1 v-if="anime1"/>
    <p>SCSS로 애니메이션 지연 주기</p>
    <hr>
    <h3>TextAnime2 <button @click="anime2=!anime2">변경하기</button></h3>
    <TextAnime2 v-if="anime2"/>
    <p>바인딩으로 애니메이션 지연 주기</p>
    <hr>
    <h3>TextAnime3</h3>
    <p><label><input type="checkbox" v-model="autoplay"> 5초마다 자동으로 문자 변경하기</label></p>
    <TextAnime3 :autoplay="autoplay"/>
    <p><code>transition-group</code> の <code>v-move</code> 를 사용했습니다.</p>
  </div>
</template>

<script>
import TextAnime1 from './TextAnime1'
import TextAnime2 from './TextAnime2'
import TextAnime3 from './TextAnime3'
export default {
  components: {
    TextAnime1,
    TextAnime2,
    TextAnime3
  },
  data() {
    return {
      anime1: true,
      anime2: true,
      autoplay: true
    }
  }
}
</script>
