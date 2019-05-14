const path = require('path')
const crcodeLoader = require.resolve('./lib/crcode-loader.js')

module.exports = {
  base: '/jpub-vue/',
  locales: {
    '/': {
      lang: 'ko',
      title: '고양이도 할 수 있는 Vue.js',
      description: '지원 페이지'
    }
  },
  head: [
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:description', content: '고양이도 할 수 있는 Vue.js サポート페이지' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '고양이도 할 수 있는 Vue.js' }],
    ['meta', { property: 'og:title', content: '고양이도 할 수 있는 Vue.js' }],
    ['meta', { property: 'og:image', content: 'https://cr-vue.mio3io.com/summary.png' }],
    ['link', { rel: 'icon', href: '/jpub-vue/images/icon.png' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '코드＆동작 데모', link: '/guide/' },
      { text: '추가 예제', link: '/examples/' },
      { text: '튜토리얼', link: '/tutorials/' },
    ],

    sidebar: {
      '/guide/': [
        '',
        'preface.md',
        'chapter1.md',
        'chapter2.md',
        'chapter3.md',
        'chapter4.md',
        'chapter5.md',
        'chapter6.md',
        'chapter7.md',
        'chapter8.md',
        'chapter9.md'
      ],
      '/examples/': [
        '',
        'tab.md',
        'modal.md',
        'loading.md',
        'delay-transition.md',
        'text-animation.md',
        //'fixed-header.md',
        //'svg-graph.md',
        'canvas.md',
        //'slot-scope.md',
        //'nexted-route',
      ],
      '/tutorials/': [
        '',
        'todo.md',
        'firebase.md',
        'netlify.md',
      ]
    },
    repo: 'rintiantta/jpub-vue',
    repoLabel: 'GitHub',
    docsRepo: 'rintiantta/jpub-vue',
    docsDir: 'docs',
    editLinks: false,
    editLinkText: '수정하기'
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@docs', path.resolve(__dirname, '../'))
    config.module
      .rule('crcode').pre().test(/\.md$/).use('crcode').loader(crcodeLoader)
  }
}
