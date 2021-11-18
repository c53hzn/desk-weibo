<template>
  <div class="blog-wrap">
    <main class="blog-main">
      <nuxt-link to="/" class="no-decor-link">回到首页</nuxt-link>
    </main>
  </div>
</template>

<script type="text/javascript">
export default {
  layout: "page",
  head () {
    return {
      title: "404",
      meta: [
        { hid: 'description', name: 'description', content: "Jenny的自建微博，纯静态网站，托管在GitHub。" }
      ]
    }
  }
}
</script>
