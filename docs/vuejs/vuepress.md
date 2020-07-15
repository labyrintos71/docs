# VuePress + Github

## VuePress

VuePress 는 Vue 기반으로 만들어진 정적 사이트 생성 엔진이며 자세한 내용은 [vuepress.vuejs.org](https://vuepress.vuejs.org/) 에서 확인해볼수 있다.  
여태까지는 [Jekyll](https://jekyllrb-ko.github.io/)를 이용해서 깃허브 블로그를 만들었는데, 뷰 공부하는겸 새로 바꾸기로 했다.  

## Getting Started
::: warning
VuePress는 [Node.js](https://nodejs.org/ko/) 버젼 8.6 이상 필요함.
:::  

### Vuepress 설치

```bash
yarn create vuepress [directoryName]
```
메타데이터 질문중 repo 부분에는 repository url을 넣으면 된다. 

### package.json에 script 추가
``` js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

### config.js에 base 추가
``` js
module.exports = {
    title: 'Title',
    description: 'description',
    base: '/repo name/'
}
```
여기까지 세팅을 했으면, 아래 명령어로 로컬에서 확인 해 볼 수 있다.

```bash
yarn
yarn docs:dev
```  

## Github 연동하기  

### repository 생성
먼저 repository를 만들어야 하는데, 깃허브 블로그 주소를  
username.github.io 으로 사용하고 싶으면 repository 이름을 username.github.io 로 만들고,  
username.github.io/repo_name 으로 사용하고 싶으면 repo_name 으로 만들면 된다.  

### branch 분기
vuepress는 사이트 생성 엔진이기 때문에 이 프로젝트를 렌더링 하는게 아니라 빌드한 결과물을 렌더링 해줘야 한다. 그렇다고 repository 두개를 가지고 하기엔 효율성이 떨어지니 gh-pages 브랜치를 만들어서 빌드한 결과물은 gh-pages에 올려서 master는 현 프로젝트, gh-pages는 렌더링할 웹을 관리하는 방식으로 진행하려 한다.
:::tip
Settings - GitHub Pages - Source 에 가서 gh-pages로 바꿔주도록 하자
:::  

### 업로드 쉘 만들기
매번 브렌치를 왔다갔다 하면 업로드 하기에는 효율적이지 않으므로 아래 deploy.sh 를 만들어 주자. 
 하이라이팅 들어가있는 부분을 본인 repository의 branch로 설정해주자.
```sh{25}
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git push -f https://github.com/labyrintos71/docs.git master:gh-pages

cd -
```

쉘파일을 실행 하거나, 혹은 
```sh
yarn docs:build
```
해서 나온 dist 폴더를 깃에 올리면 정상적으로 작동하는것을 확인할 수 있다.