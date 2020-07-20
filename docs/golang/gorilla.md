# Gorilla 를 이용한 WebSocket 연결(Client)

## Gorilla
[Gorilla](https://www.gorillatoolkit.org/)는 고언어에서 사용할 수 있는 webtoolkit 이다. 고릴라에는 여러 기능들이 있지만 그중에 websocket을 이용하여 업비트 실시간 시세를 받아오는 예제를 구현해보자.

## 프로젝트 생성
```go
go mod init
go get github.com/gorilla/websocket
```

## 업비트 API 연동하기
[Websocket을 이용한 업비트 시세 확인하기](https://docs.upbit.com/docs/upbit-quotation-websocket) 업비트 공식 문서를 보면 실시간 체결 데이터에 대한 예제를 아래와 같이 제공하고 있다.
```bash
$ telsocket -url wss://api.upbit.com/websocket/v1
Connected!
[{"ticket":"test"},{"type":"ticker","codes":["KRW-BTC"]}]
{"market":"KRW-BTC",..."acc_trade_volume_24h":6448.96200341}
{"market":"KRW-BTC",..."acc_trade_volume_24h":6448.96200341}
...
```
문서를 봐도 나오겠지만 위에 예시를 보면
1. wss 연결 (init)
2. 원하는 티커 json 전송 (write)
3. 데이터 받기 (read)  

순으로 구현하면 될거같다.

구현할 기능을 확인했으니 먼저 main.go를 만들고 그안에 웹소켓과 연결할 socket 구조체를 만들고 기본틀을 만들어보자.
```go
// 커넥션을 담고 있을 구조체
type socket struct {
	conn *websocket.Conn
}
//웹소켓을 연결하고 오류가 있으면 종료, 성공하면 티커를 보내고 데이터를 받는다.
func (sc *socket) run() {
	if err := sc.init(); err != nil {
		fmt.Println(err.Error())
		return
	}
	sc.write([{"ticket":"test"},{"type":"ticker","codes":["KRW-BTC"]}])
	sc.read()

}

func main() {
	sc := new(socket)
	sc.run()
}
```

이제 여기서 하나씩 내용물을 구현해 나가면된다. 먼저 init인데 웹소켓 연결은 아래처럼 하면 된다.
```go
func (sc *socket) init() error {
	payload := url.URL{Scheme: "wss", Host: "api.upbit.com", Path: "/websocket/v1"}
	conn, _, err := websocket.DefaultDialer.Dial(payload.String(), nil)
	if err != nil {
		fmt.Println(err.Error())
		return err
	}
	sc.conn = conn
	return nil
}
```
ticker를 전송하는 부분이다. `WriteMessage`를 이용해서 보낼 수 있는데 `[]byte`로 보내므로 `[]byte('data')` 이런식으로 데이터를 전송하면 된다.
```go
func (sc *socket) write(params []byte) {
	fmt.Println(string(params))
	err := sc.conn.WriteMessage(websocket.TextMessage, params)
	if err != nil {
		fmt.Println(err.Error())
		return

	}
}
```
데이터를 받는부분이다. 먼저 받을 데이터들을 구조체로 만들어줄건데, `json tag`를 이용하면 필드 이름을 바꿀수있다.
```go
type Tradedata struct {
	Code           string  `json:"code"`
	AskBid         string  `json:"ask_bid"`
	TradePrice     float64 `json:"trade_price"`
	TradeVolume    float64 `json:"trade_volume"`
	SequentialID   int64   `json:"sequential_id"`
	Timestamp      int64   `json:"timestamp"`
	TradeTimestamp int64   `json:"trade_timestamp"`
	StreamType     string  `json:"stream_type"`
}
```
데이터를 계속 받아오므로 때문에 for 를 이용해서 계속 메세지를 읽어오고 읽어온 데이터는 `json.Unmarshal`를 사용해 JSON형식으로 바꿔준다.
```go
func (sc *socket) read() {
	defer func() {
		sc.conn.Close()
	}()
	for {
		_, res, err := sc.conn.ReadMessage()
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		data := new(Tradedata)
		if err := json.Unmarshal(res, data); err != nil {
			fmt.Println(err.Error())
			return
        }
        // 받은 데이터를 확인해볼수있다.
		fmt.Println(data)
	}
}
```
## Connection 관리
위에서 만들은 예제로 켜놓다 보면 중간에 lost connection이 뜨면서 정상적으로 작동 안하는 경우가 생긴다. 이는 업비트 서버에서 120초간 데이터가 수/발신 되지 않으면 연결을 끊어버리기 때문인데 이를 방지하는 방법으로 [WebSocket PING/PONG Frmae](https://tools.ietf.org/html/rfc6455#section-5.5.2)를 제시하고 있다. 위에 작성한 소스코드에 PING/PONG을 넣어보자.

먼저 필요한 상수들을 정의해준다. 공식문서에는 120초 기준으로 써있는데, 실제로는 60초 기준으로 끊어지고 있어서 pongWait를 60초로 정의했다.
```go
const (
	pongWait = 60 * time.Second
	pingPeriod = (pongWait * 9) / 10
	payload = `[{"ticket":"test"},{"type":"trade","codes":["KRW-MANA"]}]`
)
```
다음은 write 부분에 ping 보내는 부분을 추가해야한다. pingPeriod마다 Ping을 보내줘야 해야하는데 ticker를 사용하면 이를 편하게 구현할 수 있다.
```go
func (sc *socket) write(params []byte) {
    ticker := time.NewTicker(pingPeriod)
    defer func() {
        ticker.stop()
		sc.conn.Close()
		log.Println("CLOSE")
	}()
	fmt.Println(string(params))
	err := sc.conn.WriteMessage(websocket.TextMessage, params)
	if err != nil {
		fmt.Println(err.Error())
		return
    }
    
	for range ticker.C {
		if err := sc.conn.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
			return
		}
		log.Println("ping")
    }
    // 채널을 사용한다면 아래처럼도 가능하다
	//for {
	//	select {
	//	case <-ticker.C:
	//		if err := sc.conn.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
	//			return
	//		}
	//		log.Println("ping")
	//	}
	//}
}
```
read 에는 PongHandler를 구현해준다.
```go
func (sc *socket) read() {
	defer func() {
		sc.conn.Close()
		log.Println("CLOSE")
    }()
    
	sc.conn.SetPongHandler(func(string) error {
		sc.conn.SetReadDeadline(time.Now().Add(pongWait))
		log.Println("pong")
		return nil
    })
    
	for {
		_, res, err := sc.conn.ReadMessage()
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		data := new(Tradedata)
		if err := json.Unmarshal(res, data); err != nil {
			fmt.Println(err.Error())
			return
		}

		testAction(data)
	}
}
```
다 되었다면 마지막으로 sc.write 앞에 `go`를 붙여준다. 이는 고루틴 수식어인데 내가 쓴 문서중 코루틴을 참고하면 이해가 빠를거다. sc.write에서 핑을 위해서 무한 반복문을 돌려놨기에 `go`를 붙이지 않으면 read를 영영 실행하지 않을거다. 이부분은 따로 나중에 고루틴에서 상세하게 다루려고 한다.
```go
func (sc *socket) run() {
	if err := sc.init(); err != nil {
		fmt.Println(err.Error())
		return
	}
	go sc.write(upbitWssInfo)
	sc.read()
}
```
<!-- 
## 최종 소스코드
`main.go`
package main

import (
	"encoding/json"
	"log"
	"net/url"
	"time"

	"github.com/gorilla/websocket"
)

const (
	pongWait   = 60 * time.Second
	pingPeriod = (pongWait * 9) / 10
	payload    = `[{"ticket":"test"},{"type":"trade","codes":["KRW-MANA"]}]`
)

//Tradedata 거래 데이터 BID 매수 ASK 매도
type Tradedata struct {
	Code           string  `json:"code"`
	AskBid         string  `json:"ask_bid"`
	TradePrice     float64 `json:"trade_price"`
	TradeVolume    float64 `json:"trade_volume"`
	SequentialID   int64   `json:"sequential_id"`
	Timestamp      int64   `json:"timestamp"`
	TradeTimestamp int64   `json:"trade_timestamp"`
	StreamType     string  `json:"stream_type"`
}

type socket struct {
	conn *websocket.Conn
}

func (sc *socket) init() error {
	payload := url.URL{Scheme: "wss", Host: "api.upbit.com", Path: "/websocket/v1"}
	conn, _, err := websocket.DefaultDialer.Dial(payload.String(), nil)
	if err != nil {
		log.Println(err.Error())
		return err
	}
	sc.conn = conn
	return nil
}

func (sc *socket) write() {
	ticker := time.NewTicker(pingPeriod)
    defer func() {
        ticker.stop()
		sc.conn.Close()
		log.Println("CLOSE")
	}()
	log.Println(payload)
	err := sc.conn.WriteMessage(websocket.TextMessage, []byte(payload))
	if err != nil {
		log.Println(err.Error())
		return
	}
	for range ticker.C {
		if err := sc.conn.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
			return
		}
		log.Println("ping")
	}
}

func (sc *socket) read() {
	defer func() {
		sc.conn.Close()
		log.Println("CLOSE")
	}()
	sc.conn.SetPongHandler(func(string) error {
		sc.conn.SetReadDeadline(time.Now().Add(pongWait))
		log.Println("pong")
		return nil
	})
	for {
		_, res, err := sc.conn.ReadMessage()
		if err != nil {
			log.Println(err.Error())
			return
		}
		data := new(Tradedata)
		if err := json.Unmarshal(res, data); err != nil {
			log.Println(err.Error())
			return
		}

		testAction(data)
	}
}
func (sc *socket) run() {
	if err := sc.init(); err != nil {
		log.Println(err.Error())
		return
	}
	go sc.write()
	sc.read()
}

func testAction(data *Tradedata) {
	log.Println(data)
}

func main() {
	sc := new(socket)
	sc.run()
}
-->