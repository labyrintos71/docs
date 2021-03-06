const { description } = require('../../package.json')

module.exports = {
  base: '/docs/',
  title: 'Labyrintos71\'s Docs',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    editLinks: false,
    lastUpdated: false,
    nav: [
      {
        text: 'Kotlin',
        link: '/kotlin/',
      },
      {
        text: 'Android',
        link: '/android/'
      },
      {
        text: 'Flutter',
        link: '/flutter/'
      },
      {
        text: 'NodeJS',
        link: '/nodejs/'
      },
      {
        text: 'VueJS',
        link: '/vuejs/'
      },
      {
        text: 'Electron',
        link: '/electron/'
      },
      {
        text: 'Golang',
        link: '/golang/'
      },
      {
        text: 'Github',
        link: 'https://github.com/labyrintos71/docs'
      }
    ],
    sidebar: [
      // {
      //   title: 'Group 1', 
      //   //path: '/guide/', 
      //   collapsable: false,
      //   children: [
      //     '/guide/',
      //     '/guide/using-vue',
      //   ]
      // },
      {
        title: 'Kotlin',
       // collapsable: false,
        children: [
          '/kotlin/',
          '/kotlin/variable',
          '/kotlin/ifwhen',
          '/kotlin/classobject',
          '/kotlin/function',
          '/kotlin/extensionfunction',
          '/kotlin/delegation',
          '/kotlin/selenium',
        ]
      }, {
        title: 'Coroutine',
       // collapsable: false,
        children: [
          '/coroutine/',
          '/coroutine/coroutine_concept',
          '/coroutine/coroutine_basic1',
          '/coroutine/coroutine_basic2',
        ]
      },
      {
        title: 'Android',
      //  collapsable: false,
        children: [
          '/android/',
          '/android/permission',
        ]
      },
      {
        title: 'Flutter',
       // collapsable: false,
        children: [
          '/flutter/',
        ]
      },
      {
        title: 'NodeJS',
       // collapsable: false,
        children: [
          '/nodejs/',
        ]
      },
      {
        title: 'VueJS',
      //  collapsable: false,
        children: [
          '/vuejs/',
          '/vuejs/basic',
          '/vuejs/layout',
          '/vuejs/property',
          '/vuejs/router',
          '/vuejs/vuex',
          '/vuejs/vuepress',
        ]
      },
      {
        title: 'Electron',
       // collapsable: false,
        children: [
          '/electron/',
          '/electron/default_setting',
        ]
      },
      {
        title: 'Golang',
       // collapsable: false,
        children: [
          '/golang/',
          '/golang/echo',
          '/golang/gorilla',
          '/golang/gopg',
        ]
      },
      {
        title: 'Tradingview',
        collapsable: false,
        children: [
          '/tradingview/',
          '/tradingview/udf',
        ]
      }
    ]
    // sidebar: {

    //   '/guide/': [
    //     {
    //       title: 'Guidess',
    //       collapsable: false,
    //       children: [
    //         '',
    //         'using-vue',
    //       ]
    //     },
    //   ],
    //   '/javascript/': [
    //     {
    //       title: 'Guide',
    //       collapsable: false,
    //       children: [
    //         '',
    //       ]
    //     }
    //   ],
    // }
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'vuepress-plugin-smooth-scroll'
  ]
}
