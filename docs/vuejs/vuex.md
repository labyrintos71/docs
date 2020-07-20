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
속성으로 접근하는 getter는 Vue의 반응성 시스템의 일부로 캐시된 것이다.
```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

### 메소드 유형 접근
getters에서 함수를 리턴하게 되면 getter에 전달인자를 통해 해당 함수에 인자로 넣어줄수 있다. 보통 저장소의 배열을 검색할 때 좋은데 아래 소스를 보면 이해가 빠르다.
```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```
메소드를 통해 접근하는 getter는 호출 할 때마다 실행되며 결과가 캐시되지 않는다.
```js
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```


## Mutations
* Mutations의 주요 목적은 state를 변경시키는 역할이다.
* 비동기 처리가 아니라 동기처리를 한다.
* `commit('함수명','전달인자')`로 실행 시킬 수 있다.(전달인자 생략 가능)
* 함수 형태로 작성한다. 

mapMutation 헬퍼를 마찬가지로 지원한다. 아래는 커밋, 페이로드를 가진 커밋에 대한 예제이다.
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
### 상수를 사용한 mutations 호출
`mutation-types.js`
```js
export const SOME_MUTATION = 'SOME_MUTATION'
```
`store/index.js`
```js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    [SOME_MUTATION] (state) {
    }
  }
})
```
### 컴포넌트 안에서의 mutations 매핑
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment' // this.increment()를 this.$store.commit('increment')에 매핑한다.
    ]),
    ...mapMutations({
      add: 'increment' // this.add()를 this.$store.commit('increment')에 매핑한다.
    })
  }
}

```
## Actions
* Actions의 주요 목적은 Mutations를 실행시키는 역할을 한다.
* 비동기 처리다. 순서에 상관없이 먼저 종료된 함수의 피드백을 받아 후속 초리를 한다.
* `dispatch('함수명','전달인자')`로 실행 시킬 수 있다.(전달인자 생략 가능)
* 함수 형태로 작성하며 보통 비동기 처리이기 때문에 콜백함수를 주로 작성한다.

`store/index.js`
```js
export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    addCounter: function (state, payload) {
      state.counter += payload;
    }
  },
  actions: {
    addCounter: function (context) {
      context.commit('addCounter');
    },
  }
  // ES6 Destructuring
  actions: {
    addCounter ({ commit }) {
      commit('addCounter')
    }
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
    addCounter() {
      this.$store.dispatch("addCounter");
    }
  }
};
</script>
```

### Dispatch Action
왜 mutations의 `commit`을 호출하지 않고 actions의 `dispatch`를 통해서 호출하는 걸까? mutations는 동기적이여야 한다는걸 기억하는가? actions는 비동기로 작업을 수행 할 수 있기 때문이다.
```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```
아래 예제는 비동기 API호출과 여러 개의 Mutaitions을 커밋하는 예제다. 
```js
actions: {
  checkout ({ commit, state }, products) {
    // 장바구니에 현재있는 항목을 저장하십시오.
    const savedCartItems = [...state.cart.added]

    // 결제 요청을 보낸 후 장바구니를 비웁니다.
    commit(types.CHECKOUT_REQUEST)

    // 상점 API는 성공 콜백 및 실패 콜백을 받습니다.
    shop.buyProducts(
      products,
      // 요청 성공 핸들러
      () => commit(types.CHECKOUT_SUCCESS),
      // 요청 실패 핸들러
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```
### mapActions
다른거와 마찬가지로 `mapActions` 헬퍼를 사용할 수 있다.
```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment' // this.increment()을 this.$store.dispatch('increment')에 매핑

      // mapActions는 페이로드를 지원합니다.
      'incrementBy' // this.incrementBy(amount)를 this.$store.dispatch('incrementBy', amount)에 매핑
    ]),
    ...mapActions({
      add: 'increment' // this.add()을 this.$store.dispatch('increment')에 매핑
    })
  }
}
```

### with Promise, async
`store.dipatch`가 트리거 된 액션핸들러에 의해 반환된 promise를 처리 할 수 있고 promise를 반환한다.
```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```
```js
store.dispatch('actionA').then(() => {
  // ...
})
```
안에 또 다른 액션을 사용할 수 있다.
```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```
`store.dispatch`가 다른 모듈에서 여러 액션 핸들러를 트리거 하는것이 가능하다. 모든 트리거 된 처리가 완료 되었을 때 처리되는 promise이다. 
```js
// getData() 및 getOtherData()가 Promise를 반환한다고 가정합니다.
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // actionA가 끝나기를 기다립니다.
    commit('gotOtherData', await getOtherData())
  }
}
```

## Modules
Vuex는 모듈화를 지원한다.
```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA'의 상태
store.state.b // -> moduleB'의 상태
```

### NameSpace
기본적으로 모듈내의 actions, mutations, getter는 전역 네임스페이스를 사용하고 있어서 여러 모듈이 동일한 mutation/actions에 반응할 수 있다. 이를 방지하기 위해서는 `namespaced: true`를 명시해주면 해당 모듈은 전부 경로를 기반으로 네임 스페이스가 지정된다
```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 모듈 자산
      state: () => ({ ... }), // 모듈 상태는 이미 중첩되어 있고, 네임스페이스 옵션의 영향을 받지 않음
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 중첩 모듈
      modules: {
        // 부모 모듈로부터 네임스페이스를 상속받음
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 네임스페이스를 더 중첩
        posts: {
          namespaced: true,

          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```
`root: true`를 사용하면 전역 네임스페이스에 있는 store에 접근 가능하다.
```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // `getters`는 해당 모듈의 지역화된 getters
      // getters의 4번째 인자를 통해서 rootGetters 사용 가능
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 디스패치와 커밋도 해당 모듈의 지역화된 것
      // 전역 디스패치/커밋을 위한 `root` 옵션 설정 가능
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```
아래처럼 정의할때 `root: true`를 넣으면 모듈에서 전역으로 등록 가능하다.
```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```

### 헬퍼에서의 네임스페이스 바인딩
```js
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```
`createNamespacedHelpers` 를 사용하면 네임스페이스 헬퍼를 생성할 수 있다.
```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // `some/nested/module`에서 찾음
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // `some/nested/module`에서 찾음
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```