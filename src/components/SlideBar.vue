<template>
	<div class="SlideBar">
		<div class="userCard">
			<p>作者</p>
			<span class="userInfo">
				<router-link :to="{name:'user_info',params:{loginname:userInfo.loginname}}"><img :src="userInfo.avatar_url" alt=""></router-link>
				<span>{{userInfo.loginname}}</span>
			</span>
			<div>
			<span>注册积分 {{userInfo.score}}</span>
			<span>gitHub {{userInfo.githubUsername}}</span>
			<span>注册时间 {{userInfo.create_at|formatDate}}</span>
			</div>
		</div>
		<div class="recentTopics">
		<p>最近创建的话题</p>
		<ul>
			<li v-for="topic in topics.slice(0,5)">
				<router-link :to="{name:'article',params:{id:topic.id,name:topic.author.loginname}}">{{topic.title}}</router-link>
			</li>
		</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'SlideBar',
		data(){
			return {userInfo:{},topics:[]}
		},
		methods:{
			getData(){
				var name=this.$route.params.name
				this.$http.get(`https://cnodejs.org/api/v1/user/${name}`)
				.then(res=>{this.userInfo=res.data.data;this.topics=this.userInfo.recent_topics})
			}
		},
		beforeMount(){
			this.getData()
		}
	}
</script>

<style scoped>
	.SlideBar{
		float: right;
		max-width: 300px;
		font-size: 14px;
	}
	.SlideBar>*>*{
		padding: 10px
	}
	.userCard,.recentTopics{
		background-color: white;
		margin-bottom: 14px;
	}
  .userInfo{
    display: inline-flex;
    align-items: flex-end;
  }
	.recentTopics>p,.userCard>p{
		background-color: rgb(246,246,246);
	}
	.userCard>div>span{
		display: block;
		margin:4px 0;
	}
  .userInfo img{
		width: 55px;
		height: 55px;
    margin-right: 4px;
	}
	ul>li{
		list-style: none;
		margin:6px 0;

	}
	a{
		text-decoration: none;
		color:grey;
		display:inline-block;
		white-space: nowrap;
		overflow: hidden;
		max-width:280px;
		text-overflow: ellipsis;
	}
</style>
