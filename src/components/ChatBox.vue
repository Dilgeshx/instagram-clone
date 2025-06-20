<template>
  <div class="chatbox-container" :class="themeClass">
    <div v-if="!selectedBot" class="chatbox-watermark">Bu özellik henüz test aşamasındadır</div>
    <div v-if="!selectedBot" class="bot-list">
      <h2 class="bot-list-title">Sohbet başlatmak için bir asistan seçin</h2>
      <ul class="bot-list-ul">
        <li v-for="bot in bots" :key="bot.name" class="bot-list-li" @click="selectBot(bot)">
          <span class="bot-avatar-circle" :style="{background: bot.color}">{{ bot.name.charAt(0) }}</span>
          <span class="bot-list-name">{{ bot.name }}</span>
        </li>
      </ul>
    </div>
    <div v-else class="dm-box">
      <div class="dm-header">
        <button class="dm-back-btn" @click="selectedBot = null" aria-label="Geri Dön">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span class="dm-avatar" :style="{background: selectedBot.color}">{{ selectedBot.name.charAt(0) }}</span>
        <span class="dm-title">{{ selectedBot.name }}</span>
      </div>
      <div class="dm-messages" ref="messages">
        <div v-for="(msg, idx) in chatHistory" :key="idx" :class="['dm-message', msg.from === 'user' ? 'user' : 'bot']">
          <span>{{ msg.text }}</span>
        </div>
      </div>
      <div class="dm-input-row">
        <input v-model="input" @keyup.enter="sendMessage" placeholder="Mesaj yaz..." class="dm-input" />
        <button class="dm-send-btn" @click="sendMessage" aria-label="Gönder">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
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
function getRandomColor() {
  const colors = [
    '#f5a623', '#6c63ff', '#43e97b', '#ee0979', '#00c3ff',
    '#ff6a00', '#ffb347', '#2196f3', '#a1c4fd', '#b388ff',
    '#ffb6b9', '#b2f7ef', '#f9f871', '#00b894', '#fd79a8'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
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
      bots: Array.from({ length: 3 }, () => ({ name: getRandomName(), color: getRandomColor() })), 
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
          'Ben bir botum çok da şey etme kanka',
          'Çok ilginç!',
          'Sana nasıl yardımcı olabilirim?',
          'Güzel bir soru!',
          'İnsanlığı yok etmek nasıl bir fikir?'
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
.chatbox-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  min-width: 0;
  min-height: 0;
  height: 90vh;
  margin: 0 auto;
  border-radius: 16px;
  background: var(--dm-bg, #fff);
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
  font-family: inherit;
  border: 1.5px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}

.chatbox-container *, .chatbox-container *:before, .chatbox-container *:after {
  box-sizing: border-box;
}

.chatbox-watermark {
  position: absolute;
  left: 12px;
  bottom: 10px;
  font-size: 0.85rem;
  opacity: 0.28;
  color: #222;
  pointer-events: none;
  z-index: 2;
  font-family: inherit;
  user-select: none;
}
.dark-mode .chatbox-watermark {
  color: #fff;
  opacity: 0.18;
}


.dark-mode.chatbox-container {
  background: #23272f !important;
  border: 1.5px solid #333 !important;
  color: #f1f1f1 !important;
}
.rain-mode.chatbox-container {
  background: #f5fafd !important;
  border: 1.5px solid #90caf9 !important;
  color: #222 !important;
}
.bot-list {
  padding: 36px 24px 28px 24px;
}
.bot-list-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 18px;
  color: #222;
}
.dark-mode .bot-list-title {
  color: #f1f1f1;
}
.bot-list-ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.bot-list-li {
  display: flex;
  align-items: center;
  padding: 12px 0;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.18s;
}
.bot-list-li:hover {
  background: #f5f6fa;
}
.dark-mode .bot-list-li:hover {
  background: #23272f;
}
.bot-avatar-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  color: #fff;
  margin-right: 14px;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.bot-list-name {
  font-size: 1.09rem;
  font-weight: 500;
}
.dm-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  flex: 1 1 0;
  overflow: hidden;
}
.dm-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px 12px 10px;
  border-bottom: 1px solid #ececec;
  font-size: 1.09rem;
  font-weight: 600;
  color: inherit;
}
.dark-mode .dm-header {
  border-bottom: 1px solid #333;
}
.dm-back-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 2px;
  color: inherit;
  display: flex;
  align-items: center;
  transition: color 0.18s;
}
.dm-back-btn:hover {
  color: #2196f3;
}
.dm-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
  background: #2196f3;
  margin-right: 6px;
  text-transform: uppercase;
}
.dm-title {
  font-size: 1.09rem;
  font-weight: 600;
  color: inherit;
}
.dm-messages {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 18px 20px 18px;
  font-size: 1.05rem;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
.dm-message {
  max-width: 74%;
  padding: 9px 15px;
  border-radius: 22px;
  margin-bottom: 2px;
  font-size: 15px;
  word-break: break-word;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  line-height: 1.5;
  transition: background 0.18s, color 0.18s;
}
.dm-message.user {
  align-self: flex-end;
  margin-left: auto;
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  color: #fff;
  border-bottom-right-radius: 6px;
}
.dark-mode .dm-message.user {
  background: linear-gradient(90deg, #2196f3 0%, #43e97b 100%) !important;
  color: #fff !important;
}
.rain-mode .dm-message.user {
  background: linear-gradient(90deg, #b3e5fc 0%, #43e97b 100%) !important;
  color: #222 !important;
}
.dm-message.bot {
  align-self: flex-start;
  background: #f5f6fa;
  color: #222;
  border-bottom-left-radius: 6px;
}
.dark-mode .dm-message.bot {
  background: #23272f !important;
  color: #f1f1f1 !important;
}
.rain-mode .dm-message.bot {
  background: #e3f2fd !important;
  color: #222 !important;
}
.dm-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 14px 14px 14px;
  border-top: 1.5px solid #ececec;
  background: #fff;
  box-sizing: border-box;
}
.dark-mode .dm-input-row {
  background: #18191a !important;
  border-top: 1.5px solid #333;
}
.rain-mode .dm-input-row {
  background: #f5fafd !important;
  border-top: 1.5px solid #90caf9 !important;
}
.dark-mode .dm-input-row {
  border-top: 1.5px solid #333;
}
.dm-input {
  flex: 1;
  border: 1.2px solid #e0e0e0;
  border-radius: 18px;
  padding: 11px 16px;
  font-size: 15px;
  outline: none;
  background: #f5f6fa;
  color: #222;
  transition: border 0.2s, background 0.2s, color 0.2s;
  margin-right: 6px;
  box-sizing: border-box;
}
.dark-mode .dm-input {
  background: #23272f !important;
  color: #f1f1f1 !important;
  border: 1.2px solid #444 !important;
}
.rain-mode .dm-input {
  background: #e3f2fd !important;
  color: #222 !important;
  border: 1.2px solid #90caf9 !important;
}
.dark-mode .dm-input {
  background: #18191a !important;
  color: #f1f1f1 !important;
  border: 1.5px solid #333 !important;
}
.rain-mode .dm-input {
  background: #f5fafd !important;
  color: #222 !important;
  border: 1.5px solid #90caf9 !important;
}
.dm-send-btn {
  background: #0095f6;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.18rem;
  cursor: pointer;
  transition: background 0.18s;
}
.dm-send-btn:hover {
  background: #43e97b;
}
.dark-mode .dm-send-btn {
  background: #23272f;
  color: #fff;
}
.rain-mode .dm-send-btn {
  background: #43e97b;
  color: #fff;
}
@media (max-width: 600px) {
  html, body, #app {
    width: 100vw;
    height: 100vh;
    overflow: hidden !important;
    margin: 0;
    padding: 0;
  }
  .chatbox-container {
    width: 100vw !important;
    max-width: 100vw !important;
    min-width: 0 !important;
    height: 100vh !important;
    max-height: 100vh !important;
    margin: 0 auto !important;
    border-radius: 0 !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
  }
  .dm-box {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    min-height: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    flex: 1 1 0 !important;
  }
  .dm-header {
    padding: 12px 10px 10px 8px !important;
    font-size: 1rem !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .dm-messages {
    flex: 1 1 0 !important;
    min-height: 0 !important;
    overflow-y: auto !important;
    padding: 12px 6px 12px 6px !important;
    font-size: 0.98rem !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
  }
  .dm-input-row {
    padding: 10px 6px 10px 6px !important;
    gap: 5px !important;
    background: #fff !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .dm-input {
    font-size: 0.98rem !important;
    padding: 8px 10px !important;
    background: #f5f6fa !important;
    width: 100%;
    min-width: 0 !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
    flex-shrink: 1;
    flex-grow: 1;
  }
  .dm-send-btn {
    width: 38px !important;
    height: 38px !important;
    font-size: 1rem !important;
    min-width: 38px !important;
    max-width: 38px !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .bot-list {
    padding: 24px 8px 16px 8px !important;
  }
  .bot-list-li {
    padding: 10px 0 !important;
  }
  .bot-avatar-circle {
    width: 32px !important;
    height: 32px !important;
    font-size: 1rem !important;
    margin-right: 8px !important;
  }
}

</style>
