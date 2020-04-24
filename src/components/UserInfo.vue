<template>
	<div class="UserInfo">
		<div class="userInformation">
			<span>
				<img :src="userInfo.avatar_url" alt="">
				<span>{{userInfo.loginname}}</span>
			</span>
			<span>注册积分 {{userInfo.score}}</span>
			<span>gitHub {{userInfo.githubUsername}}</span>
			<span>注册时间 {{userInfo.create_at|formatDate}}</span>
		</div>
		<div class="recentTopics">
		<p>最近创建的话题</p>
		<ul>
			<li v-for="topic in topics">
				<router-link :to="{name:'article',params:{id:topic.id,name:topic.author.loginname}}">{{topic.title}}</router-link>
			</li>
		</ul>
		</div>
		<div class="recentReplies">
		<p>最近参与的话题</p>
		<ul>
			<li v-for="reply in replies">
				<router-link :to="{name:'article',params:{id:reply.id,name:reply.author.loginname}}">{{reply.title}}</router-link>
			</li>
		</ul>
		</div>


	</div>
</template>

<script>
	export default {
		name:'UserInfo',
		data(){
			return {userInfo:{},replies:[],topics:[]}
		},
		methods:{
			getData(){

				this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`)
				.then(res=>{
					this.userInfo=res.data.data;
					this.replies=this.userInfo.recent_replies
					this.topics=this.userInfo.recent_topics
				})
			}
		},
		beforeMount(){
			this.getData()
		}
	}

</script>
<style scoped>
.UserInfo{
	background-color: rgb(225,225,225);
	margin:20px 60px;
	width: 75%;
	font-size: 14px;
}
.UserInfo>*{
	background-color:white;
}
.userInformation{
	padding: 10px;
	margin:0 0 14px;
}
	.userInformation img{
		width: 50px;
		height: 50px;
    margin-right: 8px;
	}
	.userInformation>span{
		margin:10px;
		display: block;
	}
	.userInformation>span:nth-child(1){
		display: flex;
		align-items: flex-end;
    font-weight: bold;
	}
	.recentTopics,.recentReplies{
		margin:14px 0;
	}
	.recentTopics>p,.recentReplies>p{
		background-color: rgb(246,246,246);
		padding: 10px 12px
	}
	ul>li{
	list-style: none;
	padding: 10px 12px;
	border-bottom: 1px solid rgb(246,246,246)
	}
	a{
		color:rgb(0,136,204);
		font-size: 16px
	}

</style>
