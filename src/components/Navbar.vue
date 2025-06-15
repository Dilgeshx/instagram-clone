<template>
  <nav class="navbar">
    <div class="navbar-left">
      <span class="logo-text">dilgestagram</span>
    </div>
    <div class="navbar-right">
      <button class="icon-btn" title="Ara">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7"/>
          <line x1="18" y1="18" x2="15.5" y2="15.5"/>
        </svg>
      </button>
      <button class="icon-btn" title="Bildirimler">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 01-3.46 0"/>
        </svg>
      </button>
      <button class="icon-btn" title="DM">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar'
}
</script>

<style scoped>
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
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  letter-spacing: 1px;
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
    padding: 0 12px;
    height: 54px;
  }
  .logo-text {
    font-size: 1.3rem;
  }
  .navbar-right {
    gap: 16px;
  }
}
</style>