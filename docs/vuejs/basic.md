# Vue 기초

## DataBind
Vue 생성자 함수로 뷰모델을 만드는데 이 Vue 인스턴스를 스크립트 칸에 만들어 준다.. 
el 은 div와 연결해줄 키, data 부분엔 사용할 데이터, methods 에는 사용하고자 하는 함수를 구현하면 된다.
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>안녕! 나는 타이틀!</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>

<body>
    <div id="app">
        {{ person.name}} <!-- 변수 받아오기 -->
        <br>
        {{ nextYear('야할룽') }}  <!-- 함수 결과값 받아오기 -->
        <br>
        <input v-bind:type="type" :value=inputdata> <!-- value는 initvalue, v-bind:value 는 해당 데이터 바인딩, v-bind 는 생략 가능-->
        <br>
        <a :href="getLink('/channel/UCcvLSRIWJIAGFDyWtzkbiHA')">유튜브로 이동하기!</a> <!--함수 리턴값도 바인딩 가능하다.-->
    </div>
    <script>
        new Vue({
            el: '#app',
            data: {
                person: {
                    name: '수현냥은',
                    age: 21
                },
                inputdata: 'hello',
                type: 'text',
                link: "https://www.youtube.com"
            },
            methods: {
                getLink(channel) { return this.link + channel },
                nextYear(greeting) {
                    return greeting + '! ' + this.person.name + '는 내년에' + (this.person.age + 1) + '살 입니다';
                },
                otherMethod: function () {
                    return nextYear();
                }
            }
        })
    </script>
</body>

</html>
```

## Event
vue에 대한 이벤트 처리는 아래와 같다.
```html
<body>
    <div id="app">
        {{year}}<br>
        <button v-on:click="plus">plus</button><br>
        <button @click="minus">minus</button><br>
        <form v-on:submit.prevent="submit">
            <!-- submit은 기본적으로 리로딩이 되기 때문에 prevent를 사용 -->
            <input type="text" , v-on:keyup.enter="submit"><br>
            <button type="submit">Submit</button>
        </form>
    </div>
    <script>
        new Vue({
            el: '#app',
            data: {
                year: 2020
            },
            methods: {
                plus() {
                    this.year++;
                },
                minus() {
                    this.year--;
                },
                submit() {
                    alert('hello world!');
                    console.log('hello');

                }
            }
        })
    </script>
```

## Style
font-bold 처럼 -가 들어간건 사용할때 ' 로 감싸줘야 한다.
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>안녕! 나는 타이틀!</title>
    <style>
        .red {
            color: red;
        }

        .font-bold {
            font-weight: bold;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>


<body>
    <div id="app">
        <div :style="{color: red, fontSize: size}">Hello</div>
        <div :class="{ red: isRed, 'font-bold' : isBold }">
            World
        </div><br>
        <button @click="update">하이</button>
    </div>
    <script>
        new Vue({
            el: '#app',
            data: {
                isRed: false,
                isBold: false,
                red: 'red',
                size: '30px'
            },
            methods: {
                update() {
                    this.isRed = !this.isRed;
                    this.isBold = !this.isBold;
                }
            }
        })
    </script>
</body>
```
## Computed & Watch
computed 속성은 종속 대상을 따라 저장(캐싱)된다는 것 입니다. computed 속성은 해당 속성이 종속된 대상이 변경될 때만 함수를 실행합니다.  
즉 message가 변경되지 않는 한, computed 속성인 reversedMessage를 여러 번 요청해도 계산을 다시 하지 않고 계산되어 있던 결과를 즉시 반환합니다.

또한 Date.now()처럼 아무 곳에도 의존하지 않는 computed 속성의 경우 절대로 업데이트되지 않는다는 뜻입니다.  
Vue 인스턴스의 데이터 변경을 관찰하고 이에 반응하는 보다 일반적인 watch 속성도 있다.  
요컨대, computed는 대상이 변경될때만 호출되고 watch는 상시 감시한다고 보면 된다.

```html
<body>
    <div id="app">
        {{printmsg}}<br>
        <button v-on:click="change">CLickMe</button><br>
        {{upd}}<br>
        {{Date.now()}}
    </div>
    <script>
        new Vue({
            el: '#app',
            data: {
                msg: '야할룽',
                upd: " "
            },
            methods: {
                change() {
                    if (this.msg === "야할룽") this.msg = "123";
                    else this.msg = "야할룽";
                }
            },
            computed: {
                printmsg() {
                    return this.msg.substring(0, 2);
                }
            },
            watch: {
                msg(newVal, oldVal) {
                    console.log(newVal, oldVal);
                    this.upd = newVal;
                }
            }
        })
    </script>
</body>
```

## v-if & v-show
v-if는 조건부 렌더링 이여서 초기 렌더링 비용이 높다.
하지만 v-show는 무조건 초기 렌더링을 하고 display none으로 보여주기 때문에 초기 렌더링 비용이 저렴하다

```html
<body>
    <div id="app">
        <button @click="onToggle">toggle</button><br>
        <template v-if="show"> <!-- number === 3 이런 식도 대입 가능하다-->
            <div>1</div>
            <div>2</div>
            <div>3</div>
        </template>
        <div v-else-if="show">No</div>
        <div v-else="show">No</div>

        <div v-show="show">Hi</div>
    </div>
    <script>
        new Vue({
            el: '#app',
            data: {
                show: true
            },
            methods: {
                onToggle() {
                    this.show = !this.show;
                }
            }
        })
    </script>
</body>
```
