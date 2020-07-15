# 시작하기

## Electron + Vuetify
메테리얼 UI에 기반한 Vuetify 프레임워크를 사용하면 아무래도 UI 구성이 쉬울것 같아서 Vuetify를 택했다. vue cli를 이용해 설치 할 것이므로 vue cli가 설치되어있어야 한다.  

프로젝트 생성 순서는 다음과 같다.
```sh
vue create [projectname]
cd [projectname]
vue add vuetify
vue add electron-builder
```

프로젝트를 생성했으면, 아래 명령어로 실행, 혹은 빌드 할 수 있다..
```sh
yarn electron:serve
yarn electron:build
```
