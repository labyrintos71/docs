# Vue Router
[Vue Router](https://router.vuejs.org/kr/)는 Vue.js의 공식 라우터이다. 라우팅이라고 하면 웹페이지 간의 이동방법을 의미하는데 뷰 라우터는 이 라우팅 기능을 지원해주는 라이브러리라고 생각하면 된다.
## 시작하기
[Vue Cli로 프로젝트 만들기](/vuejs/#vue-cli-로-프로젝트-만들기)를 보고 만들었으면 이미 vue router가 추가 되어있을것이다. 하지만 기존 프로젝트에 적용하고 싶거나 cdn으로 이용하고 싶으면 아래 로 설치할수 있다.
```bash
yarn add vue-router
```
```html
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
```

### 이동할 컴포넌트 만들기
이동했을 때 보여주는 컴포넌트 2개를 만들어준다.  
`/view/a.vue`
```html
<template>
    <div>
        a page
    </div>
</template>

```
`/view/b.vue`
```html
<template>
    <div>
        b page
    </div>
</template>
```
### 라우팅 주소 연결하기
프로젝트 생성할 때 `vue router`를추가했으면 `/route/index.js`가 생성되어있으므로 routes 안에 연결한 데이터를 넣어주면 된다.
`/route/index.js`
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
  // 컴포넌트랑 라우팅할 URL을 연결할 데이터를 넣는부분.
  // 위에서 부터 아래로 가기 때문에 순서를 맞춰서 넣어야 한다.
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/a',
    name: 'A',
    component: () => import('../views/a.vue')
  },
  // path에 *을 넣어주면 위에 해당하는 링크가 없을 경우 .
   {
    path: '*', 
    component: () => import("../views/404")
  }
]

const router = new VueRouter({
  // URL 주소에는 #을 사용하는 방법과 HTML5에서 #을 제거하는 history모드가 있는데 
  // #을 제거하고싶으면 mode를 history로 설정해주자. 
  mode: 'history',
  routes
})

export default router
```

### Template 에서 호출하기
`/App.vue`
```html
<router-link to="/">main</router-link>
<router-link to="/about">news</router-link>
<router-view></router-view>
```
### Script 에서 호출하기
`/App.vue`
```js
export default {
  methods: {
    go(link) {
      this.$router.push(link);
    },
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
};
//https://router.vuejs.org/kr/guide/
```