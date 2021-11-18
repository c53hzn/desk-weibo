<template>
  <div class="page-container">
  	<div style="text-align: center;">第{{currentPage}}页，共{{totalPages}}页</div>
  	<div class="pagination">
  		<span v-if="currentPage === 1" :class="disabledStyle">
		  首页
		</span>

		<nuxt-link
		  v-else
		  to="/"
		  :class="buttonStyles"
		>
		  首页
		</nuxt-link>

		<span class="page-prev-next-container">
		<span v-if="currentPage === 1" :class="disabledStyle">
		  上一页
		</span>
		<nuxt-link
		  v-else
		  :to="'/page/'+prevPage"
		  :class="buttonStyles"
		>
		  上一页
		</nuxt-link>
		<span v-if="currentPage === totalPages" :class="disabledStyle">
		  下一页
		</span>
		<nuxt-link
		  v-else
		  :to="'/page/'+nextPage"
		  :class="buttonStyles"
		>
		  下一页
		</nuxt-link>
		</span>

		<span v-if="currentPage === totalPages" :class="disabledStyle">
		  尾页
		</span>

		<nuxt-link
		  v-else
		  :to="'/page/'+totalPages"
		  :class="buttonStyles"
		>
		  尾页
		</nuxt-link>
  	</div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			buttonStyles: "page-prev-next",
			disabledStyle: "page-prev-next-disabled"
		}
	},
  props: {
    total: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },
    currentPage() {
      return parseInt(this.$route.params.page) || 1;
    },
    prevPage() {
      return this.currentPage > 1 ? this.currentPage - 1 : 1;
    },
    nextPage() {
      return this.currentPage < this.totalPages
        ? this.currentPage + 1
        : this.totalPages;
    },
  },
  // mounted() {
  // 	console.log("totalPages="+this.totalPages)
  // }
};
</script>

<style>
.page-container {
	margin-top: 40px;
}
.pagination {
	display: flex;
	justify-content: space-between;
}
.page-prev-next {
	padding: 4px;
	text-decoration: none;
}
.page-prev-next:hover {
	color: black;
}
.page-prev-next-disabled {
	padding: 4px;
	color: #ddd;
}
.page-prev-next-container {
	transform: translateY(4px);
}
</style>
