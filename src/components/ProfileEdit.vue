<template>
  <div :class="['insta-profile-container', theme + '-mode']">
    <!-- Üst alan: Profil fotoğrafı ve sağında bilgiler -->
    <div class="profile-header-row">
      <div class="profile-photo-col">
        <img :src="profileImgSrc || defaultImg" class="profile-photo" alt="Profil Fotoğrafı" />
      </div>
      <div class="profile-info-col">
        <div class="profile-top-row">
          <span class="profile-username">{{ username }}</span>
          <button class="edit-btn" @click="showEditModal = true">Profili Düzenle</button>
          <button class="settings-btn" title="Ayarlar">
            <svg width="24" height="24" fill="none" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.5"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 1 1 4 0v.09c0 .66.37 1.25 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c0 .66.37 1.25 1 1.51H21a2 2 0 1 1 0 4h-.09c-.66 0-1.25.37-1.51 1z"/></svg>
          </button>
        </div>
        <div class="profile-stats-row">
          <span><b>{{ postsCount }}</b> gönderi</span>
          <span><b>{{ followers }}</b> takipçi</span>
          <span><b>{{ following }}</b> takip</span>
        </div>
        <div class="profile-bio-row">
          <span class="profile-fullname">{{ fullname }}</span>
          <span class="profile-bio">{{ bio }}</span>
        </div>
      </div>
    </div>
    <!-- Profil sekme navbarı -->
    <div class="profile-tabs">
      <button :class="['profile-tab', activeTab==='photos' ? 'active' : '']" @click="activeTab='photos'">
        <svg width="18" height="18" fill="none" stroke="#262626" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="12" r="2"/><path d="M21 19l-4.35-4.35a2 2 0 0 0-2.83 0L9 19"/></svg>
        Fotoğraflar
      </button>
      <button :class="['profile-tab', activeTab==='texts' ? 'active' : '']" @click="activeTab='texts'">
        <svg width="18" height="18" fill="none" stroke="#262626" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h6M8 16h4"/></svg>
        Yazılar
      </button>
    </div>
    <!-- Kullanıcının paylaşımları -->
    <div v-if="activeTab==='photos'" class="profile-posts-grid">
      <template v-if="filteredTabPosts.length > 0">
        <div v-for="post in filteredTabPosts" :key="post.id" class="profile-post-item">
          <img v-if="post.image" :src="post.image" class="profile-post-img" />
          <div v-if="post.caption" class="profile-post-caption">{{ post.caption }}</div>
        </div>
      </template>
      <div v-else class="profile-posts-empty">Henüz paylaşım yok.</div>
    </div>
    <div v-else class="profile-posts-list">
      <template v-if="filteredTabPosts.length > 0">
        <InstagramPost
          v-for="post in filteredTabPosts"
          :key="post.id"
          :username="post.username"
          :caption="post.caption"
        />
      </template>
      <div v-else class="profile-posts-empty">Henüz paylaşım yok.</div>
    </div>

    <!-- Profili Düzenle Modalı -->
    <div v-if="showEditModal" class="edit-modal-overlay" @click.self="showEditModal = false">
      <div class="edit-modal">
        <h3>Profili Düzenle</h3>
        <label class="edit-label">Profil Fotoğrafı</label>
        <input type="file" accept="image/*" @change="onPhotoChange" />
        <img :src="profileImgSrc || defaultImg" class="profile-photo-preview" alt="Profil Fotoğrafı" />
        <label class="edit-label">Ad Soyad</label>
        <input v-model="fullname" class="edit-input" placeholder="Ad Soyad" />
        <label class="edit-label">Biyografi</label>
        <textarea v-model="bio" class="edit-textarea" placeholder="Biyografiniz"></textarea>
        <button class="save-btn" @click="saveProfile">Kaydet</button>
        <button class="cancel-btn" @click="showEditModal = false">Vazgeç</button>
      </div>
    </div>
  </div>
</template>

<script>
import InstagramPost from './Post.vue';
export default {
  name: 'ProfileEdit',
  components: { InstagramPost },
  props: {
    posts: {
      type: Array,
      default: () => []
    },
    currentUser: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  data() {
    return {
      username: this.currentUser || 'kullaniciadi',
      fullname: 'Ad Soyad',
      bio: '',
      profileImgSrc: '',
      defaultImg: 'https://www.instagram.com/static/images/anonymousUser.jpg/23e7b3b1f542.jpg',
      postsCount: 0,
      followers: 134,
      following: 198,
      showEditModal: false,
      activeTab: 'photos'
    };
  },
  computed: {
    userPosts() {
      return this.posts.filter(post => post.username === this.currentUser);
    },
    filteredTabPosts() {
      if (this.activeTab === 'photos') {
        return this.userPosts.filter(post => post.image);
      } else {
        return this.userPosts.filter(post => !post.image && post.caption);
      }
    }
  },
  methods: {
    onPhotoChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImgSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveProfile() {
      localStorage.setItem('profileImgSrc', this.profileImgSrc);
      localStorage.setItem('bio', this.bio);
      localStorage.setItem('fullname', this.fullname);
      this.showEditModal = false;
    }
  },
  mounted() {
    this.profileImgSrc = localStorage.getItem('profileImgSrc') || '';
    this.bio = localStorage.getItem('bio') || '';
    this.fullname = localStorage.getItem('fullname') || 'Ad Soyad';
  }
};
</script>

<style scoped>
.insta-profile-container {
  max-width: 935px;
  margin: 32px auto;
  background: #fff;
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #262626;
}
.dark-mode .insta-profile-container,
.insta-profile-container.dark-mode {
  background: #23272f !important;
  color: #f1f1f1 !important;
}
.rain-mode .insta-profile-container,
.insta-profile-container.rain-mode {
  background: #f5fafd !important;
  color: #222 !important;
}
.dark-mode .profile-post-item,
.insta-profile-container.dark-mode .profile-post-item {
  background: #23272f !important;
  border: 1px solid #333 !important;
  color: #f1f1f1 !important;
}
.rain-mode .profile-post-item,
.insta-profile-container.rain-mode .profile-post-item {
  background: #e3f2fd !important;
  border: 1px solid #b3d6f7 !important;
  color: #222 !important;
}
.dark-mode .profile-tab,
.insta-profile-container.dark-mode .profile-tab {
  color: #aaa;
  background: #23272f;
}
.dark-mode .profile-tab.active,
.insta-profile-container.dark-mode .profile-tab.active {
  color: #f1f1f1;
  border-bottom: 2.5px solid #90caf9;
  background: #23272f;
}
.rain-mode .profile-tab,
.insta-profile-container.rain-mode .profile-tab {
  color: #2196f3;
  background: #e3f2fd;
}
.rain-mode .profile-tab.active,
.insta-profile-container.rain-mode .profile-tab.active {
  color: #1565c0;
  border-bottom: 2.5px solid #2196f3;
  background: #e3f2fd;
}
.dark-mode .profile-post-caption,
.insta-profile-container.dark-mode .profile-post-caption {
  color: #f1f1f1;
}
.rain-mode .profile-post-caption,
.insta-profile-container.rain-mode .profile-post-caption {
  color: #1565c0;
}

.profile-header-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 32px 40px 24px 40px;
  border-bottom: 1px solid #dbdbdb;
}
.profile-photo-col {
  margin-right: 40px;
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid #dbdbdb;
  background: #fafafa;
}
.profile-info-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.profile-top-row {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 18px;
}
.profile-username {
  font-size: 1.6rem;
  font-weight: 400;
  margin-right: 8px;
}
.edit-btn {
  background: #fff;
  color: #262626;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  padding: 7px 18px;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
}
.edit-btn:hover {
  background: #fafafa;
  border-color: #bdbdbd;
}
.settings-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0 0 8px;
  display: flex;
  align-items: center;
}
.profile-stats-row {
  display: flex;
  gap: 36px;
  margin-bottom: 14px;
  font-size: 1.13rem;
}
.profile-stats-row span {
  font-weight: 400;
}
.profile-bio-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.profile-fullname {
  font-weight: 600;
  font-size: 1.1rem;
}
.profile-bio {
  font-size: 1rem;
  color: #262626;
}
.profile-tabs {
  display: flex;
  justify-content: center;
  gap: 0;
  border-top: 1.5px solid #dbdbdb;
  border-bottom: 1.5px solid #dbdbdb;
  margin: 0 0 0 0;
  background: #fff;
}
.profile-tab {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 600;
  color: #888;
  padding: 13px 0 11px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
  border-bottom: 2.5px solid transparent;
  transition: color 0.15s, border-color 0.18s;
}
.profile-tab.active {
  color: #262626;
  border-bottom: 2.5px solid #262626;
  background: #fafafa;
}
.profile-tab svg {
  margin-right: 5px;
}
.profile-posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  padding: 36px 40px;
}
.profile-posts-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 36px 0 0 0;
  align-items: center;
}
.profile-posts-list .post {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
}
@media (max-width: 650px) {
  .profile-posts-list .post {
    max-width: 100vw;
    border-radius: 0;
  }
  .profile-posts-list {
    padding: 16px 0 0 0;
    gap: 18px;
  }
}
.profile-post-item {
  background: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 180px;
}
.profile-post-img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}
.profile-post-caption {
  padding: 8px 10px;
  font-size: 0.98rem;
  color: #262626;
  width: 100%;
  text-align: left;
  word-break: break-word;
}
.profile-posts-empty {
  grid-column: 1 / -1;
  text-align: center;
  color: #888;
  font-size: 1.12rem;
  padding: 40px 0;
}
.edit-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.edit-modal {
  background: #fff;
  padding: 32px 28px 24px 28px;
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 rgba(33,150,243,0.11);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 340px;
  max-width: 90vw;
}
.edit-modal h3 {
  margin-bottom: 20px;
  font-size: 1.22rem;
  font-weight: 700;
}
.edit-label {
  font-size: 1.01rem;
  margin-bottom: 6px;
  align-self: flex-start;
  font-weight: 500;
}
.edit-input,
.edit-textarea {
  width: 100%;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 14px;
  font-size: 1rem;
  font-family: inherit;
}
.edit-textarea {
  min-height: 60px;
  resize: vertical;
}
.profile-photo-preview {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid #dbdbdb;
  margin-bottom: 10px;
  background: #fafafa;
}
.save-btn {
  background: #0095f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.04rem;
  font-weight: 600;
  padding: 9px 0;
  width: 100%;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.save-btn:hover {
  background: #1877f2;
}
.cancel-btn {
  background: #fff;
  color: #262626;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  font-size: 1.01rem;
  font-weight: 500;
  padding: 8px 0;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s;
}
.cancel-btn:hover {
  background: #fafafa;
}
</style>
