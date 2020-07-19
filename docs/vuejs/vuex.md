# Vuex
## Vuex 기초
[Vuex](https://vuex.vuejs.org/kr)는 Vue.js의 상태 관리를 위한 패턴이자 라이브러리다. 애플리케이션의 모든 컴포넌트에 대한 중앙 집중식 저장소 역할을 하며 예측가능한 방식으로 상태를 변경할 수 있는 장점이 있다고 한다.  

### 상태관리
상태관리는 여러 컴포넌트 간의 데이터 전달과 이벤트 통신을 한곳에서 관리하는 패턴을 말한다. 리엑트는 redux, mobx등을 사용하고 뷰에서는 vuex로 사용할 수 있다.

### 상태 관리는 왜 필요 할까?  
컴포넌트 기반 프레임워크에서는 작은 단위로 쪼개진 여러 개의 컴포넌트로 화면을 구성한다. 예를들면 header, button, list등의 화면 요소가 각각 컴포넌트로 구성되어 한 화면에서 많은 컴포넌트를 사용하게 되는데, 이떄 컴포넌트의 통신이나 데이터 전달을 좀더 유기적으로 관리할 필요성이 생긴다.

### Vuex 구성요소
Vuex의 핵심구성은 State, Mutations, Actions, Getters로 구성되어있다.

## State
* state는 쉽게 말하면 프로젝트에서 공통으로 사용할 변수를 정의하는 곳이다.
* 프로젝트 내의 모든 곳에서 참조 및 사용이 가능하다.
* state를 통해 각 컴포넌트에서 동일한 값을 사용할 수 있다.  

`store/index.js`
```js
export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
   
  },
  mutations: {
  
  },
  actions: {
  
  }
})
```
`Child.vue`
```html {3}
<template>
  <v-container fluid pa-0>
    Child count : {{$store.state.counter}}
    <br />
    <v-layout row>
      <v-btn style="margin-left: 12px;">+</v-btn>
      <div style="width: 12px;" />
      <v-btn>-</v-btn>
    </v-layout>
  </v-container>
</template>
```

### mapState
Vuex는 `mapState`헬퍼를 지원해주고 있다. 이는`getter`를 이용해서 코드를 훨씬 간결하게 짤수있게 도와주는데 `getter`는 아래에서 확인해 볼 수 있다.

`Child.vue`
```html
<template>
  <v-container fluid pa-0>
    Child count : {{count}}
    <br />
    <v-layout row>
      <v-btn style="margin-left: 12px;">+</v-btn>
      <div style="width: 12px;" />
      <v-btn>-</v-btn>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    //$store.state.counter
    count: state => state.counter
  })
};
</script>
```
## Getters
* 각 컴포넌트의 computed의 공통 사용 정의라고 볼 수 있다.
* 여러 컴포넌트에서 동일한 computed를 사용할 경우 Getters에 정의해서 공통으롷 쉽게 사용할 수 있다.
* 하위 모듈에 getters를 불러오기 위해서는 `this.$store.getters["경로명/함수명"]으로 불러와야 한다.  

사실 위에서 배운 state의 getter역할을 해주는건데 왜 필요할까 싶을수도 있다. 단순히 state만 가져오는게 아니라 state에 filter등 연산이 들어가는 경우다. 아래를 보면 이해가 빠를것이다.  
```js
 computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```
Getters는 vuex의 computed라고 생각하면 된다. getter의 결과는 종속성에 따라 캐쉬되고 일부 종속성이 변경될 경우에만 다시 계산된다.

`store/index.js`
```js
export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    getCounter: state => {
      return state.counter;
    }
  },
})
```
`Child.vue`
```html
<template>
  <v-container fluid>
    Parent count : {{getCounter}}
    <br />
    <v-layout row>
      <v-btn style="margin-left: 12px;" @click="addCounter(10)">+</v-btn>
      <div style="width: 12px;" />
      <v-btn @click="subCounter">-</v-btn>
    </v-layout>
    <br />
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {
    Child: () => import("../components/Child")
  },
  computed: {
    parentCounter() {
      return this.$store.getters.getCounter;
    },
    ...mapGetters(["getCounter"])
  }
};
</script>
```



### 속성 유형 접근
선언한 getters 는 `store.getters`객체에 노출되고 속성으로 값을 접근할 수 있다.
```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
  }
  }
})
```
```js
store.getters.doneTodosCount // -> 1
```
속성으로 접근하는 getter는 Vue의 반응성 시스템의 일부로 캐시된 것임을 유의해야 한다.
```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

### 메소드 유형 접근
getters에서 함수를 리턴하게 되면 getter에 전달인자를 통해 해당 함수에 인자로 넣어줄수 있다. 보통 저장소의 배열을 검색할 때 좋은데 아래 소스를 보면 이해가 빠르다.

## Mutations
* Mutations의 주요 목적은 state를 변경시키는 역할이다.
* 비동기 처리가 아니라 동기처리를 한다.
* `commit('함수명','전달인자')`로 실행 시킬 수 있다.(전달인자 생략 가능)
* 함수 형태로 작성한다. 

`store/index.js`
```js
export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
   
  },
  mutations: {
    addCounter: function (state, payload) {
      state.counter += payload;
    },
    subCounter: function (state, payload) {
      state.counter -= payload.value;
    }
  },
  actions: {
  
  }
})
```


`Child.vue`
```html {6}
<template>
  <v-container fluid pa-0>
    Child count : {{$store.getters.getCounter}}
    <br />
    <v-layout row>
      <v-btn style="margin-left: 12px;" @click="addCounter(10)">+</v-btn>
      <div style="width: 12px;" />
      <v-btn @click="subCounter">-</v-btn>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    subCounter() {
      this.$store.commit("subCounter", { value: 10, arr: ["a", "b", "c"] });
    },
    ...mapMutations(["addCounter"])
  }
};
</script>
```


## Actions
* Actions의 주요 목적은 Mutations를 실행시키는 역할을 한다.
* 비동기 처리다. 순서에 상관없이 먼저 종료된 함수의 피드백을 받아 후속 초리를 한다.
* `dispatch('함수명','전달인자')`로 실행 시킬 수 있다.(전달인자 생략 가능)
* 함수 형태로 작성하며 보통 비동기 처리이기 때문에 콜백함수를 주로 작성한다.