<template>
  <div>
    <AppNavbar v-if="currentUser" @toggle-search="showSearch = !showSearch" :isDark="isDark" @toggle-dark="toggleDark" />
    <LoginRegister v-else @login="onLogin" />
    <div v-if="currentUser" class="container">
      <div v-if="showSearch" class="search-bar">
        <input
          v-model="searchQuery"
          placeholder="Ara"
          @input="filterPosts"
          @keyup.esc="clearSearch"
          autofocus
        />
        <button class="close-btn" @click="clearSearch" title="Kapat">×</button>
      </div>
      <main>
        <InstagramPost
          v-for="post in filteredPosts"
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
import LoginRegister from './components/LoginRegister.vue'
import InstagramPost from './components/Post.vue'

export default {
  name: 'App',
  components: { AppNavbar, LoginRegister, InstagramPost },
  data() {
    return {
      isDark: false,
      currentUser: localStorage.getItem('currentUser') || null,
      showSearch: false,
      searchQuery: '',
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
      ],
      filteredPosts: []
    }
  },
  watch: {
    isDark(newVal) {
      if (newVal) {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
    }
  },
  created() {
    this.filteredPosts = this.posts
  },
  mounted() {
    window.addEventListener('beforeunload', this.logoutOnLeave)
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.logoutOnLeave)
  },
  methods: {
    onLogin(username) {
      this.currentUser = username
    },
    filterPosts() {
      const q = this.searchQuery.trim().toLowerCase()
      if (!q) {
        this.filteredPosts = this.posts
      } else {
        this.filteredPosts = this.posts.filter(post =>
          post.username.toLowerCase().includes(q)
        )
      }
    },
    clearSearch() {
      this.showSearch = false
      this.searchQuery = ''
      this.filteredPosts = this.posts
    },
    logoutOnLeave() {
      localStorage.removeItem('currentUser')
      this.currentUser = null
    },
    toggleDark() {
      this.isDark = !this.isDark
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
.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}
.dark-mode .container {
  background: #1e1e1e;
  color: #e0e0e0;
}
body.dark-mode {
  background: #18191a;
}
body.dark-mode .container {
  background: #23272f;
  color: #f1f1f1;
}
body.dark-mode .navbar {
  background: #23272f !important;
  border-bottom: 1px solid #333 !important;
}
body.dark-mode .logo-text {
  color: #f1f1f1 !important;
}
body.dark-mode .icon-btn {
  color: #f1f1f1 !important;
}
body.dark-mode .icon-btn:hover {
  color: #90caf9 !important;
}
body.dark-mode .post {
  background: #23272f !important;
  border: 1px solid #333 !important;
}
body.dark-mode .caption,
body.dark-mode .username {
  color: #f1f1f1 !important;
}
body.dark-mode .search-bar {
  background: #23272f !important;
}
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0 18px 0;
  background: #f5f6fa;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.search-bar input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: inherit;
  outline: none;
}
.search-bar button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #0095f6;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
}
.search-bar button:hover {
  background: #0077c2;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
  padding: 0 8px;
  line-height: 1;
}
.close-btn:hover {
  color: #0095f6;
}
</style>