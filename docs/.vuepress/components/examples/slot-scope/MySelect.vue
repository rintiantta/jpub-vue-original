<template>
  <div
    @click.stop="open=!open"
    @blur.stop="open=false"
    @keydown.up.down.esc.enter.prevent.stop="onKeydown"
    :class="['my-select', open ? 'open' : '' ]" tabindex="0">
    <!-- 現在の選択値表示 -->
    <div class="mu-select-current my-select-item">
      <slot v-bind="current">
        <span v-text="current.label"/>
      </slot>
    </div>
    <!-- オプションのリスト -->
    <transition>
      <ul class="my-select-options" v-show="open">
        <!-- .stop はルートタグの클릭イベントを行わないようにするため -->
        <li v-for="item in options"
          @click.stop="onSelect(item.value)"
          :class="['my-select-item', isSelected(item) ? 'selected' : '' ]"
          :key="item.value">
          <!-- ↓ slot-scope -->
          <slot v-bind="item">
            <span v-text="item.label"/>
          </slot>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    value: String
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    current() {
      const current = this.options.find(el => el.value === this.value)
      if (current) {
        return current
      } else {
        return { value: '', label: '선택해 주세요.' }
      }
    }
  },
  methods: {
    isSelected(item) {
      return this.current === item ? true : false
    },
    onSelect(value) {
      this.$emit('input', value)
      this.open = false
    },
    onKeydown(event) {
      // キー入力の振り分け
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          const go = event.key === 'ArrowDown' ? +1 : -1
          const index = this.options.findIndex(el => el.value === this.value)
          const nextIndex = index + go
          if (nextIndex > -1 && nextIndex < this.options.length) {
            const next = this.options[nextIndex]
            this.$emit('input', next.value)
          }
          break
        case 'Enter':
          this.open = this.open ? false : true
          break
        case 'Escape':
          if (!this.open) {
            this.$el.blur()
          } else {
            this.open = false
          }
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-select {
  position: relative;
  box-sizing: border-box;
  user-select: none;
  outline: none;
}
.mu-select-current.my-select-item {
  box-sizing: border-box;
  border: 1px solid #ccc;
  line-height: 30px;
  transition: border-color 0.4s;
  .my-select:focus & {
    border-color: #000;
  }
  &::after {
    position: absolute;
    content: '▼';
    font-size: 10px;
    top: 0;
    right: 8px;
    transition: transform 0.4s;
    .my-select.open & {
      transform: scaleY(-1);
    }
  }
}
.my-select-options {
  position: absolute;
  z-index: 2;
  box-sizing: border-box;
  list-style: none;
  margin: -1px 0 0 0;
  padding: 0;
  background: #fff;
  border: 1px solid #000;
  border-top: 1px dashed #ccc;
  width: 100%;
  overflow-y: auto;
  max-height: calc(32px * 5 + 2px);
  line-height: 32px;
}
.my-select-item {
  padding: 0 8px;
  transition: background-color .2s;
  &:hover {
    background: #f5f5f5;
  }
  &.selected {
    background: #e1f1f1;
  }
}

.v-enter-active {
  transition: opacity .25s ease 0s, transform .25s ease 0s;
}
.v-leave-active {
  transition: opacity .25s ease .1s, transform .25s ease .1s;
}
.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
