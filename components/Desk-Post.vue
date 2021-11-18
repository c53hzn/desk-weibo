<template>
	<div class="desk-unit">
    <div class="share">
      <div class="media blue">
        <a target="_blank" :href="'https://www.facebook.com/sharer/sharer.php?u=https://moonhea.com'+url"><i class="fa fa-facebook-f"></i></a>
      </div>
      <div class="media blue">
        <a target="_blank" :href="'http://twitter.com/share?url=https://moonhea.com'+url"><i class="fa fa-twitter"></i></a>
      </div>
      <div class="media red">
        <a target="_blank" :href="'https://service.weibo.com/share/share.php?url=https://moonhea.com'+url"><i class="fa fa-weibo"></i></a>
      </div>
    </div>
    <div class="desk-unit-main">
      <div>
        <span class="author">{{author}}</span>
        <span class="time">{{time}}</span>
      </div>
      <div class="content" v-if="content">
        <p v-for="(p,i) in content" :key="'p'+i">
          {{p}}
        </p>
      </div>
      <div class="link" v-if="link">
        <p v-for="(l,i) in link" :key="'link'+i">
          <a target="_blank" :href="l.href">{{l.text}}<i class="fa fa-external-link"></i></a>
        </p>
      </div>
      <div class="picture" v-if="picture">
        <div class="img" 
        :class="imgClass"
        v-for="(pic,i) in picture" :key="'pic'+i">
          <img :src="pic">
        </div>
      </div>
      <nuxt-link v-if="!isDetail" :to="url" 
      class="read-more">
        <span><i class="fa fa-comment"></i>&nbsp;查看评论</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var imgClass = "";
    if (this.picture) {
      imgClass = this.picture.length==1?"col-1"
      :this.picture.length==2?"col-2"
      :this.picture.length==4?"col-2"
      :"col-3"
    }
    return {
      imgClass
    }
  },
  props: {
    url: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    content: {
      type: Array,
      required: true
    },
    picture: {
      type: Array,
    },
    link: {
      type: Array
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.desk-unit {
  margin: 0px 0px 10px 0px;
  padding: 0px 0px 10px 0px;
  border-top: 2px solid rgba(192,192,192,0.4);
  display: flex;
  justify-content: flex-start;
}
.desk-unit .share {
  font-size: 24px;
}
.desk-unit .share .media {
  margin-right: 10px;
  text-align: center;  background: rgba(192,192,192,0.4);
  cursor: pointer;
}
.desk-unit .share .media:hover {
  background: rgba(192,192,192,0.2);
  transition: background .5s;
}
.desk-unit .share .media a {
  padding: 10px;
  width: 100%;
  height: 100%;
  color: inherit;
  display: block;
}
.desk-unit-main {
  width: 100%;
}
.desk-unit .author {
  padding: 16px 0px 16px 0px;
  font-size: 24px;
  font-weight: bold;
}
.desk-unit .time {
  margin-left: 10px;
  color: silver;
}
.desk-unit .content p {
  text-align: justify;
}
.main-color {
  color: #182b54;
}
/* 九宫格图片 */
.desk-unit .picture {
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
}
.desk-unit .picture .img {
  height: 0px;
  position: relative;
  margin: 0px 10px 10px 0px;
}
.desk-unit .picture .img {
  height: 0px;
  position: relative;
  margin: 0px 10px 10px 0px;
}
.desk-unit .picture .col-1 {
  width: 60%;
  padding-bottom: 60%;
}
.desk-unit .picture .col-2 {
  width: 40%;
  padding-bottom: 40%;
}
.desk-unit .picture .col-3 {
  width: 30%;
  padding-bottom: 30%;
}
.desk-unit .picture .img img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 九宫格图片 */

@media all and (max-width: 425px) {
  .desk-unit .author {
    font-size: 18px;
  }
  .desk-unit .time {
    margin-left: 0px;
    display: block;
  }
  .desk-unit .picture .img {
    margin: 0px 5px 5px 0px;
  }
}
</style>
