(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{410:function(s,t,a){"use strict";a.r(t);var r=a(45),e=Object(r.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"vuepress-github"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress-github"}},[s._v("#")]),s._v(" VuePress + Github")]),s._v(" "),a("h2",{attrs:{id:"vuepress"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress"}},[s._v("#")]),s._v(" VuePress")]),s._v(" "),a("p",[s._v("VuePress 는 Vue 기반으로 만들어진 정적 사이트 생성 엔진이며 자세한 내용은 "),a("a",{attrs:{href:"https://vuepress.vuejs.org/",target:"_blank",rel:"noopener noreferrer"}},[s._v("vuepress.vuejs.org"),a("OutboundLink")],1),s._v(" 에서 확인할수 있다."),a("br"),s._v("\n여태까지는 "),a("a",{attrs:{href:"https://jekyllrb-ko.github.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Jekyll"),a("OutboundLink")],1),s._v("를 이용해서 깃허브 블로그를 만들었는데, 뷰 공부하는겸 새로 바꾸기로 했다.")]),s._v(" "),a("h2",{attrs:{id:"getting-started"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getting-started"}},[s._v("#")]),s._v(" Getting Started")]),s._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[s._v("WARNING")]),s._v(" "),a("p",[s._v("VuePress는 "),a("a",{attrs:{href:"https://nodejs.org/ko/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Node.js"),a("OutboundLink")],1),s._v(" 버젼 8.6 이상 필요함.")])]),s._v(" "),a("h3",{attrs:{id:"vuepress-설치"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress-설치"}},[s._v("#")]),s._v(" Vuepress 설치")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" create vuepress "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("directoryName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])])]),a("p",[s._v("메타데이터 질문중 repo 부분에는 repository url을 넣으면 된다.")]),s._v(" "),a("h3",{attrs:{id:"package-json에-script-추가"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#package-json에-script-추가"}},[s._v("#")]),s._v(" package.json에 script 추가")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"docs:dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress dev docs"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"docs:build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress build docs"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("h3",{attrs:{id:"config-js에-base-추가"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#config-js에-base-추가"}},[s._v("#")]),s._v(" config.js에 base 추가")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    title"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Title'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    description"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'description'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    base"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/repo name/'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("여기까지 세팅을 했으면, 아래 명령어로 로컬에서 확인할 수 있다.")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" docs:dev\n")])])]),a("h2",{attrs:{id:"github-연동하기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-연동하기"}},[s._v("#")]),s._v(" Github 연동하기")]),s._v(" "),a("h3",{attrs:{id:"repository-생성"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#repository-생성"}},[s._v("#")]),s._v(" repository 생성")]),s._v(" "),a("p",[s._v("먼저 repository를 만들어야 하는데, 깃허브 블로그 주소를"),a("br"),s._v("\nusername.github.io 으로 사용하고 싶으면 repository 이름을 username.github.io 로 만들고,"),a("br"),s._v("\nusername.github.io/repo_name 으로 사용하고 싶으면 repo_name 으로 만들면 된다.")]),s._v(" "),a("h3",{attrs:{id:"branch-분기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#branch-분기"}},[s._v("#")]),s._v(" branch 분기")]),s._v(" "),a("p",[s._v("vuepress는 사이트 생성 엔진이기 때문에 이 프로젝트를 렌더링 하는게 아니라 빌드한 결과물을 렌더링 해줘야 한다. 그렇다고 repository 두개를 가지고 하기엔 효율성이 떨어지니 gh-pages 브랜치를 만들어서 빌드한 결과물은 gh-pages에 올려서 master는 현 프로젝트, gh-pages는 렌더링할 웹을 관리하는 방식으로 진행하려 한다.")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[s._v("Settings - GitHub Pages - Source 에 가서 gh-pages로 바꿔주도록 하자")])]),s._v(" "),a("h3",{attrs:{id:"업로드-쉘-만들기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#업로드-쉘-만들기"}},[s._v("#")]),s._v(" 업로드 쉘 만들기")]),s._v(" "),a("p",[s._v("매번 브렌치를 왔다갔다 하면 업로드 하기에는 효율적이지 않으므로 아래 deploy.sh 를 만들어 주자.\n하이라이팅 들어가있는 부분을 본인 repository의 branch로 설정해주자.")]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/usr/bin/env sh")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# abort on errors")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" -e\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# build")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run docs:build\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# navigate into the build output directory")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" docs/.vuepress/dist\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# if you are deploying to a custom domain")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# echo 'www.example.com' > CNAME")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" init\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" -A\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'deploy'")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# if you are deploying to https://<USERNAME>.github.io")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# if you are deploying to https://<USERNAME>.github.io/<REPO>")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push -f https://github.com/labyrintos71/docs.git master:gh-pages\n\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" -\n")])])]),a("p",[s._v("쉘파일을 실행 하거나, 혹은")]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" docs:build\n")])])]),a("p",[s._v("해서 나온 dist 폴더를 깃에 올리면 정상적으로 작동하는것을 확인할 수 있다.")])])}),[],!1,null,null,null);t.default=e.exports}}]);