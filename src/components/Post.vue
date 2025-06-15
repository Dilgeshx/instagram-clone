<template>
  <div class="post">
    <div class="post-header">
      <span class="username">{{ username }}</span>
    </div>
    <img :src="image" alt="Post image" class="post-image" />
    <div class="caption">{{ caption }}</div>
  </div>
</template>

<script>
export default {
  name: 'InstagramPost', 
  props: ['username', 'image', 'caption']
}
</script>

<style scoped>
.post {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}
.post-header {
  padding: 12px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.post-image {
  width: 100%;
  display: block;
}
.caption {
  padding: 12px;
  font-size: 15px;
}
.username {
  color: #262626;
}
</style>