<template>
  <div id="app">
    <Header></Header>
    <div class="main">
    <router-view name="main"></router-view>
    <router-view name="slideBar"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components:{
    Header
  }

}
</script>

<style>
*{margin:0;padding:0}
a{text-decoration: none;color:#333}
a:hover{text-decoration:underline;}
#app{
  background-color: rgb(225,225,225);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
}
.main{
  display: flex;
  justify-content: center;
  margin:20px 60px;
}
</style>
