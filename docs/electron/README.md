# 시작하기

## Electron + Vuetify
메테리얼 UI에 기반한 Vuetify 프레임워크를 사용하면 아무래도 UI 구성이 쉬울것 같아서 Vuetify를 택했다.  
vue cli를 이용해 설치 할 것이므로 vue cli가 설치되어있어야 한다.
```sh
vue create [projectname]
cd [projectname]
vue add vuetify
vue add electron-builder

//아래 명령어를 통해 실행 해 볼수있다.
yarn electron:serve
```