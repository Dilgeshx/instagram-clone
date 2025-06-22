<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="logo-text" @mouseenter="hover = true" @mouseleave="hover = false">
        <span class="logo-stack">
          <span class="logo-fade logo-gradient" :class="{ visible: !hover }">ds</span>
          <span class="logo-fade" :class="{ visible: hover }">dilgestagram</span>
        </span>
      </router-link>
    </div>
    <div class="navbar-right">
      <button class="icon-btn" title="Ara" @click="$emit('open-modal', 'search')">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7"/>
          <line x1="18" y1="18" x2="15.5" y2="15.5"/>
        </svg>
      </button>
      <button class="icon-btn" title="DM" @click="$emit('open-modal', 'dm')">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
      </button>
      <button class="icon-btn" title="Bildirimler" @click="$emit('open-modal', 'notifications')">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 01-3.46 0"/>
        </svg>
      </button>
      <button class="icon-btn" title="Tema" @click="$emit('toggle-theme')">
        <svg v-if="theme==='light'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
        <svg v-else-if="theme==='dark'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2196f3" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 16a5 5 0 0 1 9.9-1H18a4 4 0 1 0-1-7.9" stroke="#222"/>
          <path d="M6 16h12" stroke="#222"/>
          <line x1="8" y1="18" x2="8" y2="22"/>
          <line x1="12" y1="18" x2="12" y2="22"/>
          <line x1="16" y1="18" x2="16" y2="22"/>
        </svg>
      </button>
      <button class="icon-btn" title="Profil" @click="$router.push('/profile-edit')">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M2 20c0-4 8-6 10-6s10 2 10 6" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  props: {
    isDark: Boolean,
    theme: String,
    currentUser: Object
  },
  data() {
    return {
      hover: false,
      showProfileMenu: false
    }
  },
  methods: {
    toggleProfileMenu() {
      this.showProfileMenu = !this.showProfileMenu;
    }
  }
}
</script>

<style scoped>
.profile-photo-wrapper {
  display: inline-block;
  position: relative;
  margin-left: 12px;
  cursor: pointer;
}
.profile-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #2196f3;
  object-fit: cover;
  background: #eee;
  transition: box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-photo.user-icon {
  padding: 4px;
  background: #f7faff;
}
.profile-photo:hover {
  box-shadow: 0 0 0 2px #90caf9;
}
.profile-menu-overlay {
  position: absolute;
  top: 110%;
  right: 0;
  background: rgba(255,255,255,0.92);
  box-shadow: 0 2px 16px rgba(0,0,0,0.13);
  border-radius: 12px;
  padding: 18px 20px 14px 20px;
  min-width: 170px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  animation: fadeInMenu 0.18s;
}
@keyframes fadeInMenu {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.edit-profile-btn {
  padding: 10px 16px;
  background: #2196f3;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.18s;
  margin-top: 2px;
}
.edit-profile-btn:hover {
  background: #1976d2;
}

.navbar {
  width: 100vw;
  min-width: 320px;
  max-width: 100vw;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  height: 64px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
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
  animation: gradientMove 16s  ease-in-out infinite;
}
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.navbar-right {
  display: flex;
  gap: 28px;
}
.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #222;
  display: flex;
  align-items: center;
  transition: color 0.18s;
}
.icon-btn:hover {
  color: #0095f6;
}
@media (max-width: 600px) {
  .navbar {
    padding: 0 8px;
    height: 48px;
  }
  .logo-text {
    font-size: 1.2rem;
    width: 6ch;
    min-width: 2ch;
  }
  .logo-stack {
    height: 1.5em;
  }
  .navbar-right {
    gap: 10px;
  }
  .icon-btn {
    padding: 2px;
  }
}
body.dark-mode .logo-text {
  color: #f1f1f1;
}
</style>