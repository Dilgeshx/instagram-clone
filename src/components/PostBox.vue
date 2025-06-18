<template>
  <form class="post-box" @submit.prevent="submitPost">
    <textarea
      v-model="text"
      class="post-input"
      placeholder="Bir şeyler paylaş..."
      rows="2"
      maxlength="2200"
      required
    ></textarea>
    <div class="post-actions">
      <label class="photo-btn" title="Fotoğraf ekle">
        <svg width="24" height="24" fill="none" stroke="#0095f6" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <circle cx="8.5" cy="12" r="2"/>
          <path d="M21 19l-4.35-4.35a2 2 0 0 0-2.83 0L9 19"/>
        </svg>
        <input type="file" accept="image/*" @change="onFileChange" />
      </label>
      <button type="submit" class="share-btn">Paylaş</button>
    </div>
    <div v-if="image" class="image-preview">
      <img :src="image" alt="Seçilen fotoğraf" />
      <button type="button" class="remove-img" @click="removeImage" title="Fotoğrafı kaldır">×</button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script>
export default {
  name: 'PostBox',
  props: ['currentUser'],
  data() {
    return {
      text: '',
      image: null,
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
    removeImage() {
      this.image = null
    },
    submitPost() {
      if (!this.text && !this.image) {
        this.error = 'Boş paylaşım yapılamaz.'
        return
      }
      const newPost = {
        id: Date.now(),
        username: this.currentUser,
        image: this.image,
        caption: this.text
      }
      this.$emit('add-post', newPost)
      this.text = ''
      this.image = null
      this.error = ''
      this.$el.querySelector('input[type="file"]').value = ''
    }
  }
}
</script>

<style scoped>
.post-box {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 18px 14px 10px 14px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}
.post-input {
  width: 100%;
  min-height: 48px;
  max-height: 120px;
  resize: vertical;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1.5px solid #bdbdbd;
  font-size: 1.08rem;
  font-family: inherit;
  background: #f5f6fa;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
  outline: none;
}
.post-input:focus {
  border-color: #0095f6;
  box-shadow: 0 0 0 2px #e3f2fd;
}
.post-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 2px;
}
.photo-btn {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: background 0.18s;
  position: relative;
}
.photo-btn:hover {
  background: #e3f2fd;
}
.photo-btn input[type="file"] {
  display: none;
}
.share-btn {
  margin-left: auto;
  padding: 8px 18px;
  background: #0095f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.18s;
}
.share-btn:hover {
  background: #0077c2;
}
.image-preview {
  margin-top: 8px;
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #bdbdbd;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.remove-img {
  position: absolute;
  top: 4px;
  right: 6px;
  background: rgba(255,255,255,0.8);
  border: none;
  border-radius: 50%;
  font-size: 1.3rem;
  color: #e53935;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s;
}
.remove-img:hover {
  background: #ffeaea;
}
.error {
  color: #e53935;
  font-size: 0.95rem;
}
body.dark-mode .post-box {
  background: #23272f;
}
body.dark-mode .post-input {
  background: #18191a;
  color: #f1f1f1;
  border: 1.5px solid #333;
}
body.dark-mode .post-input:focus {
  border-color: #90caf9;
  box-shadow: 0 0 0 2px #26334d;
}
body.dark-mode .image-preview {
  border-color: #444;
  background: #18191a;
}
body.dark-mode .share-btn {
  background: #222e3c;
  color: #fff;
}
body.dark-mode .share-btn:hover {
  background: #0095f6;
}
</style>