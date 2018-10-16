<template>
  <header class="main-header">
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  data () {
    return {
      title: 'JTodo'
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-header {
    text-align: center;
    h1 {
      font-size: 100px;
      color: rgba(250, 35, 35, 0.4);
      padding-top: 50px;
    }
  }
</style>


