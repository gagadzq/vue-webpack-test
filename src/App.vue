<template>
  <div id="app">
    <div>
      <Header></Header>
      <Todo></Todo>
    </div>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Todo from './views/todo/todo.vue'

export default {
  name: 'app',
  components: {
    Header,
    Todo
  },
  data() {
    return {
      hello: 'hello vue!'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


