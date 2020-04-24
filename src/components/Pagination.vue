<template>
	<div class="Pagination">
		<button @click="changePage">首页</button>
		<button @click="changePage">上一页</button>
		<button v-if="currentPage>5" @click="more" class="pre">...</button>
		<button v-for="page in pages" @click="changePage(page)" :class="{current:page==currentPage}">{{page}}</button>
		<button @click="more" class="next">...</button>
		<button @click="changePage">下一页</button>
	</div>
</template>

<script>
export default {
	name:'Pagination',
	data(){return{
		pages:[1,2,3,4,5],
		currentPage:1
	}},
	methods:{
		changePage(page){
			if(typeof page !='number'&& typeof page!='string'){
				switch(page.currentTarget.innerText){
					case '首页':
					  this.pages=[1,2,3,4,5]
					  this.changePage(1)
					break;
					case '上一页':
					  this.currentPage > 1 && this.changePage(this.currentPage-1)
					break;
					case '下一页':
					  this.changePage(this.currentPage+1)
					break;
				}
				return
			}
			this.currentPage=page
			if(this.currentPage==this.pages[4]){
				this.pages.shift(0)
				this.pages.splice(4,0,this.pages[3]+1)
			}else if(this.currentPage==this.pages[0]&&this.currentPage!=1){
				this.pages.unshift(this.pages[0]-1)
				this.pages.splice(5,1)
			}
		},
		more(e){
				if(e.target.className=='pre'){
					this.pages=this.pages.slice(0,5).map(val=>val-2)
					this.currentPage=this.pages[2]
				}else{
				this.pages=this.pages.slice(0,5).map(val=>val+2)
				this.currentPage=this.pages[2]
				}
		}
	},
	watch:{
		currentPage(val,old){
			this.$emit('input',this.currentPage)
		}
	}

}
</script>
<style scoped>
.Pagination{
	padding: 10px;
}
.current{
	background-color:grey;
	color:white;
}
button{
	padding:0.5em 0.8em;
	background-color: white;
	border:1px solid grey;
	vertical-align:middle
}
button:focus{
	outline:none;
}
</style>
