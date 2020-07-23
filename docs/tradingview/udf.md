# UDF-Reference

### What is UDF
UDF는 간단하고 효율적인 방식으로 차트라이브러리 JS API 어댑터에 전달할수있도록 설계된 HTTP 기반 서버 이다.

### 문서
[UDF 문서](https://github.com/tradingview/charting_library/wiki/UDF)

## API-Reference
[[toc]]

## GET /config
Data feed configuration data

### Request
`/config`

### Response
| Key           | Type          | Desc  |
| :------------- |:-------------| :-----|
| exchanges     | [String value, String name, String desc] | 차트에서 지원하는 거래소|
| symbols_types | [String value, String name] | 심볼 종류(BTC, KRW, USDT) |
| supported_resolutions | ["1", "3","15","60","120",...] | 지원하는 타임프레임 |
| supports_search | boolean | 트뷰 왼쪽위 심볼 검색 지원 유무 |
| supports_group_request | boolean | supports_search를 지원안항 경우 true 여야함 |
| supports_marks | boolean | mark 지원 여부 |
| supports_timescale_marks | boolean | 타임스케일 marks 지원 여부 |
| supports_time | boolean | /time 구현 여부(unix time) |
```js
//Response
{
   "exchanges":[
      {
         "value":"BINANCE",
         "name":"Binance",
         "desc":"Binance Exchange"
      }
   ],
   "symbols_types":[
      {
         "value":"crypto",
         "name":"Cryptocurrency"
      }
   ],
   "supported_resolutions":[
      "1",
      "3",
      "5",
      "15",
      "30",
      "60",
      "120",
      "240",
      "360",
      "480",
      "720",
      "1D",
      "3D",
      "1W",
      "1M"
   ],
   "supports_search":true,
   "supports_group_request":false,
   "supports_marks":false,
   "supports_timescale_marks":false,
   "supports_time":true
}
```

```js
GET /symbol_info?group=<group_name>
GET /symbols?symbol=<symbol>
GET /search?query=<query>&type=<type>&exchange=<exchange>&limit=<limit>
GET /history?symbol=<ticker_name>&from=<unix_timestamp>&to=<unix_timestamp>&resolution=<resolution>
GET /marks?symbol=<ticker_name>&from=<unix_timestamp>&to=<unix_timestamp>&resolution=<resolution>
GET /timescale_marks?symbol=<ticker_name>&from=<unix_timestamp>&to=<unix_timestamp>&resolution=<resolution>
GET /time
GET /quotes?symbols=<ticker_name_1>,<ticker_name_2>,...,<ticker_name_n>
```
## GET /symbol_info
Symbol group request  
supports_group_request: true && supports_search: false
## GET /symbols
Symbol resolve  
supports_group_request: false && supports_search: true

### Request
`/symbols?symbol=<symbol>`
| Key    | Type   | Desc                       |
| :----- |:------ | :------------------------- |
| symbol | String | 심볼 이름 (BTCUSDT, ETHBTC) |
Example: GET /symbols?symbol=AAL, GET /symbols?symbol=NYSE:MSFT
### Response
| Key           | Type          | Desc  |
| :------------- |:-------------| :-----|
| exchanges     | [String value, String name, String desc] | 차트에서 지원하는 거래소|
| symbols_types | [String value, String name] | 심볼 종류(BTC, KRW, USDT) |
```js
{
   "symbol":"ETHBTC",
   "name":"ETHBTC",
   "ticker":"ETHBTC",
   "description":"ETH / BTC",
   "type":"crypto",
   "session":"24x7",
   "full_name":"ETHBTC",
   "exchange":"BINANCE",
   "listed_exchange":"BINANCE",
   "currency_code":"BTC",
   "timezone":"UTC",
   "minmovement":1,
   "minmov":1,
   "minmovement2":0,
   "minmov2":0,
   "pricescale":1000000,
   "supported_resolutions":[
      "1",
      "3",
      "5",
      "15",
      "30",
      "60",
      "120",
      "240",
      "360",
      "480",
      "720",
      "1D",
      "3D",
      "1W",
      "1M"
   ],
   "has_intraday":true,
   "has_daily":true,
   "has_weekly_and_monthly":true,
   "data_status":"streaming"
}
```
## GET /search
## GET /history
## GET /marks
## GET /timescale_marks
## GET /time
## GET /quotes
