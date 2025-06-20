<template>
  <div class="chat-container" :class="themeClass">
    <div v-if="!selectedBot" class="bot-list">
      <h2>Bir bot seç:</h2>
      <ul>
        <li v-for="bot in bots" :key="bot.name" @click="selectBot(bot)">
          <span class="bot-avatar">🤖</span> {{ bot.name }}
        </li>
      </ul>
    </div>
    <div v-else class="chat-box">
      <div class="chat-header">
        <button class="back-btn" @click="selectedBot = null">←</button>
        <span class="bot-avatar">🤖</span> {{ selectedBot.name }} ile sohbet
      </div>
      <div class="messages" ref="messages">
        <div v-for="(msg, idx) in chatHistory" :key="idx" :class="['message', msg.from === 'user' ? 'user' : 'bot']">
          <span>{{ msg.text }}</span>
        </div>
      </div>
      <div class="input-row">
        <input v-model="input" @keyup.enter="sendMessage" placeholder="Mesaj yaz..." />
        <button @click="sendMessage">Gönder</button>
      </div>
    </div>
  </div>
</template>

<script>
function getRandomName() {
  const names = [
    'Lila', 'Atlas', 'Nova', 'Tuna', 'Mira',
    'Arda', 'Vera', 'Deniz', 'Rüzgar', 'Ada',
    'Luna', 'Baran', 'Ekin', 'Sena', 'Kuzey'
  ];
  return names[Math.floor(Math.random() * names.length)];
}

export default {
  name: 'ChatBox',
  props: {
    theme: {
      type: String,
      default: 'light'
    }
  },
  computed: {
    themeClass() {
      return this.theme + '-mode'
    }
  },
  data() {
    return {
      bots: Array.from({ length: 3 }, () => ({ name: getRandomName() })),
      selectedBot: null,
      chatHistory: [],
      input: ''
    }
  },
  methods: {
    selectBot(bot) {
      this.selectedBot = bot;
      this.chatHistory = [
        { from: 'bot', text: `Merhaba! Ben ${bot.name}. Sohbet etmeye hazır mısın?` }
      ];
    },
    sendMessage() {
      if (!this.input.trim()) return;
      this.chatHistory.push({ from: 'user', text: this.input });
      this.input = '';
      setTimeout(() => {
        
        const responses = [
          'Bunu biraz daha açıklar mısın?',
          'Çok ilginç!',
          'Sana nasıl yardımcı olabilirim?',
          'Güzel bir soru!',
          'Bunu düşündün mü hiç?'
        ];
        const botReply = responses[Math.floor(Math.random() * responses.length)];
        this.chatHistory.push({ from: 'bot', text: botReply });
        this.$nextTick(() => {
          this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
        });
      }, 800);
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
      });
    }
  }
}
</script>

<style scoped>
.chat-container {
  max-width: 350px;
  margin: 40px auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  font-family: 'Segoe UI', sans-serif;
  transition: background 0.2s, border 0.2s, color 0.2s;
}
.dark-mode.chat-container {
  background: #23272f !important;
  border: 1px solid #333 !important;
  color: #f1f1f1 !important;
}
.rain-mode.chat-container {
  background: #f5fafd !important;
  border: 1px solid #90caf9 !important;
  color: #222 !important;
}
.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: background 0.2s;
}
.dark-mode .messages {
  background: #18191a !important;
}
.rain-mode .messages {
  background: #e3f2fd !important;
}
.message.user {
  align-self: flex-end;
  background: #d1f5d3;
}
.dark-mode .message.user {
  background: #26334d !important;
  color: #b2ffb2 !important;
}
.rain-mode .message.user {
  background: #c2e9fb !important;
  color: #222 !important;
}
.message.bot {
  align-self: flex-start;
  background: #ececec;
}
.dark-mode .message.bot {
  background: #333 !important;
  color: #f1f1f1 !important;
}
.rain-mode .message.bot {
  background: #b3e5fc !important;
  color: #222 !important;
}
.input-row {
  display: flex;
  padding: 12px;
  border-top: 1px solid #eee;
  background: #fff;
  transition: background 0.2s;
}
.dark-mode .input-row {
  background: #23272f !important;
  border-top: 1px solid #333 !important;
}
.rain-mode .input-row {
  background: #e3f2fd !important;
  border-top: 1px solid #90caf9 !important;
}
.input-row input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 18px;
  padding: 8px 14px;
  font-size: 15px;
  outline: none;
  margin-right: 8px;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
.dark-mode .input-row input {
  background: #18191a !important;
  color: #f1f1f1 !important;
  border: 1px solid #333 !important;
}
.rain-mode .input-row input {
  background: #f5fafd !important;
  color: #222 !important;
  border: 1px solid #90caf9 !important;
}
.input-row button {
  background: #4f8cff;
  color: #fff;
  border: none;
  border-radius: 18px;
  padding: 8px 18px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}
.input-row button:hover {
  background: #346edb;
}
.dark-mode .input-row button {
  background: #222e3c !important;
  color: #fff !important;
}
.rain-mode .input-row button {
  background: #43e97b !important;
  color: #fff !important;
}

.bot-list {
  padding: 24px;
}
.bot-list ul {
  list-style: none;
  padding: 0;
}
.bot-list li {
  padding: 10px 0;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}
.bot-list li:hover {
  background: #f5f5f5;
}
.bot-avatar {
  margin-right: 12px;
  font-size: 20px;
}
.chat-box {
  display: flex;
  flex-direction: column;
  height: 420px;
}
.chat-header {
  padding: 14px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.back-btn {
  background: none;
  border: none;
  font-size: 18px;
  margin-right: 8px;
  cursor: pointer;
}
</style>
