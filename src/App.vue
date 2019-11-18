<template>
  <div id="app">
    <Header></Header>
    <div class="main">
    <router-view name="slideBar"></router-view>
    <router-view name="main"></router-view> 

    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
export default {
  name: 'App',
  components:{
    Header
  }
  
}
</script>

<style>
*{margin:0;padding:0}
#app{
  background-color: rgb(225,225,225); 
  height: 100%
}
.main{
  width: 80%;
  margin:0 auto
}
</style>
