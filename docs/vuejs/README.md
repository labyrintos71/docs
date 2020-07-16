# 시작하기

## Vue
[Vue](https://kr.vuejs.org/index.html)는 사용자 인터페이스를 만들기 위한 프로그레시브 프레임워크다. 다른 단일형 프레임워크와 달리 Vue는 점진적으로 채택할 수 있도록 설계되어 있다고 한다. 사실 러닝 커브가 가장 낮고 다른 프레임워크와 비교해봤을 때 간편하게 만들 수 있을거 같아서 Vue 부터 스터디 하기로 결정했다.

## Install
아래 링크를 이용해서 사용해 볼 수 있지만, 필자는 vue cli를 권장한다. 
```html
<!-- 개발버전, 도움되는 콘솔 경고를 포함. -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```
또는:
```html
<!-- 상용버전, 속도와 용량이 최적화됨. -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

## Vue CLI
::: warning
VuePress는 [Node.js](https://nodejs.org/ko/) 버젼 8.9 이상 필요함.
:::  
Vue.js는 단일 페이지 애플리케이션를 빠르게 구축할 수 있는 공식 CLI이다. VueJS 문서는 전부 CLI 기반으로 진행하고 있기때문에 꼭 설치하기 바란다. 설치는 yarn 이용해서 할 수 있다. yarn이 없다면 [NodeJS-시작하기](/nodejs/#yarn)에서 설치할 수 있다.
### Install
```sh
yarn global add @vue/cli
```
### Update
```sh
yarn global upgrade --latest @vue/cli
```


## Vue CLI 로 프로젝트 만들기
Vue Cli 및 Vuetify와 함께 사용할 것 이므로 `vue create` 이후 `add vuetify`도 해준다.
옵션을 고를 때 manually로 가서 vuex와 router 추가하는걸 추천한다.
```sh
vue create [projectname]
cd [projectname]
vue add vuetify
```

프로젝트를 생성하고 `yarn serve`하면 http://localhost:8080 에서 확인해 볼 수 있다.
```sh
yarn serve
yarn build
```
