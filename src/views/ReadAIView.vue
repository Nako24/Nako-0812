<template>
      <v-main class="pa-0">
        <!-- チャットのやり取り履歴を表示 -->
        <v-container class="pb-16 px-4 pt-4" style="min-height: 100vh;">
          
          <!-- チャットメッセージ1件ごとに繰り返し表示 -->
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="mb-2 d-flex"
            :class="{'justify-end': message.role === 'user', 'justify-start': message.role === 'bot'}"
          >
            <!-- メッセージ吹き出しデザイン -->
            <v-sheet
              :class="[message.role === 'user' ? 'indigo lighten-5' : 'grey lighten-3', 'pa-3', 'rounded-lg']"
              elevation="1"
              max-width="60%"
            >
              <!-- メッセージ本文 -->
              <div class="text-pre-line">{{ message.text }}</div>
            </v-sheet>
          </div>
        </v-container>

        <!-- メッセージ入力欄 -->
        <div class="chat-input-bar">
          <v-container class="pa-2">
            <v-row no-gutters>
              <v-col cols="10">
                <v-textarea
                  v-model="message"
                  placeholder="商品のキーワードを入力してください。"
                  auto-grow
                  rows="3"
                  outlined
                  hide-details
                  rounded
                ></v-textarea>
              </v-col>
              
              <!-- 作成ボタン -->
              <v-col cols="2" class="pl-2">
                <v-btn color="primary" block class="mt-2" @click="sendMessage" :loading="loading">
                  <v-icon left>mdi-magnify</v-icon>AIに作成してもらう
                </v-btn>
                <!-- 反映ボタン -->
                <v-btn color="primary" block class="mt-2" @click="updateAItext" :disabled="!contentText">
                  <v-icon left>mdi-pen</v-icon>AI文章を反映
                </v-btn>
              </v-col>
              
            </v-row>
          </v-container>
        </div>
      </v-main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReadAIView',
  
  data: () => ({
    message: '',
    messages: [],
    loading: false,
    contentText: ''
  }),

  mounted() {
    // 画面が読み込まれたら最初のAIメッセージを追加
    this.messages.push({
      role: 'bot',
      text: `商品のキーワードを入力してください。
例）
カラー
種類  [ネックレス/ピアス/イヤリング/ブレスレット/リング/ヘア]
デザイン  [シンプル/可愛い/華奢/ゴージャス/ビーズ/天然石/水晶/ゴールド]
用途  [デイリー/パーティー/女性向け/フォーマル]`
    });
  },
  
  methods: {
    async sendMessage() {
      const trimmed = this.message.trim();//トリム（空白・改行を削除)
      if (!trimmed) return;

      // 自分のメッセージを履歴に追加
      this.messages.push({ role: 'user', text: trimmed });
      this.message = '';
      this.loading = true;  // ボタンをローディング状態にする
      // APIにメッセージを送信
      const response = await axios.post('https://ai-app2120250912162520.azurewebsites.net/api/Function1?', {message: trimmed});
      // レスポンスコンソールに出力
      console.log('APIレスポンス:', response);
      // 応答内容を出力
      this.contentText = response.data.Content[0].Text;
      this.messages.push({ role: 'bot', text: this.contentText });
      console.log(JSON.stringify(this.messages, null));
      this.loading = false;
    },

    updateAItext() {
      // ストアのAI文章反映
      this.$store.commit('product/setAItext', this.contentText);
      this.$router.push('/sell');
    }
  }
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  background-color: transparent;
}

#app {
  height: 100%;
}

.chat-input-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
