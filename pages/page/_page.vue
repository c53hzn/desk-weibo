<template>
  <div class="main-content">
    <div class="blog-wrap">
      <main class="blog-main">
        <DeskBanner deskOwner="Zhenni J. HOU"></DeskBanner>
        <DeskPost 
        :url="'/post/'+post.id"
        author="Zhenni J. HOU" 
        v-for="(post) in posts" 
        :key="post.id"
        :id="post.id" :time="post.time" :content="post.content"
        :link="post.link"
        :picture="post.picture"
        ></DeskPost>
        <Pagination :total="page_total" :perPage="5"></Pagination>
      </main>
    </div>
  </div>   
</template>

<script>
import DeskPost from "~/components/Desk-Post.vue";
import DeskBanner from "~/components/Desk-Banner";
import zoompic from "~/plugins/zoompic";
import getDeskpostByPage from "~/utils/getDeskpostByPage";
import Pagination from "~/components/Pagination";

export default {
  layout: "page",
  components: {
    DeskPost,
    Pagination,
    DeskBanner
  },
  async asyncData(context) {
    var that = this;
    var deskPosts = await getDeskpostByPage(context.$content, context.params, {perPage: 5}, context.error);
    var pageNum = context.params.page;
    return {
      pageNum,
      posts: deskPosts.paginatedArticles,
      page_total: deskPosts.allArticles.length
    }
  },
  mounted: function(){
    var that = this;
    that.$nextTick(() => {
      //add zoompic for imgs
      zoompic([[".desk-unit", true, true, "img"]]);
    });
  },
  head() {
    return {
      title: "第"+this.pageNum+"页",
      meta: [
        { 
          hid: 'description',
          name: 'description',
          content: "Jenny的自建微博，纯静态网站，托管在GitHub。"
        }
      ]
    }
  }
};
</script>
