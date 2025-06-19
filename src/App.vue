<template>
  <div>
    <RainEffect :active="theme==='rain'" />
    <AppNavbar
      :theme="theme"
      @toggle-theme="toggleTheme"
      @open-modal="openModal"
      v-if="currentUser"
    />
    <LoginRegister v-else @login="onLogin" />
    <div v-if="currentUser" class="container">
      
      <div v-if="activeModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <template v-if="activeModal === 'addPost'">
            <AddPost :currentUser="currentUser" @add-post="handleAddPostAndClose" />
          </template>
          <template v-else-if="activeModal === 'search'">
            <div class="search-bar-modal">
              <input
                v-model="searchQuery"
                placeholder="Kullanıcı adına göre ara..."
                @input="filterPosts"
                autofocus
              />
              <button class="close-btn" @click="closeModal" aria-label="Kapat">×</button>
            </div>
          </template>
          <template v-else-if="activeModal === 'dm'">
            <div style="padding:24px;">Mesaj kutusu buraya gelecek.</div>
            <button class="close-btn" @click="closeModal" aria-label="Kapat">×</button>
          </template>
          <template v-else-if="activeModal === 'notifications'">
            <div class="notifications-modal">
              <div v-if="notifications.length === 0" class="empty-notification">
                Henüz bir bildirim yok.
              </div>
              <ul v-else>
                <li v-for="(notif, i) in notifications" :key="i">
                  {{ notif }}
                </li>
              </ul>
              <button class="close-btn" @click="closeModal" aria-label="Kapat">×</button>
            </div>
          </template>
        </div>
      </div>
      <PostBox :currentUser="currentUser" @add-post="handleAddPost" />
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
import AddPost from './components/AddPost.vue'
import PostBox from './components/PostBox.vue'
import RainEffect from './components/RainEffect.vue'

export default {
  components: { AppNavbar, LoginRegister, InstagramPost, AddPost, PostBox, RainEffect },
  data() {
    return {
      theme: 'light', // 'light', 'dark', 'rain'
      currentUser: localStorage.getItem('currentUser') || null,
      activeModal: null,
      searchQuery: '',
      posts: JSON.parse(localStorage.getItem('posts') || '[]'),
      filteredPosts: [],
      notifications: []
    }
  },
  created() {
    this.filteredPosts = this.posts
  },
  watch: {
    theme(newVal) {
      document.body.classList.remove('dark-mode', 'rain-mode')
      if (newVal === 'dark') {
        document.body.classList.add('dark-mode')
      } else if (newVal === 'rain') {
        document.body.classList.add('rain-mode')
      }
    },
    posts: {
      handler(newPosts) {
        localStorage.setItem('posts', JSON.stringify(newPosts))
        this.filterPosts()
      },
      deep: true
    }
  },
  methods: {
    onLogin(username) {
      this.currentUser = username
    },
    openModal(type) {
      this.activeModal = type
    },
    closeModal() {
      this.activeModal = null
      this.searchQuery = ''
      this.filteredPosts = this.posts
    },
    handleAddPostAndClose(newPost) {
      this.posts.unshift(newPost)
      this.closeModal()
    },
    handleAddPost(newPost) {
      this.posts.unshift(newPost)
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
    toggleDark() {
      this.isDark = !this.isDark
    },
    toggleTheme() {
      if (this.theme === 'light') this.theme = 'dark'
      else if (this.theme === 'dark') this.theme = 'rain'
      else this.theme = 'light'
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
  position: absolute;
  top: 10px;
  right: 16px;
  background: none;
  border: none;
  font-size: 2.6rem;
  color: #888;
  cursor: pointer;
  z-index: 10;
  transition: color 0.18s;
  line-height: 1;
  padding: 0 8px;
}
.close-btn:hover {
  color: #ff1744;
  background: none;
}
/* Modal stilleri */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 32px 24px 16px 24px;
  min-width: 320px;
  max-width: 90vw;
  position: relative;
  box-shadow: 0 4px 32px rgba(0,0,0,0.15);
}
.close-modal {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
}
.close-modal:hover {
  color: #0095f6;
}
.search-bar-modal {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  background: #f5f6fa;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  position: relative;
}
.search-bar-modal input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: inherit;
  outline: none;
}
body.dark-mode .modal-content {
  background: #23272f;
  color: #f1f1f1;
}
body.dark-mode .search-bar-modal {
  background: #23272f;
}
.logo-text {
  display: inline-block;
  width: 13ch;
  min-width: 2.5ch;
  position: relative;
  font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  letter-spacing: 1px;
  cursor: pointer;
  vertical-align: middle;
  transition: color 0.2s;
  overflow: hidden;
  line-height: 1.2;
}
.logo-stack {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 2.4em;
}
.logo-fade {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  opacity: 0;
  transform: translateY(-50%) scale(0.98);
  transition: opacity 0.35s cubic-bezier(.4,2,.6,1), transform 0.35s cubic-bezier(.4,2,.6,1);
  white-space: nowrap;
  pointer-events: none;
  text-align: left;
}
.logo-fade.visible {
  opacity: 1;
  transform: translateY(-50%) scale(1);
  pointer-events: auto;
}
.logo-gradient {
  background: linear-gradient(270deg, #ff6a00, #ee0979, #00c3ff, #43e97b, #ff6a00);
  background-size: 800% 800%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientMove 3s ease-in-out infinite;
}
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
body.dark-mode .logo-text {
  color: #f1f1f1;
}
@media (max-width: 600px) {
  .container {
    max-width: 100vw;
    margin: 0;
    padding: 8px 2px;
    border-radius: 0;
    box-shadow: none;
  }
  .post {
    border-radius: 6px;
    padding: 0;
  }
}
.notifications-modal {
  min-width: 240px;
  min-height: 80px;
  padding: 24px 8px 8px 8px;
  text-align: center;
}
.empty-notification {
  color: #888;
  font-size: 1.1rem;
  padding: 24px 0;
}
body.dark-mode .empty-notification {
  color: #aaa;
}
.rain-mode {
  background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
  color: #333;
}
.rain-mode .container {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
}
body.rain-mode {
  background: #e3f2fd !important;
}
body.rain-mode .container,
body.rain-mode .navbar,
body.rain-mode .post,
body.rain-mode .add-post,
body.rain-mode .post-box {
  background: #f5fafd !important;
  color: #222 !important;
}
</style>