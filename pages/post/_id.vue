<template>
  <div class="main-content">
    <div class="blog-wrap">
      <main class="blog-main">
        <nuxt-link to="/" class="no-decor-link">
          <DeskBanner deskOwner="Zhenni J. HOU"></DeskBanner>
        </nuxt-link>
        <DeskPost 
        :url="'/post/'+post.id"
        author="Zhenni J. HOU" 
        :id="post.id" :time="post.time" :content="post.content"
        :link="post.link"
        :picture="post.picture"
        :isDetail="true"
        :share_content="share_txt"
        ></DeskPost>
        <div id="disqus_thread">
          <!-- <div class="loadCommentBtn read-more" @click="loadDisqus">
            <i class="fa fa-comment" aria-hidden="true"></i>
            加载评论
          </div> -->
        </div>
      </main>
    </div>
  </div>
</template>


<script type="text/javascript">
import zoompic from "../../plugins/zoompic";
import disqus from "../../plugins/disqus";
import DeskPost from "~/components/Desk-Post.vue";
import DeskBanner from "~/components/Desk-Banner";
import getDeskpostById from "~/utils/getDeskpostById";

export default {
  layout: "page",
  components: {
    DeskPost,
    DeskBanner
  },
  async asyncData(context) {
    const post = await getDeskpostById(context.$content, context.params);
    var share_txt = "";
    if (post.post.content) {
      share_txt = post.post.content.join("");
      share_txt = share_txt.length>97
      ?share_txt.substring(0,97)+"..."
      :share_txt;
    }
    return {
      share_txt,
      post: post.post
    };
  },
  mounted: function(){
    var that = this;
    that.$nextTick(() => {
      window.PAGE_URL = "https://www.houzhenni.com" + window.location.pathname;
      window.PAGE_IDENTIFIER = window.location.pathname;
      that.loadDisqus();
      //add zoompic for imgs
      zoompic([[".blog-main img",true]]);
    });
  },
  methods: {
    loadDisqus() {
      document.getElementById("disqus_thread").innerHTML = "";
      disqus("disqus_thread");
    }
  },
  head() {
    return {
      title: "发表于"+this.post.time+"的微博",
      meta: [
        { hid: 'date', name: 'date', content: this.post.time },
        { hid: 'description', 
          name: 'description', 
          content: "发表于"+this.post.time+"的微博: "+this.share_txt
        },
      ]
    }
  }
}
</script>

<style type="text/css">
a#comment-link {
  top: 0px;
}
.blog-desc {
  margin: 10px 0px;
  padding: 10px;
  color: #666;
  background-color: rgba(0,0,0,0.025);
}
#disqus_thread {
  margin-top: 20px;
}
.prev-next {
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.prev-next a {
  display: block;
}
.prev, .next {
  max-width: 42%;
  color: gray;
  cursor: pointer;
}
.prev {
  text-align: left;
}
.next {
  text-align: right;
}
.prev:hover, .next:hover {
  color: black;
}
.prev-next-arrow {
  font-size: 28px;
}
#comment {
  margin: 40px 0px 0px 0px;
  text-align: center;
}
.loadCommentBtn {
  margin-bottom: 20px;
  cursor: pointer;
  display: inline-block;
}
.loadCommentBtn:hover {
  color: gray;
}
@media all and (max-width: 768px) {
  .nuxt-content h2, .nuxt-content h3, .nuxt-content h4, .nuxt-content h5 {
  	margin: 9px 0px;
  }
  .nuxt-content blockquote{
    margin: 16px 0px;
  }
  .nuxt-content iframe {
    margin: 0px;
  }
  .nuxt-content iframe.youtube {
    margin: 8px auto;
    width: 100%;
  }
  .nuxt-content ul {
  	padding-left: 20px;
  }
  .nuxt-content pre {
  	margin-left: 0px;
  	margin-right: 0px;
  }
  .prev, .next {
    margin: 0px;
  }
  #comment {
    margin: 40px 0px 0px 0px;
  }
}
@media all and (max-width: 539px) {
  .nuxt-content iframe.youtube {
    height: auto;
  }
}
</style>
