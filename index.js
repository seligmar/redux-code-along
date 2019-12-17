import { createStore, combineReducers } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'COUNTER_UP':
      return state + 1
    case 'COUNTER_DOWN':
      return state === 0 ? state : state - 1
    case 'RESET':
      return 0
    default:
      return state
  }
}

const addToDo = (todos, action) => [
  ...todos,
  {
    id: Math.random(),
    text: action.payload,
    completed: false
  }
]

const removeToDo = (todos, action) =>
  todos.filter(todo => todo.id !== action.payload)

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return addToDo(state, action)
    case 'REMOVE_TODO':
      return removeToDo(state, action)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  counter: counterReducer,
  todo: todosReducer
})

const store = createStore(rootReducer)

const increaseCounter = () => store.dispatch({ type: 'COUNTER_UP' })
const decreaseCounter = () => store.dispatch({ type: 'COUNTER_DOWN' })
const resetCounter = () => store.dispatch({ type: 'RESET' })

const counterEl = document.querySelector('#number')
const btnDown = document.querySelector('#down')
const btnUp = document.querySelector('#up')
const btnReset = document.querySelector('#reset')

btnDown.addEventListener('click', decreaseCounter)
btnUp.addEventListener('click', increaseCounter)
btnReset.addEventListener('click', resetCounter)

store.subscribe(() => (counterEl.innerText = store.getState().counter))
