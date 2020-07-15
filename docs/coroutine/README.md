# 시작하기

## Coroutine 
`코루틴` 이라는 단어는 어디서 나온 단어일까?  
이를 알기 위해서는 먼저 `루틴`이라는 개념을 알아야 한다. `루틴`은 흔히 말하는 함수라 생각하면 되고, 루틴은`메인루틴`과 `서브루틴`으로 나뉘어지는데, 아래 소스를 보면 실행 주체인 `main()`이 `메인루틴`이고 호출되는 함수인 `reverse()`가 `서브루틴`이 된다.
```kotlin
fun main() {
    var str = reverse("asdf")
    println(str)
}

fun reverse(str: String): String{
    println("in reverse()")
    return str.reversed()
}
```
`함수`는 `시작 지점`과 `끝나는 지점`이 한 곳으로 정해져 있다. 아래 예제를 보면를 보면 getSum() 함수를 호출하며 매개변수로 정수 a, b를 전달한다. 이후 함수 내부에서 두 매개변수를 더한 후 더한 값을 반환한다. 일반적으로 a,b를 전달받고 반환하기 까지 메인스레드는 block 되고 getSum()은 외부요인에 의해 중지되지 않는다.
```kotlin   
fun getSum(a : Int, b : Int) : Int{
    val result = a + b
    return result
}
```
코루틴은 서브루틴의 확장된 개념이라고 볼 수 있다. 함수와는 다르게 시작과 끝이 아닌 로직 중간의 어느 부분에서라도 시작과 종료가 이루어질 수 있으며 실행을 일시중지하고 다른 코루틴으로 이동할 수도 있다. 간단한 문법으로 비동기 태스크를 처리할 수 있으며 기존의 스레드를 사용하는 것보다 훨씬 적은 자원을 소비한다. 

## Thread vs Coroutine
### Thread
- OS의 Native Thread에 직접 링크되어 동작하여 많은 시스템 자원을 사용한다.
- Thread간 전환 시에도 CPU의 상태 체크가 필요하므로 그만큼의 비용이 발생한다.  

### Coroutine
- 코루틴은 즉시 실행하는 게 아니며, Thread와 다르게 OS의 영향을 받지 않아 그만큼 비용이 들어가지 않는다.
- 코루틴 전환시 Context Switch가 일어나지 않는다.
- 개발자가 직접 루틴을 언제 실행할지, 언제 종료할지 모두 지정이 가능하다.
- 이렇게 생성한 루틴은 작업 전환 시에 시스템의 영향을 받지 않아 그에 따른 비용이 발생하지 않는다.  

코루틴은 RxJava보다 좀더 완만한 곡선의 러닝커브를 자랑한다.  
기존 스레드로 하던 작업을 대부분 대체할 수 있을 뿐만 아니라 비동기 테스크의 생명주기를 컨트롤 할 수 있다는 것만으로도 큰 매력이라고 생각한다.

## Getting Started
[kotlinx.coroutines](https://github.com/Kotlin/kotlinx.coroutines) 에서 깃허브를 확인 할 수 있으며 아래로 설치 할 수 있다.
```sh
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.7'
```
