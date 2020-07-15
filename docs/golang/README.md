# 시작하기

## Go
[Go](https://golang.org/)언어는 구글에서 개발한 프로그래밍 언어이다. 공식 홈페이지에서는 아래와 같이 설명하고 있다.
```
Go는 간결하고 신뢰성 있으며 효율적인 소프트웨어를 손쉽게 만들기 위한 오픈소스 프로그래밍 언어다.
```
## Getting Started

### Install
[https://golang.org/dl/](https://golang.org/dl/)에서 다운 받을 수 있다.

vscode go 설치
ctrl + shitf + p
go install update

vscode settings
```json
{
    "go.useLanguageServer": true,
    "go.gopath": "C:\\Users\\labyr\\go",
    "go.goroot": "C:\\go",
    "go.testFlags": ["-v"]
}
```
zerovalue 
json tag

고 모듈 의존성 해결
```
go mod tidy
```


```
GOOS=linux GOARCH=amd64 CGO_ENABLED=0  go build -o launcher *.go
```