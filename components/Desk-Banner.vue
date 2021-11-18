<template>
  <div class="desk-banner">
    <div class="upper">
      <span class="left"></span>
      <span>&nbsp;&nbsp;Self-hosted Weibo OF&nbsp;&nbsp;</span>
      <span class="right"></span>
    </div>
    <div class="lower">
      {{deskOwner}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deskOwner: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.desk-banner {
  margin: 20px auto 60px auto;
  width: 480px;
  text-align: center;
  font-weight: bold;
}
.desk-banner .upper {
  font-size: 24px;
  display: flex;
  justify-content: space-between;
}
.desk-banner .upper .left {
  border-top: 8px solid;
  border-left: 8px solid;
  border-top-left-radius: 8px;
  flex-grow: 1;
  transform: translateY(12px);
}
.desk-banner .upper .right {
  border-top: 8px solid;
  border-right: 8px solid;
  border-top-right-radius: 8px;
  flex-grow: 1;
  transform: translateY(12px);
}
.desk-banner .lower {
  padding: 10px;
  font-size: 40px;
  border-left: 8px solid;
  border-right: 8px solid;
  border-bottom: 8px solid;
}

@media all and (max-width: 768px) {
  .desk-banner {
    margin: 0px auto 30px auto;
    width: 100%;
    font-size: 18px;
  }
}
@media all and (max-width: 425px) {
  .desk-banner .upper {
    font-size: 20px;
  }
}
</style>
