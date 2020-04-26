<template>
<div class="header">
	<img src="../assets/logo_light.svg" class="logo">
	<ul>
		<li><a href="">首页</a></li>
		<li><a href="">新手入门</a></li>
		<li><a href="">API</a></li>
		<li><a href="">关于</a></li>
		<li><a href="">注册</a></li>
		<li><a href="">登录</a></li>
	</ul>
</div>
</template>

<script>
	export default {
		name:'Header'
	}
</script>

<style scoped>

.header{
	background-color: rgb(68,68,68);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 250px
}
.logo{
	max-width:124px;
	max-height:30px;
}
ul{
	list-style: none;
}
ul>li{
	display:inline-block;
	margin-left:14px
}
a{
	color:rgb(204,204,204);
	font-size: 14px;
}
  @media only screen and (max-width: 375px){
    .header{
      flex-direction: column;
      padding:10px 12px;
    }
    ul{
      display: inline-flex;
      padding-top:10px;
    }
  }
</style>
