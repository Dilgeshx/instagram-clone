<template>
  <link href="https://fonts.googleapis.com/css2?family=Grand+Hotel&family=Pacifico&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

  <div class="login-bg">

    <div class="auth-box">
      <div class="insta-logo login-logo-gradient" style="font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif; font-size: 2.2rem; font-weight: 700; letter-spacing: 1px; text-align: center; margin-bottom: 1.5rem;">dilgestagram</div>
      <h2 style="font-family: 'Poppins', 'Montserrat', Arial, sans-serif; font-size: 1.5rem; margin: 0 0 0.9rem 0; color: #222; font-weight: 600; letter-spacing: 0.5px; text-align: center;">{{ mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol' }}</h2>
      <input type="text" v-model="username" placeholder="Kullanıcı Adı" autocomplete="username" style="font-family: 'Inter', Arial, sans-serif; font-size: 1.1rem; padding: 1.2rem 1.5rem; border-radius: 12px; border: 1px solid #dbdbdb; box-shadow: 0 2px 16px rgba(0,0,0,0.07);" />
      <input type="password" v-model="password" placeholder="Şifre" autocomplete="current-password" style="font-family: 'Inter', Arial, sans-serif; font-size: 1.1rem; padding: 1.2rem 1.5rem; border-radius: 12px; border: 1px solid #dbdbdb; box-shadow: 0 2px 16px rgba(0,0,0,0.07);" />
      <button class="auth-btn" @click="mode === 'login' ? login() : register()" style="font-family: 'Inter', Arial, sans-serif; font-size: 1.1rem; padding: 1.2rem 1.5rem; border-radius: 12px; border: none; background-color: #0095f6; color: #fff; cursor: pointer; box-shadow: 0 2px 16px rgba(0,0,0,0.07);">
        {{ mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol' }}
      </button>
      <div class="switch-mode">
        <a href="#" @click.prevent="toggleMode">
          {{ mode === 'login' ? 'Hesabın yok mu? Kayıt ol' : 'Zaten hesabın var mı? Giriş yap' }}
        </a>
      </div>
      <div v-if="message" :class="{'success-message': messageType==='success', 'error-message': messageType==='error'}" class="info-message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginRegister",
  data() {
    return {
      mode: 'login',
      username: '',
      password: '',
      message: '',
      messageType: ''
    }
  },
  methods: {
    toggleMode() {
      this.mode = this.mode === 'login' ? 'register' : 'login';
      this.message = '';
      this.username = '';
      this.password = '';
    },
    login() {
      if (!this.username || !this.password) {
        this.message = 'Kullanıcı adı ve şifre giriniz!';
        this.messageType = 'error';
        return;
      }
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      let user = users.find(u => u.username === this.username && u.password === this.password);
      if (user) {
        this.message = 'Başarıyla giriş yaptınız!';
        this.messageType = 'success';
        this.$emit('login', this.username); // App.vue ana bileşene bildir
      } else {
        this.message = 'Kullanıcı adı veya şifre yanlış.';
        this.messageType = 'error';
      }
    },
    register() {
      if (!this.username || !this.password) {
        this.message = 'Kullanıcı adı ve şifre giriniz!';
        this.messageType = 'error';
        return;
      }
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.username === this.username)) {
        this.message = 'Bu kullanıcı adı zaten alınmış.';
        this.messageType = 'error';
        return;
      }
      users.push({ username: this.username, password: this.password });
      localStorage.setItem('users', JSON.stringify(users));
      this.message = 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.';
      this.messageType = 'success';
      // Kutu sıfırlansın
      this.username = '';
      this.password = '';
      this.mode = 'login';
    }
  }
}
</script>

<style scoped>
/* Arka plan */
.login-bg{
  min-height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background:linear-gradient(135deg,#f8fafc 0%,#f3f4f7 100%);
  font-family:'Inter',Arial,sans-serif;
}

/* Hareketli başlık */
.dilgestagram-logo{
  position:absolute;top:40px;left:0;right:0;margin:auto;
  font-family:'Pacifico','Grand Hotel',cursive;
  font-size:3rem;font-weight:700;letter-spacing:2px;
  background:linear-gradient(270deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888,#e6683c,#f09433);
  background-size:200% 200%;
  -webkit-background-clip:text;background-clip:text;
  color:transparent;-webkit-text-fill-color:transparent;
  animation:gradient-move 16s ease-in-out infinite;
  user-select:none
}
@keyframes gradient-move{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

/* Kutu */
.auth-box{
  width:100%;max-width:390px;padding:2.8rem 2.4rem;
  background:#fff;border:1.5px solid #e4e6ea;border-radius:24px;
  box-shadow:0 8px 32px rgba(0,0,0,.12);
  display:flex;flex-direction:column;align-items:center;gap:1.3rem
}

/* Logo & başlık */
.insta-logo{font-family:'Grand Hotel',cursive;font-size:2.2rem;letter-spacing:1px;color:#262626}
h2{font-size:1.3rem;font-weight:700;color:#222;margin:0}

/* Input */
input{
  width:100%;padding:1rem 1.2rem;margin-bottom:.7rem;
  font-size:1rem;border:1px solid #e4e6ea;border-radius:12px;
  background:#f8fafc;transition:border .2s,box-shadow .2s
}
input:focus{border-color:#dc2743;background:#fff;box-shadow:0 0 0 2px #dc274344;outline:none}

/* Buton */
.auth-btn{
  width:100%;padding:1rem;border:none;border-radius:14px;
  font-size:1.1rem;font-weight:700;color:#fff;
  background:linear-gradient(90deg,#f09433 0%,#e6683c 50%,#dc2743 100%);
  cursor:pointer;transition:transform .15s,box-shadow .18s
}
.auth-btn:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 6px 18px #dc274330}

/* Kayıt/giriş mod geçişi */
.switch-mode{font-size:.95rem;color:#888}
.switch-mode a{color:#0095f6;text-decoration:underline;font-weight:600}
.switch-mode a:hover{color:#dc2743}

/* Mesajlar */
.info-message{width:100%;padding:.8rem;border-radius:12px;font-size:1rem}
.success-message{background:#eaffea;color:#2e7d32;border:1px solid #b2fab4}
.error-message{background:#ffeaea;color:#c62828;border:1px solid #ffcdd2}
.login-logo-gradient {
  background: linear-gradient(270deg, #ff6a00, #ee0979, #00c3ff, #43e97b, #ff6a00);
  background-size: 800% 800%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  animation: gradientMove 10s ease-in-out infinite;
}
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (max-width: 600px) {
  .auth-box {
    margin: 32px auto;
    padding: 16px 8px;
    border-radius: 12px;
    max-width: 98vw;
  }
  .insta-logo.login-logo-gradient {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1.1rem !important;
  }
}

</style>

  width: 100%;
  padding: 0.7rem 0.7rem;
  border: 1.2px solid #dbdbdb;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  background: #fafafa;
  color: #262626;
  margin-bottom: 0.5rem;
  transition: border 0.2s, box-shadow 0.2s, background 0.2s;
}

  border-color: #a8a8a8;
  background: #fff;
}

  width: 100%;
  padding: 0.7rem;
  background: linear-gradient(90deg, #f09433 0%, #e6683c 50%, #dc2743 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.13s;
  margin-top: 0.5rem;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px #0001;
  outline: none;
}

  background: linear-gradient(90deg, #dc2743 0%, #e6683c 50%, #f09433 100%);
  color: #fff;
  box-shadow: 0 4px 16px #0002;
  transform: translateY(-2px) scale(1.03);
}

  margin-top: 0.2rem;
  font-size: 0.96rem;
  color: #bbb;
  text-align: center;
}

  color: #0095f6;
  text-decoration: underline;
  font-weight: 400;
  opacity: 0.85;
}

  opacity: 1;
}

  width: 100%;
  text-align: center;
  padding: 0.7rem 0.5rem;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 0.5rem;
  transition: all 0.2s;
}

  background: #eaffea;
  color: #388e3c;
  border: 1px solid #b2fab4;
}

  background: #ffeaea;
  color: #d32f2f;
  border: 1px solid #ffcdd2;
}

  
    padding: 1.2rem 0.5rem 1.5rem 0.5rem;
    max-width: 98vw;
  }
}
  outline: none;
  font-size: 1rem;
  background: #fff;
  color: #181a20;
  box-shadow: none;
  transition: border 0.2s, box-shadow 0.2s, background 0.2s;
}




}

  width: 100%;
  padding: 0.8rem;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.13s;
  margin-top: 0.5rem;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px #0001;
  outline: none;
}


  color: #fff;
  box-shadow: 0 4px 16px #0002;
  transform: translateY(-2px) scale(1.03);
}