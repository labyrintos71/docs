package main

import (
	"encoding/json"
	"fmt"
	"net/url"

	"github.com/gorilla/websocket"
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

var upbitWssInfo = []byte(`[{"ticket":"labytrintos71"},{"type":"trade","codes":["KRW-BTC","BTC-BCH"]}]`)

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

func (sc *socket) write(params []byte) {
	fmt.Println(string(params))
	err := sc.conn.WriteMessage(websocket.TextMessage, params)
	if err != nil {
		fmt.Println(err.Error())
		return

	}
}

func (sc *socket) read() {
	defer func() {
		sc.conn.Close()

		fmt.Println("RELOAD")
		sc.init()
		sc.write(upbitWssInfo)
		sc.read()
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
		testAction(data)
	}

}

func testAction(data *Tradedata) {
	fmt.Println(data)
}

func main() {
	sc := new(socket)

	if err := sc.init(); err != nil {
		fmt.Println(err.Error())
		return
	}

	sc.write(upbitWssInfo)
	sc.read()

}
