# Kotlin 문법 - 제어흐름

## if 키워드의 응용
코틀린은 변수 할당시, 혹은 리턴값 지정시에 이런식으로 if구문이 사용 가능하다.
```kotlin
    var x: Int = if (10 > 20) 5 else 10
    var y = if (10 > 20) 5 else 10
```

## when
when은 switch의 상위호환 버전이라고 생각하면 된다.
```kotlin
  fun when_example() {
        when (x) {
            1 -> println(1)
            2 -> println(2)
            3, 4 -> println("over 2")
            in 5..10 -> println("5~10")
            else -> println("else")
        }
        //switch와 if를 혼용한것 처럼 사용할 수 있다.
        var abs = 50
        when {
            abs <= 10 -> println("a <= 10")
            else -> println("a > 10")
        }
    }
```
또한 이런식으로 클래스와 섞어서 쓸수도 있다.
```kotlin
  fun when_example2() {
        val x = ob(2, true, 500)
        when (x.value) {
            maginNum(x.value) -> 
                println("x = $x , ${if (x.valid) "valid" else "invalid"}")

            in (1..10) -> {
                println("value: ${if (x.value < x.max) x.value else x.max}")
            }                                                                   

            20, 21 -> println("test")

            else -> println("test else")
        }
    }

    //data class 저장용 객체에서 사용
    data class ob(val value: Int, val valid: Boolean, val max: Int)

    fun maginNum(a: Int): Int {
        return if (a in (15..25)) a else 0
    }
```

## 표현식으로서의 try catch
표현식으로서 사용할 경우 블록내의 제일 마지막 값을 반환하게 된다.  
단 finally 구문은 반환하지 않으니 주의하도록 해야한다.
```kotlin
fun try_example() {
        val str = "123"
        var a: Int? = try {
            str.toInt()
        } catch (e: NumberFormatException) {
            -1
        }
    }
```  