<template>
  <div>
    <AppNavbar />
    <div class="container">
      <main>
        <InstagramPost
          v-for="post in posts"
          :key="post.id"
          :username="post.username"
          :image="post.image"
          :caption="post.caption"
        />
      </main>
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue'
import InstagramPost from './components/Post.vue'

export default {
  name: 'App',
  components: { AppNavbar, InstagramPost },
  data() {
    return {
      posts: [
        {
          id: 1,
          username: 'kullanici1',
          image: 'https://picsum.photos/400/300?random=1',
          caption: 'İlk gönderi!'
        },
        {
          id: 2,
          username: 'kullanici2',
          image: 'https://picsum.photos/400/300?random=2',
          caption: 'Merhaba Vue!'
        }
      ]
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #fafafa;
}
.container {
  max-width: 900px; 
  margin: 40px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 24px;
}
header {
  text-align: center;
  margin-bottom: 32px;
}
main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>