<template>
  <div class="container-main">
    <ForkOnGithub></ForkOnGithub>
    <nuxt />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer';
import ForkOnGithub from '../components/Fork-On-Github';

export default {
  components: {
    Footer,
    ForkOnGithub
  }
}
</script>
