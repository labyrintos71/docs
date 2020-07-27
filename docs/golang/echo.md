# echo를 이용한 RestfulAPI 구현

## echo
[echo](https://echo.labstack.com/)는 Go의 웹 프레임 워크다. 공식 홈페이지에서는 아래와 같이 소개하고 있으며 이를 통해 REST API 예제를 구현해보자.
:::tip echo
High performance, extensible, minimalist Go web framework
:::


## 프로젝트 생성
```go
go mod init
go get -u github.com/labstack/echo/...
```
아래는 간단한 hello world 출력하는 예제다.
`main.go`
```go
package main

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	//에코 인스턴스 생성
	e := echo.New()
	//미들웨어 선언
	e.Use(middleware.Logger())  //http 요청 기록
	e.Use(middleware.Recover()) //패닉 복구
	//라우팅
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello World!")
	})
	// http://localhost:8081/
	e.Logger.Fatal(e.Start(":8081"))

}
```
아래처럼 따로 함수로 빼서 써도 된다.
```go
func hellowrold(c echo.Context) error {
	return c.String(http.StatusOK, "Hello World!")
}
```
```go
e.GET("/", hellowrold)
```
## Get
### Parameter
```go
func getUser(c echo.Context) error {
    id := c.Param("id")
    return c.String(http.StatusOK, id)
}
```
```go
e.GET("/users/:id", getUser)
```
`localhost:8081/users/123` 로 접속하면 123이 출력되는걸 확인할수있다.

### QueryParameters
```go
func listUser(c echo.Context) error {
	page := c.QueryParam("page")
	return c.String(http.StatusOK, "page: "+page)
}
```
```go
e.GET("/users", listUser)
```
`localhost:8081/users?page=2` 로 접속하면 2가 출력되는걸 확인할수있다.

## POST
```go
func login(c echo.Context) error {
	id := c.FormValue("id")
	pw := c.FormValue("pw")
	return c.String(http.StatusOK, "id:"+id+", pw:"+pw)
}
```
```go
e.POST("/login", login)
```
POST 요청이기 때문에 PostMan으로 확인할수있다.
```
id:admin, pw:1234
```


<!-- 
//Format
// `{"time":"${time_rfc3339_nano}","id":"${id}","remote_ip":"${remote_ip}",` +
// `"host":"${host}","method":"${method}","uri":"${uri}","user_agent":"${user_agent}",` +
// `"status":${status},"error":"${error}","latency":${latency},"latency_human":"${latency_human}"` +
// `,"bytes_in":${bytes_in},"bytes_out":${bytes_out}}` + "\n",

//example
//{"time":"2020-07-20T16:14:03.231745+09:00","id":"","remote_ip":"::1","host":"localhost:8081",
// "method":"GET","uri":"/","user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
// "status":200,"error":"","latency":0,"latency_human":"0s","bytes_in":0,"bytes_out":12}



//클린 고 서비스
https://jaehue.github.io/post/resilent-go-service/

// 고 헤더 미들웨어로 넣어주기
https://sir.kr/so_golang/7


https://jacking75.github.io/go_webFramework_echo/
https://m.blog.naver.com/PostView.nhn?blogId=kwonsukmin&logNo=221291451827&proxyReferer=https:%2F%2Fwww.google.com%2F



https://golang.hotexamples.com/examples/github.com.labstack.echo/Echo/Favicon/golang-echo-favicon-method-examples.html






package main

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func hellowrold(c echo.Context) error {
	return c.String(http.StatusOK, "Hello World!")
}

func getUser(c echo.Context) error {
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}

func listUser(c echo.Context) error {
	page := c.QueryParam("page")
	return c.String(http.StatusOK, "page: "+page)
}
func login(c echo.Context) error {
	id := c.FormValue("id")
	pw := c.FormValue("pw")
	return c.String(http.StatusOK, "id:"+id+", pw:"+pw)
}
func main() {
	//에코 인스턴스 생성
	e := echo.New()
	//미들웨어 선언
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${method}[${status}] endpoint : ${uri}, ip: ${remote_ip}\n",
	}))
	e.Use(middleware.Recover())
	//라우팅
	e.GET("/", hellowrold)
	e.GET("/users", listUser)
	e.GET("/users/:id", getUser)
	e.POST("/login", login)

	// http://localhost:8081/
	e.Logger.Fatal(e.Start(":8081"))
}
 -->