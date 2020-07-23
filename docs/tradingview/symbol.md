## name
It's the name of the symbol. It is a string that your users will be able to see. Also, it will be used for data requests if you are not using tickers.

## ticker
It's an unique identifier for this particular symbol in your symbology. If you specify this property then its value will be used for all data requests for this symbol. ticker will be treated the same as name if not specified explicitly.

## description
Description of a symbol. Will be displayed in the chart legend for this symbol.

## type
Optional type of the instrument.

Possible types are:

stock
index
forex
futures
bitcoin
expression
spread
cfd
or another string value.
## session
Trading hours for this symbol. See the Trading Sessions article to learn more details.

## holidays
List of holidays for this symbol. These dates are not displayed on the chart. It's a string in the following format:

YYYYMMDD[,YYYYMMDD].

Example: 20181105,20181107,20181112.

## corrections
List of corrections for this symbol. Corrections are days with specific trading sessions. They can be applied to holidays as well. It's a string in the following format:

SESSION:YYYYMMDD[,YYYYMMDD][;SESSION:YYYYMMDD[,YYYYMMDD]].

Where SESSION has the same format as Trading Sessions.

Example: 1900F4-2350F4,1000-1845:20181113;1000-1400:20181114.

## exchange, listed_exchange
Both of these fields are expected to have a short name of the exchange where this symbol is traded.

The name will be displayed in the chart legend for this symbol.

## timezone
거래소에서 사용하는 표준 시간대. olsondb  포맷으로 사용한다.  

지원 가능한 타임존중 쓸만한건 아래와 같다.  

Etc/UTC
Asia/Seoul

## format
이것도 뭔소린지 모르겠다.
Format of displaying labels on the price scale:

price - formats decimal or fractional numbers based on minmov, pricescale, minmove2 and fractional values
volume - formats decimal numbers in thousands, millions or billions
## minmov, pricescale, minmove2, fractional
이 네 가지 키는 일반 가격과 소수 가격으로 사용될 때 다른 의미를 갖는다. 뭔소린지 잘 모르겠다.
바이낸스 기준으로
```js
   "minmovement":1,
   "minmov":1,
   "minmovement2":0,
   "minmov2":0, 
```
아래 처럼 놓고 pricescale을 소숫점으로 맞추면 될거같다.  
BTCUSDT == 100,  
ETHBTC == 1000000
### Common prices
MinimalPossiblePriceChange = minmov / pricescale

minmov is the amount of price precision steps for 1 tick. For example, since the tick size for U.S. equities is 0.01, minmov is 1. But the price of the E-mini S&P futures contract moves upward or downward by 0.25 increments, so the minmov is 25.
pricescale defines the number of decimal places. It is 10^number-of-decimal-places. If a price is displayed as 1.01, pricescale is 100; If it is displayed as 1.005, pricescale is 1000.
minmove2 for common prices is 0 or it can be skipped.
fractional for common prices is false or it can be skipped.
Example:

Typical stock with 0.01 price increment: minmov = 1, pricescale = 100, minmove2 = 0.

### Fractional prices
Fractional prices are displayed 2 different forms: 1) xx'yy (for example, 133'21) 2) xx'yy'zz (for example, 133'21'5).

xx is an integer part.
minmov/pricescale is a Fraction.
minmove2 is used in form 2.
fractional is true
Example:

If minmov = 1, pricescale = 128 and minmove2 = 4:

119'16'0 represents 119 + 16/32
119'16'2 represents 119 + 16.25/32
119'16'5 represents 119 + 16.5/32
119'16'7 represents 119 + 16.75/32
More examples:

ZBM2014 (T-Bond) with 1/32: minmov = 1, pricescale = 32, minmove2 = 0
ZCM2014 (Corn) with 2/8: minmov = 2, pricescale = 8, minmove2 = 0
ZFM2014 (5 year t-note) with 1/4 of 1/32: minmov = 1, pricescale = 128, minmove2 = 4

## has_intraday [Default: false]
뭔소린지 모르겠다. 기본 설정으로 놨두자.
Boolean value showing whether the symbol includes intraday (minutes) historical data.
If it's false then all buttons for intraday resolutions will be disabled for this particular symbol.
If it is set to true, all resolutions that are supplied directly by the datafeed must be provided in intraday_multipliers array.

## supported_resolutions
지원하는 타임 프레임을 의미한다. 아래처럼 넣으면 된다.
   "supported_resolutions":[
      "1",
      "3",
      "5",
      "15",
      "30",
      "60",
      ...
      "480",
      "720",
      "1D",
      "3D",
      "1W",
      "1M"
   ],

## intraday_multipliers [Default: []]
뭔소린지 모르겠다. 그냥 가만히 두자.
Array of resolutions (in minutes) supported directly by the data feed. Each such resolution may be passed to, and should be implemented by, getBars. The default of [] means that the data feed supports aggregating by any number of minutes.

If the data feed only supports certain minute resolutions but not the requested resolution, getBars will be called (repeatedly if needed) with a higher resolution as a parameter, in order to build the requested resolution.

For example, if the data feed only supports minute resolution, set intraday_multipliers to ['1'].

When the user wants to see 5-minute data, getBars will be called with the resolution set to 1 until the library builds all the 5-minute resolution by itself.

## has_seconds [Default: false]
과거 데이터가 초단위 데이터를 가지고 있는지에 대한 여부를 나타낸다.  
false 일 경우 seconds 관련된 모든 기능은 비활성화 된다.  
true 일 경우 seconds_muliplers의 에 있는 모든 타임프레임을 지원해야 한다.

## seconds_multipliers [Default: []]
datafeed가 제공하는 캔들의 배열을 나타낸다.  
만약에 datafeed가 ["1S", "5S", "15S"]를 지원하지만 일부 심볼에 대해 1초막대가 있는경우 [1]로 설정해야 한다. 이렇게 하면 라이브러리가 알아서 5초랑 15초를 만들거다.

## has_daily [Default: false]
datafeed가 일봉을 주는지에 대해 나타낸다. 만약 false면 1분봉을 사용해서 만들어낸다.

## has_weekly_and_monthly [Default: false]
datafeed가 주봉, 월봉을 주는지에 대해 나타낸다. 만약 false 이면 일봉을 취합해서 주봉, 월봉을 만들게 된다.

## has_empty_bars [Default: false]
차트에서 데이터가 비어있을 경우 empty 캔들을 생성할건가에 대한 여부를 나타낸다. true 라면 비어있는 값을 그 전 값으로 채우게 된다.

## force_session_rebuild [Default: true]
//The boolean value showing whether the library should filter bars using the current trading session.
라이브러리가 current trading session을 사용해서 막대를 필터링 해야하는지 여부를 나타낸다.  
false 일 경우, 캔들은 라이브러리가 다른 해상도에서 데이터를 빌드하거나 has_empty_bar 가 true 일 경우에만 필터링 된다.  
true 일 경우 라이브러리는 거래세션에 속하지 않는 막대를 데이터에서 제거한다.

## has_no_volume [Default: false]
심볼에 볼륨 여부를 나타낸다.

## volume_precision [Default: 0]
0은 볼륨이 항상 정수임을 의미한다. 1은 쉼표뒤에 1개가 숫자가 있을수 있음을 의미한다(0.1)

## #data_status
차트에 보여주는 데이터 받아오는 형식에 관한 스테이터스이다.
* streaming
* endofday
* pulsed
* delayed_streaming

## expired [Default: false]
만료날자 사용여부, 무기한 선물거래가 아닌 거래기간이 정해져있을경우, true를 옵션으로 준뒤 expiration_date에 만료일자를 넣으면 된다.

## expiration_date
Unix timestamp로 정의된 만료날짜, 위 옵션이 true일경우 사용가능하다. `expired = true`.
Charting Library will request data for this symbol starting from that time point.

## sector
심볼 정보에 표시되는 섹터

## industry
심볼 정보에 표시되는 산업군

## original_currency_code
아래와 동일, 아래는 currency를 사용 가능 할 경우에 사용하는거같은데 없어도 될듯

## #currency_code
화폐 코드 , 거래의 기축통화를 나타낸다. `if currency conversion is enabled.`
ETHBTC => BTC, BTCUSDT => USDT


[symbolinfo](https://github.com/tradingview/charting_library/wiki/Symbology#symbolinfo-structure)