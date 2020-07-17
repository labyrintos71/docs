# Vue 기초
프로젝트 생성은 [Vue Cli로 프로젝트 만들기](/vuejs/#vue-cli-로-프로젝트-만들기)를 참고하면 된다.
## Component
Vue에 있어서 컴포넌트는 가장 중요한 개념이라고 생각된다. 기초에서 보면 정확히 이해가 안갈수도 있겠지만 지금 단계에서는 이런 개념이구나 라는 정도면 충분하다.
![img](https://kr.vuejs.org/images/components.png)
:::tip Vue 공식 설명
컴포넌트는 Vue의 가장 강력한 기능 중 하나입니다. 기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화하는 데 도움이 됩니다. 상위 수준에서 컴포넌트는 Vue의 컴파일러에 의해 동작이 추가된 사용자 지정 엘리먼트입니다. 경우에 따라 특별한 is 속성으로 확장 된 원시 HTML 엘리먼트로 나타날 수도 있습니다.
:::
쉽게 말해서 위 이미지를 기준으로, 헤더와 사이드바, 콘첸츠 영역.. 으로 나뉘고 또 콘첸츠 영역은 포스트 여러개로 나뉜다. 이 작은 하나의 영역이 하나의 컴포넌트라고 생각하면 쉽다. 즉, 컴포넌트와 컴포넌트가 모여 새로운 컴포넌트를 만들게 되는 트리 형태라고 생각하면 된다.

## Single File Components
싱글 파일 컴포넌트는 화면의 특정 영역에 대한 HTML, CSS, JS를 한 파일에서 관리하는 방법이고, 현재 Vue에서 사용하고 있다. 
.vue 확장자로 끝나는 파일들은 아래와 같은 구조를 가진다.
```html
<template>
    <!--화면에 표시할 요소들을 정의함, HTML + 뷰 데이터 바인딩-->
</template>

<script>
    // 뷰 컴포넌트에 대한 내용, script가 들어감 
</script>

<style>
    /* CSS 들어가는 부분 */
</style>
```

## Vuetify
[Vuetify](https://vuetifyjs.com/ko/)는 Vue.js를 위해 개발된 디자인 프레임워크이다. Material Design Spec을 준수하며 다양한 컴포넌트들로 만들어져 있으므로 필요한 컴포넌트를 가져다 쓰면 쉽게 Material한 서비스를 만들수 있다. 문서에서 전반적으로 사용하며 이 강의도 Vuetify 기준으로 작성 될 것이므로 없으면 꼭 깔도록 하자. [Vue Cli](/vuejs/#vue-cli)

## Grid System
그리드 시스템이란, 디자인의 레이아웃에 규칙을 부여하는 수단이라고 하는데 쉽게 말해서 그리드 위에서 디자인 한다고 생각하면 된다. 그리드 시스템은 크게 4가지로 볼 수 있는데 아래 그림을 참고하면 된다.
![img](https://github.com/labyrintos71/docs/blob/gh-pages/assets/img/gridsystem.png?raw=true)

### ① Margins
초록색 부분에 해당하며, 컨테이너기준 좌우 여백을 말한다.
### ② Columns
컨텐츠의 최소 단위다. 컨텐츠를 만들때 컬럼 2개 사이즈, 4개 사이즈, .., 이런식으로 디자인을 한다. 보통 12개의 컬럼을 조합하여 12단식으로 많이 사용하는데 이는 2, 3, 4, 6의 배수 이기 때문에 반응형에서 쪼개기 좋기때문이라고 한다.
### ③ Gutters
컬럼과 컬럼 사이의 공간이다. 거터는 고정값으로 잡는게 좋고 일반적으로 20, 24, 30을 많이 사용한다고 한다. 해상도별 대응은 고정값을 유지하되, breakpoints를 기준으로 줄이는게 좋다.
### ④ (②+③)Container
컬럼과 거터로 이루어진 영역이다.실제로 컨텐츠가 표시되는 영역 전체를 나타낸다.
:::tip
디자인의 방법론이지만 Vuetify는 반응형을 고려하여 만들어졌기 때문에 그리드 시스템 12단 형식을 사용하고 있다. 관련된 정보는 [vuetifyjs.com/ko/components/grids/](https://vuetifyjs.com/ko/components/grids/)에서 확인 가능하다
:::  
## Vuetify Boilerplate
Vuetify를 사용하여 앱을 만들때 기본적으로 사용하는 보일러 플레이트다. Vuetify의 기본적인 요소인 네비게이션 드로워, 앱바, 메인, 푸터가 있으며 필요 없는 부분은 지워서 사용하면 된다.
```html
<v-app>
  <v-navigation-drawer app>
    <!-- -->
  </v-navigation-drawer>

  <v-app-bar app>
    <!-- -->
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
      <router-view/>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
```