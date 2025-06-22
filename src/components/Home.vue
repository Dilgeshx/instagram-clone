<template>
  <div v-if="currentUser" class="container">
    <div v-if="activeModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <template v-if="activeModal === 'addPost'">
          <AddPost :currentUser="currentUser" @add-post="handleAddPostAndClose" />
        </template>
        <template v-else-if="activeModal === 'search'">
          <div class="search-bar-modal">
            <input
              v-model="localSearchQuery"
              placeholder="Kullanıcı adına göre ara..."
              @input="onSearchInput"
              autofocus
            />
            <button class="close-btn" @click="closeModal" aria-label="Kapat">×</button>
          </div>
        </template>
        <template v-else-if="activeModal === 'dm'">
          <ChatBox :theme="theme" :class="theme+'-mode'" />
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
</template>

<script>
import PostBox from './PostBox.vue';
import InstagramPost from './Post.vue';
import AddPost from './AddPost.vue';
import ChatBox from './ChatBox.vue';

export default {
  name: 'HomePage',
  components: { PostBox, InstagramPost, AddPost, ChatBox },
  props: [
    'currentUser',
    'theme',
    'activeModal',
    'closeModal',
    'handleAddPost',
    'handleAddPostAndClose',
    'searchQuery',
    'filterPosts',
    'filteredPosts',
    'notifications'
  ],
  data() {
    return {
      localSearchQuery: this.searchQuery
    };
  },
  watch: {
    searchQuery(newVal) {
      this.localSearchQuery = newVal;
    }
  },
  methods: {
    onSearchInput() {
      this.$emit('filterPosts', this.localSearchQuery);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px 0 0 0;
}
</style>
