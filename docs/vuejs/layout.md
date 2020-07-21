# Vuetify layout

## 레이아웃 구현해보기
Vue로 실제 화면을 만드려면 어떻게 해야될까?
```html
<v-app>
  <v-navigation-drawer app>
    <!-- 네비게이션 드로워 -->
  </v-navigation-drawer>

  <v-app-bar app>
    <!-- 앱바 -->
  </v-app-bar>

  <!-- 메인 내용 -->
  <v-main>
    <!-- 컨테이너, fluid 는 가능한 최대 크기 사용 -->
    <v-container fluid>
      <!-- 라우터 뷰 -->
      <router-view/>
    </v-container>
  </v-main>
  
  <v-footer app>
    <!-- 푸터 -->
  </v-footer>
</v-app>
```
앞서 말한 기초에서는 위와 같은 보일러플레이트를 사용한다고 했다. 위 코드를 기초로 네비게이션 드로워를 포함한 UI를 만들어보자. 먼저 네비게이션 드로워를 만들어보자.  

## Drawer.vue
위에 보일러플레이트에 있던 네비게이션 드로워만 따로 컴포넌트로 만들었다. 드로워가 항상 펼쳐져있는걸 원하기 대문에 permanent 속성을 부여했다.
`Drawer.vue`
```html
<template>
    <!-- permanent 크기가 줄어도 없어지지 않음-->
  <v-navigation-drawer app permanent dark color="#3c3c3c">
  </v-navigation-drawer>
</template>
```
그다음에 내용물을 채워줄건데 닉네임, 이메일, 그리고 메뉴를 넣어볼거다.먼저 닉네임과 이메일 부터 채워주자. 닉네임과 이메일은 column을 이용할거라 v-layout에 column 속성을 선언해주고 이름과 메일을 표시할 v-flex를 선언해준다. px, text 속성등은 [vuetify](https://vuetifyjs.com/en/getting-started/quick-start/)에서 확인 가능하다.
```html
<v-layout column px-4 my-6>
  <v-flex text-h6 white--text>Nickname</v-flex>
  <v-flex text-subtitle-2 grey--text lighten-1>dummymail@naver.com</v-flex>
</v-layout>
```
아래 추가할 메뉴랑 구분가도록 구분자를 하나 넣어주자.
```html
<v-divider/>
```
그다음, 메뉴에 해당하는 리스트를 만들건데 리스트같은 컴포넌트들은 위 `vuetify`링크를 통해서 찾아보자. 모든 컴포넌트들을 외워두는것 보다 그때 그때 필요한 컴포넌트들이 생기면 해당 문서에가서 예제를 보고 따라 해보는게 제일 좋다.
```html
  <!-- mandatory 무조건 하나는 선택 되있음 -->
<v-list>
  <v-list-item-group v-model="item" color="#BB86fc" mandatory>
    <v-list-item class="listtile" v-for="(item, i) in items" :key="i" @click="go(item.link)">
      <v-list-item-content>
        <v-list-item-title v-text="item.text" class="text-body-2"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>
</v-list>
```
리스트 UI를 만들었으면 메뉴 데이터와 이어줘야 된다. 아래처럼 메뉴 이름, 링크를 데이터를 넣어주면 작업된 소스는 아래와 같다.
```html
<template>
  <v-navigation-drawer app permanent dark color="#3c3c3c">
    <v-layout column px-4 my-6>
      <v-flex text-h6 white--text>Nickname</v-flex>
      <v-flex text-subtitle-2 grey--text lighten-1>dummymail@naver.com</v-flex>
    </v-layout>

    <v-divider/>

    <!-- mandatory 무조건 하나는 선택 되있음 -->
    <v-list>
      <v-list-item-group v-model="item" color="#BB86fc" mandatory>
        <v-list-item class="listtile" v-for="(item, i) in items" :key="i" @click="go(item.link)">
          <v-list-item-content>
            <v-list-item-title v-text="item.text" class="text-body-2"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: "A", icon: "mdi-folder", link: "/" },
        { text: "B", icon: "mdi-codepen", link: "/about" },
        { text: "C", icon: "mdi-bank", link: "/user/4" },
        { text: "D", icon: "mdi-copyright", link: "/abc" }
      ]
    };
  },
  methods: {
    go(link) {
      this.$router.push(link);
    }
  }
};
</script>
```


## App.vue
사실 핵심은 드로워, 앱만 있으면 된다 나머지 더미페이지들은 아래처럼 빈템플릿만 있어도 예제를 보기엔 충분하다.
```js
<template>
  <div>Not Found</div>
</template>
```

footer는 사용하지 않으므로 뺐고 아까 구현한 Drawer를 선언한 후에 원래 `<v-navigation-drawer app>`태그자리에 넣어주기만 하면 된다.
`App.vue`
```html
<template>
  <v-app>
    <Drawer />
    
    <v-app-bar app dark/>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Index",
  components: {
    Drawer: () => import("./components/Drawer")
  }
};
</script>
```
## router/index.js
`router/index.js`에 가서 위에 items에 넣은 링크에 맞게 라우팅을 잡아주면 된다.  
라우팅에 관한 내용은 [Vue Router](/vuejs/router.html#시작하기)에서 확인할수있다.
```js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/user/:id',
    component: User
  },
  {
    path: '*', component: () => import("../views/404")
  }
]
```


<!-- 
```html
    <v-list nav dense>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

      items: [
        { text: "My Files", icon: "mdi-folder" },
        { text: "Shared with me", icon: "mdi-account-multiple" },
        { text: "Starred", icon: "mdi-star" },
        { text: "Recent", icon: "mdi-history" },
        { text: "Offline", icon: "mdi-check-circle" },
        { text: "Uploads", icon: "mdi-upload" },
        { text: "Backups", icon: "mdi-cloud-upload" }
      ],
```
  https://blog.minamiland.com/376
  https://chansbro.github.io/vue/vuetify_tutorial1
  http://blog.weirdx.io/post/60376
  https://vuetifyjs.com/ko/styles/spacing/

-->