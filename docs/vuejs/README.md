# 시작하기

## Vue
[Vue](https://kr.vuejs.org/index.html)는 사용자 인터페이스를 만들기 위한 프로그레시브 프레임워크다. 다른 단일형 프레임워크와 달리 Vue는 점진적으로 채택할 수 있도록 설계되어 있다고 한다. 사실 러닝 커브가 가장 낮고 다른 프레임워크와 비교해봤을 때 간편하게 만들 수 있을거 같아서 Vue 부터 스터디 하기로 결정했다.

## Getting Started
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
Vue.js는 단일 페이지 애플리케이션를 빠르게 구축할 수 있는 공식 CLI를 제공하는데 yarn 이용해서 설치 할 수 있다. yarn은
[NodeJS-시작하기](/nodejs/#yarn)에서 설치할 수 있다.
### Install
```sh
yarn global add @vue/cli
```
### Update
```sh
yarn global upgrade --latest @vue/cli
```