const { description } = require('../../package')

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
        collapsable: false,
        children: [
          '/kotlin/',
        ]
      },
      {
        title: 'Android',
        collapsable: false,
        children: [
          '/android/',
          '/android/permission',
        ]
      },
      {
        title: 'Flutter',
        collapsable: false,
        children: [
          '/flutter/',
        ]
      },
      {
        title: 'NodeJS',
        collapsable: false,
        children: [
          '/nodejs/',
        ]
      },
      {
        title: 'VueJS',
        collapsable: false,
        children: [
          '/vuejs/',
          '/vuejs/basic',
          '/vuejs/vuepress',
        ]
      },
      {
        title: 'Electron',
        collapsable: false,
        children: [
          '/electron/',
          '/electron/default_setting',
        ]
      },
      {
        title: 'Golang',
        collapsable: false,
        children: [
          '/golang/',
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
