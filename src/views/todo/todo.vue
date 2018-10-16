<template>
  <section class="todo-app">
    <input
      type="text"
      class="add-todo"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      v-model="thisTodo"
      @keyup.enter="addTodo"
    >
    <div v-for="todoItem in filteredTodos" :key="todoItem.id" class="todo-item">
      <input
        type="checkbox"
        class="todo-check"
        v-model="todoItem.completed"
      >
      <label>{{ todoItem.content }}</label>
      <button class="delete" @click="deleteTodo(todoItem.id)"></button>
    </div>
    <div class="buttons">
      <ul>
        <li class="left">{{ leftNumber }} ietms left</li>
        <li class="center">
          <button @click="toggleFilter('all')">all</button>
          <button @click="toggleFilter('active')">active</button>
          <button @click="toggleFilter('completed')">completed</button>
        </li>
        <li class="right">
          <span @click="clearCompleted">Clear Completed</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>

let id = 0

export default {
  data () {
    return {
      thisTodo: '',
      todoList: [],
      filter: 'all',
    }
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todoList
      } else if (this.filter === 'completed') {
        return this.todoList.filter(todo => todo.completed === true)
      } else if (this.filter === 'active') {
        return this.todoList.filter(todo => todo.completed === false)
      }
    },
    leftNumber() {
      return this.todoList.filter(todo => !todo.completed).length
    }
  },
  methods: {
    addTodo() {
      this.todoList.unshift(
        { id: id++, completed: false, content: this.thisTodo }
      )
      this.thisTodo = ''
    },
    deleteTodo(id) {
      this.todoList.splice(id-1, 1)
    },
    toggleFilter(state) {
      this.filter = state
    },
    clearCompleted() {
      this.todoList = this.todoList.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="scss" scoped>
  .todo-app {
    width: 700px;
    background: #fff;
    margin: 0 auto;
    padding: 0 10px;
    .add-todo {
      box-sizing: border-box;
      width: 100%;
      padding: 6px;
      border: 0;
      font-size: 24px;
      padding: 20px 20px 20px 68px;
    }
  }
  .todo-item {
    position: relative;
    width: 100%;
    height: 58px;
    border-bottom: 1px solid #eee;
    font-size: 22px;
    &:hover{
      .delete:after {
        content: '×'
      }
    }
    label{
      white-space: pre-line;
      word-break: break-all;
      padding: 0 60px 0 68px;
      line-height: 58px;
      display: block;
    }
    &.completed{
      label{
        color: #d9d9d9;
        text-decoration: line-through;
      }
    }
  }
  .todo-check {
    text-align: center;
    position: absolute;
    top: 8px;
    bottom: 0;
    left: 10px;
    width: 40px;
    height: 40px;
    line-height: 58px;
    appearance: none;
    -webkit-appearance: none;
    &:after{
      content: url('../../assets/images/round.svg')
    }
    &:checked:after{
      content: url('../../assets/images/done.svg')
    }
  }
  .delete{
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
    background-color: transparent;
    border-width:0;
    cursor: pointer;
    outline: none;
  }
  ul, li {
    list-style: none;
    display: inline-block;
  }
  .buttons {
    width: 100%;
    position: relative;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    ul {
      width: 100%;
    }
    .left {
      float: left;
      width: 200px;
    }
    .center {
      text-align: center;
      position: absolute;
      left: 200px;
      right: 200px;
      button {
        padding: 5px 10px;
        font-size: inherit;
        background: transparent;
        border-radius: 5px;
      }
    }
    .right {
      float: right;
      width: 150px;
      cursor: pointer;
    }
  } 
</style>


