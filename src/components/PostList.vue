<template>
  <div>
  <Loading v-if="loading" class="loading"/>
    <div class="postList" v-else>
      	<ul>
          <li class="liNavBar">
            <a v-for="(tab,key) in tabs" @click="getData(key)" :class="{active: currentTab === key}" href="#">{{tab}}</a>
          </li>
      		<li v-for="item in dataList">
      			<img :src="item.author.avatar_url" alt="">
      			<span class="replyAndVisit">
      				<span class="reply_count">{{item.reply_count}}</span>/{{item.visit_count}}
      			</span>
      			<span :class="[{good:item.good,top:item.top,tab:!item.good&&!item.top}]">{{item|formatTab}}</span>
      			<router-link :to="{name:'article',params:{id:item.id,name:item.author.loginname}}">
      			<span class="title">
      					{{item.title}}
      			</span>
      			</router-link>
      			<span class="reply_time">
      				{{item.last_reply_at|formatDate}}
      			</span>
      		</li>
      	</ul>
      <Pagination v-model="currentPage"></Pagination>
    </div>
  </div>
</template>

<script>
    import Pagination from './Pagination'
    import Loading from "./loading"

    export default {
        name: 'PostList',
        data() {
            return {
                loading:true,
                dataList: [],
                currentPage: 1,
                currentTab: '',
                tabs:{
                    'all':'全部',
                    'good':'精华',
                    'share':'分享',
                    'ask':'问答',
                    'job':'招聘'
                }
            }
        },
        components: {
            Pagination, Loading
        },
        methods: {
            getData(tab) {
                if(tab) {
                    this.currentTab = tab
                }
                this.$http.get('https://cnodejs.org/api/v1/topics', {
                    params: {
                        page: this.currentPage,
                        limit: 20,
                        tab: this.currentTab
                    }
                }).then(res => {
                    this.dataList = res.data.data
                    this.loading = false
                }).catch(err => alert(err))
            }
        },
        beforeMount() {
            this.getData('all')
        },
        watch: {
            currentPage(val, old) {
                this.getData()
            }
        }
    }

</script>


<style scoped>
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
  }
  .postList {
    background-color: rgb(255, 255, 255);
    position: relative;
    font-size: 12px;
    width:80vw;
  }

  .liNavBar {
    background-color: rgb(246, 246, 246);
    font-size: 14px;
  }

  .liNavBar > a {
    color: rgb(128, 189, 1);
    margin: 0 16px;
    padding: 2px 4px;
    border-radius: 10%
  }

  ul > li {
    list-style: none;
    border-bottom: 0.5px solid rgb(225, 225, 225);
    display: flex;
    align-items: center;
    padding: 10px 10px;
  }

  ul > li > img {
    width: 30px;
    height: 30px
  }

  span {
    margin: 0 4px 0;
  }

  .replyAndVisit {
    width: 60px;
    text-align: center;
  }

  .reply_count {
    margin: 0;
    color: grey;
  }

  .reply_time {
    margin-left:auto;
    margin-right:10px;
    flex-shrink:0
  }

  .liNavBar > .active, .top, .good {
    padding: 2px 4px;
    background-color: rgb(128, 189, 1);
    color: white;
    border-radius: 10%;
    flex-shrink:0;
  }

  .tab {
    padding: 2px 4px;
    background-color: rgb(225, 225, 225);
    color: grey;
    border-radius: 10%;
    flex-shrink:0;
  }

  .title {
    font-size: 16px;
    color:#333;
  }
  @media only screen and (max-width: 375px) {
    .postList{
      width: 100vw;
    }
    .title{
      font-size:14px;
    }
}
</style>
