<template>
  <form class="add-post" @submit.prevent="addPost">
    <label class="file-label">
      <div class="image-preview" v-if="image">
        <img :src="image" alt="Seçilen fotoğraf" />
      </div>
      <div class="file-btn" v-else>
        <svg width="40" height="40" fill="none" stroke="#0095f6" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#bdbdbd"/>
          <path d="M12 8v8M8 12h8" stroke="#0095f6"/>
        </svg>
        <span>Fotoğraf Seç</span>
      </div>
      <input type="file" accept="image/*" @change="onFileChange" required />
    </label>
    <textarea
      v-model="caption"
      class="caption-input"
      placeholder="Bir şeyler yaz..."
      rows="2"
      maxlength="2200"
      required
    ></textarea>
    <button type="submit">Paylaş</button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script>
export default {
  name: 'AddPost',
  props: ['currentUser'],
  data() {
    return {
      image: null,
      caption: '',
      error: ''
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (event) => {
        this.image = event.target.result
      }
      reader.readAsDataURL(file)
    },
    addPost() {
      if (!this.image || !this.caption) {
        this.error = 'Lütfen fotoğraf ve açıklama ekleyin.'
        return
      }
      const newPost = {
        id: Date.now(),
        username: this.currentUser,
        image: this.image,
        caption: this.caption
      }
      this.$emit('add-post', newPost)
      this.image = null
      this.caption = ''
      this.error = ''
      this.$el.querySelector('input[type="file"]').value = ''
    }
  }
}
</script>

<style scoped>
.add-post {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  background: #f5f6fa;
  padding: 20px 16px;
  border-radius: 12px;
  align-items: center;
}
.file-label {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.file-label input[type="file"] {
  display: none;
}
.file-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #bdbdbd;
  border-radius: 10px;
  padding: 24px 32px;
  color: #0095f6;
  font-weight: 500;
  font-size: 1.1rem;
  transition: border-color 0.2s;
  cursor: pointer;
}
.file-btn:hover {
  border-color: #0095f6;
  background: #f0f8ff;
}
.image-preview {
  width: 180px;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 8px;
  border: 2px solid #bdbdbd;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
input[type="text"], input[type="password"], input[type='caption'] {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-top: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background: #0095f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  margin-top: 4px;
}
button:hover {
  background: #0077c2;
}
.error {
  color: #e53935;
  font-size: 0.95rem;
}
.caption-input {
  width: 100%;
  min-height: 48px;
  max-height: 120px;
  resize: vertical;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1.5px solid #bdbdbd;
  font-size: 1.08rem;
  font-family: inherit;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
  outline: none;
}
.caption-input:focus {
  border-color: #0095f6;
  box-shadow: 0 0 0 2px #e3f2fd;
}
body.dark-mode .add-post {
  background: #23272f;
}
body.dark-mode .file-btn {
  border-color: #444;
  color: #90caf9;
  background: #18191a;
}
body.dark-mode .file-btn:hover {
  border-color: #0095f6;
  background: #23272f;
}
body.dark-mode .image-preview {
  border-color: #444;
  background: #18191a;
}
body.dark-mode input,
body.dark-mode input[type="file"] {
  background: #18191a;
  color: #f1f1f1;
  border: 1px solid #333;
}
body.dark-mode button {
  background: #222e3c;
  color: #fff;
}
body.dark-mode button:hover {
  background: #0095f6;
}
body.dark-mode .caption-input {
  background: #18191a;
  color: #f1f1f1;
  border: 1.5px solid #333;
}
body.dark-mode .caption-input:focus {
  border-color: #90caf9;
  box-shadow: 0 0 0 2px #26334d;
}
@media (max-width: 600px) {
  .modal-content {
    min-width: 90vw;
    padding: 16px 4px 8px 4px;
    border-radius: 8px;
  }
  .add-post {
    padding: 8px 2px;
  }
  .auth-box {
    margin: 32px auto;
    padding: 16px 8px;
    border-radius: 8px;
  }
}
</style>