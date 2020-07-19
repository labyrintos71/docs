# 시작하기

## Go
[Go](https://golang.org/)언어는 구글에서 개발한 프로그래밍 언어이다. 공식 홈페이지에서는 아래와 같이 설명하고 있다.
:::tip Go
Go는 간결하고 신뢰성 있으며 효율적인 소프트웨어를 손쉽게 만들기 위한 오픈소스 프로그래밍 언어다.
:::
## Getting Started
Go는 먼저 SDK랑 IDE가 필요한데 IDE는 여러가지가 많지만 그중에서도 VSCode를 추천한다.
> SDK 다운로드 : [golang.org/dl](https://golang.org/dl/)  
IDE 다운로드 : [VSCode](https://code.visualstudio.com/Download)

sdk 를 설치하고 나서 아래 명령어 테스트 해보자. 설치하면 자동으로 환경변수에 등록된다.
```sh
go
go env
```
## Workspace Setting
Go workspace에는 bin, pkg, src 폴더들이 필요하기 때문에 workspace 폴더안에다가 만들어줘야 한다.  
이때 workspace 이름 및 경로는 원하는대로 해도 된다.
:::tip Workspace
bin : 소스파일 컴파일 후 운영체제별 실행 가능한 바이너리 파일이 저장되는 곳  
pkg : 프로젝트에 필요한 패키지가 컴파일 되어 라이브러리 파일이 저장되는 곳  
src : 프로젝트 및 소스 코드들 저장하는곳
:::
디렉토리 구조로 보면 아래와 같다.
```
Workspace
├─ bin
├─ pkg
└─ src
   ├─ Aproject
   └─ Bproject
      └─ main.go
```
이제 아까 `go env`에서 나왔던 GOPATH에 workspace경로를 등록해줄 차례인데,  
윈도우 검색에 `시스템 환경 변수 편집` -> `환경 변수` -> `사용자 변수` -> `GOPATH` 편집을 누르고 본인 workspace 경로로 맞춰준다. 다했다면 `go env`로 경로가 제대로 들어갔는지 확인해보자.
:::tip
GOPATH가 없다면 새로만들기로 만들어 준다.  
Go sdk를 기본 경로가 아니라 다른 경로에 깔았다면 GOROOT 경로도 sdk 경로로 맞춰야된다.
:::
## VSCode Setting  
1. 플러그인탭에 가서 `go`를 설치해준다.
2. `ctrl + shitf + p` -> `Go: Install/Update Tools`에서 전부다 체크후 설치
3. `ctrl + shitf + p` -> `Preferences: Open Settings (JSON)`에 아래 gopath 및 goroot를 경로에 맞게 넣어준다.

```json
{
    "go.useLanguageServer": true,
    "go.gopath": "C:\\Users\\abc\\go",
    "go.goroot": "C:\\go",
    "go.testFlags": ["-v"]
}
```

## Go Mod
Go modules는 `go 1.11`버젼 이후에 새로 추가된 의존성 관리 툴이고, 아래 명령어로 사용할 수 있다.
```go
//go 모듈을 생성한다. 프로젝트 루트 디렉토리에서 명령어를 칠경우 모듈 이름은 없어도 된다.
go mod init [module-name]
//버젼을 지정해서 모듈 추가한다
go get @
// 소스코드와 go.mod 파일을 비교해 의존성 정리를 한다. -v 옵션으로 자세한 정보를 볼 수 있다.
go mod tidy [-v]
//로컬에 설치되니 모듈의 해시 값과 go.sum을 비교해 모듈의 유효성을 검증한다.
go mod verify
```

## Project Generate
프로젝트 생성은 간단하다. 아까 만든 workspace/src에 프로젝트 폴더를 하나 만들고 폴더 안에서 아래 명령어를 입력한다.
```bash
go mod init
```
그후 main.go 를 만들고 아래 소스를 작성해보자.
```go
package main
 
import "fmt"
 
func main(){
    fmt.Println("Hello World")
}
```
만들었으면 아래 명령어로 확인해 볼 수 있다.
```sh
go build main.go
go run main.go
```

## Project build
```
GOOS=linux GOARCH=amd64 CGO_ENABLED=0  go build -o launcher *.go
```
zerovalue 
json tag