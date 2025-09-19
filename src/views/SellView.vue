<template>
  <!-- 画面全体のレイアウトコンテナ -->
  <v-container>
    <v-app class="transparent-app">
    
    <!-- 中央揃え -->
    <v-row justify="center">
      
      <!-- 幅を指定したカラム：モバイルで全幅、タブレットサイズ以上で幅6 -->
      <v-col cols="12" md="8" class="text-center">
        
        <!-- タイトル表示 -->
        <h2 class="text-h5 font-weight-bold mb-4">出品ページ</h2>

        <v-row>
          <v-col cols="4">
            <v-text-field
                  v-model="product_name"                         
                  label="商品名を入力"
                  placeholder="商品名を入力…"
                  outlined
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
                  v-model="price"                         
                  label="金額を入力"
                  placeholder="金額を入力…"
                  outlined
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
                  v-model="category"                         
                  label="カテゴリーを入力"
                  placeholder="カテゴリーを入力…"
                  outlined
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
                  v-model="product_image"                         
                  label="画像URLを入力"
                  placeholder="画像URLを入力…"
                  outlined
            ></v-text-field>
          </v-col>
          <v-col cols="8">
            <v-textarea
                  v-model="product_description"                         
                  label="出品文章を入力"
                  placeholder="出品文章を入力…"
                  outlined
            ></v-textarea>
          </v-col>
        </v-row>

        <!-- 出品ボタン：購入処理中はローディング表示-->
        <v-btn
          color="primary"
          @click="insertProduct"
          :loading="loading"
          :disabled="!product_name || !price || !category || !product_description"
        ><v-icon left>mdi-check</v-icon>
          出品する
        </v-btn>

        <v-col><!-- AIチャット表示ボタン：処理中はローディング表示-->
        <v-btn
          color="primary"
          @click="readAI"
          :loading="loading"
        ><v-icon left>mdi-magnify</v-icon>
          出品文章をAIに作成してもらう
        </v-btn></v-col>

        <!-- 出品完了時に表示するポップアップメッセージ -->
        <v-alert
          v-if="showPopup"
          type="success"
          class="mt-6"
          border="left"
          colored-border
          elevation="2"
        >出品が完了しました！
        </v-alert>
      </v-col>
    </v-row>
    </v-app>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SellView',
  data(){
    return {
    product_id: 10,
    product_name: '',
    price: '',
    category: '',
    status: '販売中',
    product_image: '',
    product_description: this.$store.state.product.AItext,//vuexのAI文章
    dataList: [],
    loading: false,
    showPopup: false
    };
  },
  
  methods: {
    // DBにデータを追加する関数
    insertProduct: async function() {
      //POSTメソッドで送るパラメーターを作成
      const param = {
        product_id: 10,//自動採番のため固定値
        seller_user_id: this.$store.state.accountM.accountM.ID, // Vuexのstateから
        product_name: this.product_name,
        price: this.price,
        category: this.category,
        status: "販売中",
        product_image: this.product_image,
        product_description: this.product_description
      }; 

      try {
        this.loading = true;
        //INSERT用のAPIを呼び出し
        const response = await axios.post('https://m3h-nako-0820-ggdyatb2cvhuethu.japaneast-01.azurewebsites.net/api/INSERTPRODUCT?',param);
        //結果をコンソールに出力
        console.log(response.data);
        this.showPopup = true;
        } catch (error) {
        console.error('出品エラー:', error);
        alert('出品に失敗しました。もう一度お試しください。');
        } finally {
        this.loading = false;
      }

      // 3秒後にポップアップを非表示にする
      setTimeout(() => {
        this.showPopup = false
      }, 3000)
    },

    readAI() { 
      this.$router.push('/readAI'); //AIページへ遷移
    },
  },
};
</script>

<style scoped>
.transparent-app {
  background-color: rgba(255, 255, 255, 0.6) !important;
}
</style>