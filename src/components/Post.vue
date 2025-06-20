<template>
  <div class="post">
    <div class="post-header">
      <span class="username">{{ username }}</span>
    </div>
    <img v-if="image" :src="image" alt="Post image" class="post-image" />
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
  transition: background 0.2s, border 0.2s;
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


body.dark-mode .post {
  background: #23272f;
  border: 1px solid #333;
}
body.dark-mode .caption,
body.dark-mode .username {
  color: #f1f1f1;
}

@media (max-width: 600px) {
  .post-image {
    max-width: 100vw;
    height: auto;
  }
  button,
  .icon-btn {
    font-size: 1rem;
  }
}
</style>