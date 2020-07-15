# Kotlin 문법 - 변수


## 변수 선언 기본형태
```kotlin
// var/val 변수명:변수타입 = 초기화 값
var name:String = "name"
```

## val/var
```kotlin
// val로 객체를 선언할 경우 초기화 후에도 객체의 프로퍼티값은 변경 가능
val = 한번 초기화 후 읽기만 가능한 final 변수
var = 읽기/쓰기 가능한 변수
```

## Elvis op, ?:
코틀린에는 삼항 연산자가 없다.  
대신에 엘비스 머리를 닮은 연산자가 있다!  
엘비스 연산자는 좌항이 null 일경우에 우항값을 반환한다.
```kotlin
var a:String? = null
println(a?.length ?: -1) // -1
a = "str"
println(a?.length ?: -1) // 3
```

## Type cast, is, as?
스마트 캐스트인 is 를 이용하면 as를 사용하지 않고도 type을 변환할 수 있다.  
단 as를 바로 사용하여 casting 할때 type이 맞지 않으면 ClassCastException이 발생한다.

따라서 kotlin에서는 이를 방지하는 as? 를 지원한다.  
as? 는 casting을 시도하고, casting이 불가능 하면 null을 반환한다.
```kotlin
class As {
    fun As() {
        val str: String = "This is Int?"
        val value: Int = str as? Int ?: 0
        println(value) // 0
    }
}
```

## lateinit
안드로이드에서 변수선언은 클래스의 위쪽에서 하고 초기화는 onCreat()메소드에서 하는경우가 많다.  
이 때 lateinit 키워드를 추가하면 된다.
```kotlin
class SampleActivity {

        private lateinit var adapter: SampleAdapter

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_sample_main)

            // 부르는 시점 초기화
            adapter = SampleAdapter(ImageViewModel(this@SampleMainActivity, 3))
            adapter.addItem()
            adapter.notifyDataSetChanged()
        }
    }
```

## Non-Null/Nullable
null을 값으로 가질 수 있으면 Nullable, null을 값으로 가질 수 없으면 Non-null타입이다.
```kotlin
// 에러     
var a:String = null
```
String 은 Non-Null타입이기 떄문에 null 을 가질 수 없고, 초기화도 안할 수 없다.  
만약 선언만 하고싶은 상황이라면 이는 추후에 설명할 lateinit 으로 해결 할 수 있다.

Nullable로 선언하고싶으면 변수 자료형 뒤에 ? 붙이면 사용 가능하다.
```kotlin
var a:String? = null
println(a?.length) //null 출력됨    
```

## Safe Calls, ?. 
코틀린에서는 ?. 연산자를 이용해 null값에 대해 안전하게 변수를 지정하고 불러 올 수 있다.
```kotlin
class Call {
     var name: String? = null

}
fun safeCallsTest() {
        val call: Call? = Call()
        val str: String = call?.name ?: "Null text"
        println(str) // Null text
}
```

## Not null, !!
Null값이 안들어온다는 보증을 해주는 연산자이다.
Null이 아닌값만 들어올 때 사용해야 하며 Null이 들어오게 될경우 NPE를 발생시킨다. 최대한 지양하는게 좋다.
```kotlin
var str:String? = "TEST"
var nnstr:String = str!!
```
