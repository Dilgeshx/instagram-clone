<template>
  <form class="add-post" @submit.prevent="addPost">
    <input type="file" accept="image/*" @change="onFileChange" required />
    <input v-model="caption" placeholder="Açıklama (caption)" required />
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
  gap: 10px;
  margin-bottom: 24px;
  background: #f5f6fa;
  padding: 16px;
  border-radius: 8px;
}
.add-post input[type="file"] {
  background: #fff;
  border-radius: 6px;
  padding: 6px;
}
.add-post input[type="text"], .add-post input[type="password"], .add-post input[type='caption'] {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.add-post button {
  padding: 8px 0;
  border: none;
  border-radius: 6px;
  background: #0095f6;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
.add-post button:hover {
  background: #0077c2;
}
.error {
  color: #e53935;
  font-size: 0.95rem;
}
body.dark-mode .add-post {
  background: #23272f;
}
body.dark-mode .add-post input,
body.dark-mode .add-post input[type="file"] {
  background: #18191a;
  color: #f1f1f1;
  border: 1px solid #333;
}
body.dark-mode .add-post button {
  background: #222e3c;
  color: #fff;
}
body.dark-mode .add-post button:hover {
  background: #0095f6;
}
</style>