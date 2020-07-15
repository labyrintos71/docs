# Kotlin 문법 - 위임

Delegation은 구현해야 할 추상 메소드 또는 프로퍼티의 정의를 다른 객체에 떠넘기는 방법이다.  

코틀린에서는 자바와 달리 기본적으로 모든 클래스가 final 이다.
이는 상속에서 발생하는 종속성, 의존성 문제를 방지하기 위해 클래스 상속을 불가능하게 되어있다. (원한다면 상속될 클래스에 open을 명시해주면 가능하다. ) 

Delegation은 주로 상속을 허용하지 않는 클래스에 새로운 동작을 추가해야 할 때 또는 메소드의 동작을 변경하고 싶을 때 사용한다.  

위 예제에서 HouseBlend를 Espresso를 상속받아 구현하고 싶다고 하자. Espresso는 open 키워드가 없기 때문에 final 선언이므로 상속이 불가 하다.
```kotlin
abstract class Coffee {
    abstract fun getDescription(): String
    abstract fun cost(): Double
}

class Espresso() : Coffee() {
    override fun getDescription(): String = "에스프레소"
    override fun cost(): Double = 1.99
}

class HouseBlend : Espresso() {      // 에러!
    val kind = "하우스 블렌드 커피"
}
```
따라서 상속하고싶은 클래스와 동일한 인터페이스를 구현하는 새로운 클래스를 만들고 상속하고 싶은 클래스는 내부에 멤버 변수로 가지는 방식으로 구현해야 한다.
```kotlin
class HouseBlend : Coffee {
    val kind = "하우스 블렌드 커피"
    override fun getDescription(): String = "에스프레소"
    override fun cost(): Double = 1.99
}
```
# by
by 키워드는 구현되어야 할 추상 메소드들을 명시된 객체로 구현을 위임한다는 사실을 나타낸다. by 키워드를 사용하면 위의 코드도 간단하게 작업 가능하다.
```kotlin
class HouseBlend(val espresso: Coffee) : Coffee by espresso {
    val kind = "하우스 블렌드 커피"
}
```

### 왜 이렇게 사용할까?
상속은 클래스의 변수와 메소드를 모두 받기 때문에 재구현할 필요가 없어서 편리하다. 하지만 올바르지 않은 상속은 많은 문제를 일으키는데 그중 하나가 객체의 유연성을 떨어트리는것 이다. 보통 부모와 자식 클래스가 밀접한 관계며 비슷한 상속을 받게 될때 유연하게 만들기 위해 사용한다.
이 외에도 상속받을수 없는 클래스를 상속받고자 할 떄 사용한다.


## 위임 프로퍼티(Delegation-property)
위임 프로퍼티란 프로퍼티의 접근자 게터와 세터를 다른객체로 위임하는 방식을 말한다.
프로퍼티의 값을 변경하거나 읽어올 때 작업이 필요할 떄 사용하는데 아래처럼 by 키워드를 사용해 이용가능하다.
```kotlin
class Delegator(var value: Int) {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): Int {
            println("${property.name} get! $value")
            return value
    }
    operator fun setValue(thisRef: Any?, property: KProperty<*>, newValue: Int) {
        println("${property.name} set! $newValue")
        value = newValue
    }
}

class Person(val name: String, age: Int, salary: Int) {    
    var age: Int by Delegator(age)
    var salary: Int by Delegator(salary)
}

fun main(args: Array<String>?) {
    val p = Person("Monguse", 20, 2000)
    p.age = 21
    p.salary = 2100
    println("${p.name} - age: ${p.age}, salary: ${p.salary}")
}
```
```kotlin
age set! 21
salary set! 2100
age get! 21
salary get! 2100
Monguse - age: 21, salary: 2100
```

## Lazy
lazy()는 람다를 받아 지연 프로퍼티를 구현한 대리자인 Lazy<T>의 인스턴스를 반환한다.  
get()을 처음 호출하면 lazy()에 전달한 람다가 실행되고, 그 결과가 저장된다.  
이후에 get()을 호출하면 저장한 값을 반환한다.  

간단하게 말하자면 지연초기화 이다. var 에서 사용했던 lateinit에 val 버젼이라고 생각하면된다.
```kotlin
val lazyValue: String by lazy {
    println("computed!")
    "Hello"
}

fun main(args: Array<String>) {
    println(lazyValue)
    println(lazyValue)
}
```
출력은 아래와 같다.
```
computed!
Hello
Hello
```

## Observable
코틀린에서는 프로퍼티에 값이 할당될 때 처리할 메서드를 등록할 수 있는 메서드를 제공한다. 바로 'Delegates.obsevable()' 메서드이다. observable() 메서드는 람다 식을 파라미터로 전달받아 setValue() 메서드가 구현된 객체를 반환한다. 그래서 위임 프로퍼티 예제와 같은 기능을 하는 코드를 'Delegator' 클래스의 구현 없이 아래와 같이 간단하게 구현할 수 있다.
```kotlin
import kotlin.properties.Delegates

class Person(val name: String, age: Int, salary: Int) {    
    var age: Int by Delegates.observable(age) {
        prop, old, new -> println("${prop.name} set! $old->$new")
    }
    var salary: Int by Delegates.observable(salary) {
        prop, old, new -> println("${prop.name} set! $old->$new")
    }
}

fun main(args: Array<String>) {
    val p = Person("Monguse", 20, 2000)
    p.age = 21
    p.salary = 2100
}
```

## Map
Map 과 MutableMap 인터페이스는  getValue()와 setValue()에 대한 확장함수를 제공한다. 즉 위임이 가능하다.
```kotlin
class Person(val map: MutableMap<String, Any?>) {
    val name: String by map
    var age: Int? by map
    var salary: Int by map
}

fun main(args: Array<String>) {
    val p = Person(mutableMapOf("name" to "Monguse", "age" to null, "salary" to 2000))
    p.salary = 2100
    println("name: ${p.name}, age: ${p.age}, salary: ${p.salary}")
}
```