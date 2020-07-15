# Kotlin 문법 - 함수

## 기본 함수 형태
```kotlin
public fun makeText(): String {
    return "x = $x y = $y"
}

//코틀린에선 Unit이 void
fun printText(): Unit {
    print("x = $x y = $y")
}
```

## 람다식
람다식이란 식별자 없이 실행가능한 함수를 의미한다.
```kotlin
//람다식은 왼쪽이든 오른쪽이든 자료형을 지정해줘야 한다.
fun a(): Int = 1

//람다식, 자료형 지정
var sum: (Int, Int) -> Int = { a: Int, b: Int -> a + b }
//람다식, 자료형 오른쪽에만 지정
var sum1 = { a: Int, b: Int -> a + b }
//람다식, 자료형 왼쪽에만 지정
var sum2: (Int, Int) -> Int = { a, b -> a + b }

//람다식, 리턴값이 없을경우 예제
val funcSayHi: (String) -> Unit = { name: String -> println("Hi $name") }

//메소드에 람다식을 인수로 받는 예제
fun main(args: Array<String>) {
    temp(1, 2, { a: Int, b: Int -> a + b })
    temp(1, 2) { a: Int, b: Int -> a + b }
    temp(1, 2, ::sum3)
    emptyrambda(3) { 7 }
    emptyrambda(3, { 7 })
    emptyrambda(3, { -> 7 })
    emptyrambdas(3) { a: Int -> a + 7 }
}

fun temp(a: Int, b: Int, c: (Int, Int) -> Int) = c(a, b)
fun sum3(a: Int, b: Int): Int {
    return a + b
}

fun emptyrambda(a: Int, c: () -> Any) = c()
fun emptyrambdas(a: Int, c: (a: Int) -> Any) = c(a)
```

## 익명 함수
람다식 안에서 return 할 수 없는 경우가 있다.  
처리 중간에 조건을 주고 중간에 빠져나오고 싶지만 return이 없는 람다식의 경우다.
```kotlin
var funcSum = fun(a: Int, b: Int): Int { return a + b }

numbers.forEach { number ->
    if (number % 2 == 1) {
        // 여기에서 처리를 끝내고 싶은 경우
    }
    ...
}

//이러한 경우에는 람다식이 아닌 익명 함수를 사용하는 것이 좋다.
numbers.forEach(fun(number: Int) {
    if (number % 2 == 1) {
        return // 처리 종류
    }

    ... 
})
```

## 고차 함수
고차함수란 함수의 인자나, 반환값이 람다식인경우를 말한다.  
예를들면 list의 filter 나 map은 인자값으로 람다를 받기 때문에 고차함수다.
```kotlin
class Order(val itemCount: Int) 

fun getShippingCostCalculator(reqOpt: Boolean): (Order) -> Double { 
    if (reqOpt == true) { 
        return { order -> 6 + 2.1 * order.itemCount } 
    } 
        return { order -> 1.2 * order.itemCount } 
} 

fun main(args: Array) { 
    val calculator = getShippingCostCalculator(true) 
    println("Shipping costs ${calculator(Order(3))}") 
}
```

## inline 함수
고차 함수를 사용할 때 java 1.6 과의 호환성을 위해 런타임에 패널티가 있고.  
각 함수는 객체고, 클로저를 가지고 있다. 따라서 메모리를 차지하고 함수 콜을 위한 런타임 오버헤드 가 있다.
이 때 inline 키워드를 사용하면 컴파일시 bytecode가 복사되어 들어가기때문에 이를 방지할 수 있다.
```kotlin
inline fun test(){
    println(123)
    println(456)
    println(789)
}
fun testfun(){
    test()
}

// 컴파일시엔 아래처럼 변환된다.

fun testfun(){
    println(123)
    println(456)
    println(789)
}
```

## 확장 함수
코틀린에서는 상속, 디자인 패턴을 사용하지 않고 새로운 기능을 가지는 클래스로 확장할 수 있는 기능을 제공한다.  
extension 이라 부르는데 아래 예제를 봐보자.
```kotlin
var strs = "string"

val addStr = fun String.(str: String): String {
    return this + str
}

fun String.deleteLastStr(successor: String): String {
    return this + successor
}
// 여기서 리시버타입은 String이된다. 즉 확장하는 자기 자신의 타입인것
//책에서 나오는 리터럴은 람다를 넘겨준 식. 즉 표현식 그 자체임
//         여기 부분
private fun String.deleteLastStr(): String {
    return this.substring(0,this.length-1)
}

private fun Any.deleteLastStrㄴ(): String {
    return this.toString().substring(0)
}
var s = 1
// str = str.addStr("하기 딱 좋은 날씨로구나.")

//확장함수 심화
fun extendFun() {
    fun String.lastChar1(): Char = this.get(this.length - 1)

    //this 생략 가능
    fun String.lastChar2(): Char = get(length - 1)

    fun <T> Collection<T>.convertToString(
        separator: String = ",",
        prefix: String = "(",
        postfix: String = ")"
    ): String {
        var result = prefix
        this.map { it.toString()+separator }.forEach { result = result + it }
        // == this.forEach { result = result + it + separator }
        return result.deleteLastStr() + postfix
        
        //String 제네릭
        fun Collection<String>.join(
            separator: String = ",",
            prefix: String = "(",
            postfix: String = ")"
        ): String = this.toString() + " numbers"
        //사용
        val intlist = listOf(1, 2, 3, 4)
        //intlist.join() //에러!!! Int 타입은 불가능하다
        // 사용
        val list = listOf("1", "2", "3")
        print(list.joinToString())
}

//확장 프로퍼티
class extendProperty {
    //get() 구현
    val String.lastChar: Char
        get() = get(length - 1)
    //  get() { return last().toString()}

    //리스트인경우 get(), set() 구현
    var List<Any>.name: String
        get() = name
        set(value) {
           name = last().toString()
        }

    fun test() {
        "zerog".lastChar        //확장 프로퍼티 호출
        val list = listOf("a", "b", "c")
        list.name              //get()
        list.name = "d"      //set()
    }
}
```

## getter, setter 오버라이딩
코틀린에서는 getter와 setter 를 오버라이딩 할 수 있다.
```kotlin
//getter 오버라이딩을 이용해 nullcheck 처리 및 uppercase 반환 예제
class nullcheck {
    var string: String? = null
        get() = if (field == null) "null" else field

    var stringupper: String? = null
        get() = if (field == null) "null" else field.toString().toUpperCase()
}
//when을 적용해서 쓸 수도 있다.
class FakeAge {
    var age: Int = 0
        set(value) {
            field = when {
                value < 18 -> 18
                value in 18..30 -> value
                else -> value - 3
            }
        }

}

class getexample {
    val array = mutableListOf<Int>(1, 2, 3)
    val isListBig: Boolean
        get() = array.size > 2

    var name = "test"
        get() = field.toUpperCase()    }

    fun getsetExample() {
        getexample().isListBig
    }
}

```
## vararg, 가변인자
코틀린에서는 가변인자를 받고싶을 때 아래와 같이 하면 된다.

```kotlin
fun varags() {
    val list = arrayOf("as", "as1", "as2", "as3")
    varargTest(*list)
}

fun varargTest(vararg numbers: Int) {
    numbers.map { it ->
        println(it)
    }
}

fun varargTest(vararg a: String) {
       for (a_ in a) {
        println(a_)
    }
}
```