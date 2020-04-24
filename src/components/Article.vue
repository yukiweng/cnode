<template>
<div class="article" v-if="!loading">
	<div>
	<div class="header">
		<div>
		<span :class="[{good:topicData.good,top:topicData.top,tab:!topicData.good&&!topicData.top}]">
		{{topicData|formatTab}}</span>
		<h1 class="title">{{topicData.title}}</h1>
		</div>
		<div>
		<ul>
			<li>• 发布于{{topicData.create_at|formatDate}}</li>
			<li v-if="topicData.author">• 作者{{topicData.author.loginname}}</li>
			<li>• {{topicData.visit_count}}次浏览</li>
			<li>• 来自{{topicData|formatTab}}</li>
		</ul>
		</div>
	</div>
		<div class="content markdown-body" v-html="topicData.content"></div>
	</div>

	<div class="replyList" v-if="replies.length>0">
		<p class="reply_count">{{replies.length}} 回复</p>
		<ul>
			<li v-for="(reply,index) in replies" :class="{nice:reply.ups.length>2}">
				<div class="author">
					<div>
					<router-link :to="{name:'user_info',params:{loginname:reply.author.loginname}}">
						<img :src="reply.author.avatar_url" alt="">
					</router-link>
					<router-link :to="{name:'user_info',params:{loginname:reply.author.loginname}}">
						<span>{{reply.author.loginname}}</span>
					</router-link>


					<span>{{index+1}}楼</span>
					<span>{{reply.create_at|formatDate}}</span>
					</div>
					<span v-if="reply.ups.length>0">赞 {{reply.ups.length}}</span>
				</div>
				<div class="markdown-body" v-html="reply.content"></div>
			</li>
		</ul>
	</div>

</div>
</template>




<script>
import markdown from 'github-markdown-css'
	export default {
		name:'Article',
		data(){
			return {
			    loading:true,
			    topicData:{},
          replies:[],
          author:{}
			}
		},
		methods:{
			getData(){
				var id=this.$route.params.id
				this.$http.get('https://cnodejs.org/api/v1/topic/'+id,{
					mdrender:'true'
				})
				.then(res=>{
					this.topicData=res.data.data
					this.replies=this.topicData.replies
          this.loading = false
				})
				.catch()
			}
		},
		beforeMount(){
			this.getData()

		},
		watch:{
			$route:function(to,from){
				this.getData()
			}
		}
	}
</script>

<style scoped>
.markdown-body {
    box-sizing: border-box;
    padding: 0px 38px;
}

.article{
	background-color: rgb(225,225,225);
	width: 70%;
	font-size: 14px;
}
.article>*{
	background-color: white
}
.header{
	height: 88px;
	padding:10px;
	border-bottom: 0.5px solid rgb(225,225,225)
}
.header>div{
	display:flex;
	align-items: center;
}
.header>div:nth-child(1){
	height: 60%
}
.header>div:nth-child(2){
	height: 40%;
	color:grey;
}
.header .title{
	font-size: 20px;
	margin: 10px
}
	.top,.good{

		padding:2px 4px;
		background-color: rgb(128,189,1);
		color:white;
		border-radius: 10%
	}
	.tab{
		padding:2px 4px;
		background-color: rgb(225,225,225);
		color:grey;
		border-radius: 10%
	}
	.header ul>li{
	display: inline-block;
	margin: 2px;
	}
  .content{
    padding:20px;
  }
	.replyList{
		margin:14px 0;
	}

	.replyList .reply_count{
		background-color:rgb(246,246,246);
		padding: 10px
	}
	.replyList>ul>li{
			list-style: none;
			border-bottom: 0.5px solid rgb(225,225,225);
			padding:10px;
    display: flex;
    flex-direction: column;
	}
	.replyList>ul>li.nice{
		background-color: rgb(244,252,240);
	}
.replyList img{
	width: 30px;
	height: 30px;
	display: inline-block;
}
.replyList li>.author{
	display: flex;
	justify-content: space-between;

}
.replyList li>.author>div{
		display: flex;
		align-items: flex-start;
}
.replyList span{
	margin-left: 8px
}

</style>
