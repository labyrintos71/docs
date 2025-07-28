# 시작하기

## Tradingview Charting Library
트레이딩뷰 차트 라이브러리는 먼저 [tradingview](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/)에 들어가서 간단한 신청서(?)를 내야한다. 이를 위해선 사업자도 필요한데 까다로운 인증절차 라던가, 인증 받은 후 API 와 인증한 문서 사이에 필요한 키같은건 없는것 같다. 인증을 받게 되면 private repository가 공유된다.  

공유 받게 되면 [exmaples](https://github.com/tradingview/charting-library-examples)에서 차트 라이브러리 예제 폴더를 확인할수있다.  

트레이딩뷰 라이브러리를 서버 데이터와 연동하기 위해서 크게 두가지로 나눌수 있는데    

:::tip JS API
프론트 단에 붙어서 UDF와 통신을 하며 차트에 datafeed 역할을 한다.  
이부분에서 거래소랑 붙여서 프론트만으로 굴리는 서버도 가능
[TradingView jsapi Binance](https://github.com/marcius-studio/tradingview-jsapi-binance)
:::
:::tip UDF
JS API와 연동을 위한 통신 규격, 정의된 함수에 맞춰서 해당하는 기능을 구현해야 한다. 
:::

[바이낸스 UDF 예제](https://github.com/bergusman/tradingview-udf-binance-node)

[UDF 문서](https://github.com/tradingview/charting_library/wiki/UDF)
