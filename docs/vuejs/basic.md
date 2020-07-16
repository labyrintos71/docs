# Vue 기초
프로젝트 생성은 [Vue Cli로 프로젝트 만들기](/vuejs/#vue-cli-로-프로젝트-만들기)를 참고하면 된다.
## Component
Vue에 있어서 컴포넌트는 가장 중요한 개념이라고 생각된다. 기초에서 보면 정확히 이해가 안갈수도 있겠지만 대충 이런 개념이구나 라고만 알아도 좋다.
![img](https://kr.vuejs.org/images/components.png)
:::tip Vue 공식 설명
컴포넌트는 Vue의 가장 강력한 기능 중 하나입니다. 기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화하는 데 도움이 됩니다. 상위 수준에서 컴포넌트는 Vue의 컴파일러에 의해 동작이 추가된 사용자 지정 엘리먼트입니다. 경우에 따라 특별한 is 속성으로 확장 된 원시 HTML 엘리먼트로 나타날 수도 있습니다.
:::
쉽게 말해서 위 이미지를 기준으로, 헤더와 사이드바, 콘첸츠 영역.. 으로 나뉘고 또 콘첸츠 영역은 포스트 여러개로 나뉜다. 이 작은 하나의 영역이 하나의 컴포넌트라고 생각하면 쉽다. 즉, 컴포넌트와 컴포넌트가 모여 새로운 컴포넌트를 만들게 되는 트리 형태라고 생각하면 된다.

## Vuetify
[Vuetify](https://vuetifyjs.com/ko/)는 Vue.js를 위해 개발된 디자인 프레임워크이다. Material Design Spec을 준수하며 다양한 컴포넌트들을 만들어져 있으므로 필요한 컴포넌트를 가져다 쓰면 쉽게 Material한 서비스를 만들수 있다. 문서에서 전반적으로 사용하며 이 강의도 Vuetify 기준으로 작성 될 것이므로 없으면 꼭 깔도록 하자. [Vue Cli](/vuejs/#vue-cli)

## Grid System

http://blog.weirdx.io/post/60376
https://blog.minamiland.com/376
https://vuetifyjs.com/ko/components/grids/
http://designbase.co.kr/webdesign-4/
http://styleguide.co.kr/content/resolution-grid/gridsystem.php