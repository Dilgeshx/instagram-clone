<template>
  <div class="auth-box">
    <h2 v-if="mode==='login'">Giriş Yap</h2>
    <h2 v-else>Kayıt Ol</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="username" placeholder="Kullanıcı Adı" required />
      <input v-model="password" type="password" placeholder="Şifre" required />
      <button type="submit">{{ mode==='login' ? 'Giriş Yap' : 'Kayıt Ol' }}</button>
    </form>
    <p>
      <a href="#" @click.prevent="toggleMode">
        {{ mode==='login' ? 'Hesabın yok mu? Kayıt ol' : 'Zaten hesabın var mı? Giriş yap' }}
      </a>
    </p>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoginRegister',
  data() {
    return {
      mode: 'login',
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    toggleMode() {
      this.mode = this.mode === 'login' ? 'register' : 'login'
      this.error = ''
    },
    handleSubmit() {
      if (this.mode === 'register') {
        let users = JSON.parse(localStorage.getItem('users') || '[]')
        if (users.find(u => u.username === this.username)) {
          this.error = 'Bu kullanıcı adı zaten alınmış.'
          return
        }
        users.push({ username: this.username, password: this.password })
        localStorage.setItem('users', JSON.stringify(users))
        this.mode = 'login'
        this.error = 'Kayıt başarılı, şimdi giriş yapabilirsin.'
      } else {
        let users = JSON.parse(localStorage.getItem('users') || '[]')
        let user = users.find(u => u.username === this.username && u.password === this.password)
        if (user) {
          localStorage.setItem('currentUser', this.username)
          this.$emit('login', this.username)
        } else {
          this.error = 'Kullanıcı adı veya şifre yanlış.'
        }
      }
    }
  }
}
</script>

<style scoped>
.auth-box {
  max-width: 320px;
  margin: 80px auto;
  padding: 32px 24px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 18px;
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}
button {
  width: 100%;
  padding: 10px;
  background: #0095f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background: #0077c2;
}
a {
  color: #0095f6;
  cursor: pointer;
  text-decoration: underline;
}
</style>