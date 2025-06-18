<template>
  <div>
    <AppNavbar
      :isDark="isDark"
      @toggle-dark="toggleDark"
      @open-modal="openModal"
      v-if="currentUser"
    />
    <LoginRegister v-else @login="onLogin" />
    <div v-if="currentUser" class="container">
      <!-- Modal -->
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
              <button class="close-btn" @click="closeModal">×</button>
            </div>
          </template>
          <template v-else-if="activeModal === 'dm'">
            <div style="padding:24px;">Mesaj kutusu buraya gelecek.</div>
            <button class="close-btn" @click="closeModal">×</button>
          </template>
          <template v-else-if="activeModal === 'notifications'">
            <div style="padding:24px;">Bildirimler buraya gelecek.</div>
            <button class="close-btn" @click="closeModal">×</button>
          </template>
        </div>
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
import AddPost from './components/AddPost.vue'

export default {
  components: { AppNavbar, LoginRegister, InstagramPost, AddPost },
  data() {
    return {
      isDark: false,
      currentUser: localStorage.getItem('currentUser') || null,
      activeModal: null,
      searchQuery: '',
      posts: JSON.parse(localStorage.getItem('posts') || '[]'),
      filteredPosts: []
    }
  },
  created() {
    this.filteredPosts = this.posts
  },
  watch: {
    isDark(newVal) {
      if (newVal) {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
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
</style>