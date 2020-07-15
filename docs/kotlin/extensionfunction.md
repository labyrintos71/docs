# Kotlin 문법 - 범위지정함수

## let()
let()은 함수를 호출하는 객체(receiver object)를 람다식 내부로 넘기고 블록의 결과값을 반환한다.  
함수를 호출한 객체를 인자로 받으므로 다른메소드나 연산을 수행해야 할 때 사용할 수 있다.  
예를들어 안드로이드에서 커스텀뷰에서 Padding 값을 지정할 때 쓸수있다.
```kotlin
val padding = TypedValue.applyDimension(
        TypedValue.COMPLEX_UNIT_DIP, 16f, resources.displayMetrics).toInt()
// 왼쪽, 오른쪽 padding 설정
setPadding(padding, 0, padding, 0)
```
아래에서 padding은 한번 사용되고 사용되지 않기 때문에 아래처럼 사용할 수 있다.
```kotlin
TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 16f,
        resources.displayMetrics).toInt().let { padding ->
    // 계산된 값을 padding 이라는 이름의 인자로 받음
    setPadding(padding, 0, padding, 0)
}
```
또한 ? 과 run을 함께 사용하면 null 처리를 쉽게 할수 있다.  
```kotlin
fun sendEmailTo(email: String) {
    println("Sending email to $email")
}

fun main() {
    var email: String? = "let@example.com"
    
    email?.let {
        sendEmailTo(it) // Sending email to let@example.com
    } 
    
    email = null
    
    email?.let {
        sendEmailTo(it) 
    } ?: run {
        // null일경우 처리
        // 단 let 마지막 코드 결과가 
        // null 일 경우 여기로 올 수 있으니 주의
    }
}
```

## apply()
apply()는 함수를 호출하는 객체를 이어지는 블록의 리시버로 전달하고 객체 자체를 반환한다.  
특정 객체를 생성하면서 함께 호출해야하는 초기화 코드가 있는경우 사용할 수 있다.  
안드로이드에서 명시적 인텐트에 값을 담아서 보낼 떄 사용할 수 있다.
```kotlin
val intent = Intent(this, MainActivity::class.java)
    intent.putExtra("value","text")
    intent.putExtra("num",3)
    startActivity(intent)
```
이를 apply를 사용할 경우
```kotlin
startActivity(
            Intent(this, MainActivity::class.java).apply {
                putExtra("value","text")
                putExtra("num",3)
            }
        )
```

## run()
run()은 인자가 없는 익명 함수처럼 동작하는 형태와 객체에서 호출하는 형태 총 두가지가 있다.  

객체없이 run() 함수를 사용하면 인자 없는 익명 함수처럼 사용할 수 있다. 이어지는 블럭 내에서 처리할 작업들을 넣어줄 수 있으며, 일반 함수와 마찬가지로 값을 반환하지 않거나 (특정 값을 반환할 수도 있다.

객체에서 run() 함수를 호출할 경우, 호출하는 객체를 이어지는 블록의 리시버로 전달하고 블록의 결과값을 반환한다.

apply()와 비슷하지만 apply()는 새로운 객체를 생성함과 동시에 연속된 작업이 필요할 때 사용하고 run()은 이미 생성된 객체에 연속된 작업이 필요할 때 사용한다.아래는 액션바가 null이 아닐때 속성을 변경하는 예제이다.
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    ...
    supportActionBar?.run {
        setDisplayHomeAsUpEnabled(true)
        setHomeAsUpIndicator(R.drawable.ic_clear_white)
    }
    ...
}
```

## with()
with() 함수는 인자로 받는 개체를 이어지는 블록의 리시버로 전달하며, 블록의 결과값을 반환한다.
```kotlin
val person: Person = getPerson()
with(person) {
    print(name)
    print(age)
}
```
## 구분
```kotlin
    // 자기 자신 반환함
    temp = test.apply {
        add()
    }
    
    temp = test.also {
        it.add()
    }
    
    //코드블록 결과값 반환
    temp = test.run {
        plus()
    }
    
    temp = test.let {
        it.plus()
    }
    
    temp = with(test) {
        plus()
    }
```

## also, apply 를 이용한 swap
also 와 apply를 이용하면 간단하게 치환할수 있다.
```kotlin
    fun also_example() {
        var a = 1
        var b = 1
        a = b.also { b = a }
    }

    fun apply_example() {
        var result = Dog(12).also { it.age = 13 }
        var result2 = Dog(12).apply { age = 13 }
    }

    data class Dog(var age: Int)
```
