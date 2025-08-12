<template>
  <!-- 画面全体のレイアウトコンテナ -->
  <v-container>
    
    <!-- 中央揃え -->
    <v-row justify="center">
      
      <!-- 幅を指定したカラム：モバイルで全幅、タブレットサイズ以上で幅6 -->
      <v-col cols="12" md="6" class="text-center">
        
        <!-- タイトル表示 -->
        <h2 class="text-h5 font-weight-bold mb-4">商品登録ページ</h2>

        <v-row class="mb-3 mt-3" align="center" justify="center">
          <v-col cols="4">
            <v-text-field
                  class="ml-6 mr-6"
                  v-model="ID"                         
                  label="IDを入力"
                  placeholder="IDを入力…"
                  outlined
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
                  class="ml-6 mr-6"
                  v-model="Name"                         
                  label="商品を入力"
                  placeholder="商品を入力…"
                  outlined
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
                  class="ml-6 mr-6"
                  v-model="Price"                         
                  label="金額を入力"
                  placeholder="金額を入力…"
                  outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mb-3 mt-3" align="center" justify="center">
          入力内容  ID: {{ ID }}   商品名: {{ Name }}   金額: {{ Price }}
        </v-row>

        <!-- 登録ボタン：購入処理中はローディング表示-->
        <v-btn
          color="#F8BBD0"
          @click="addData"
          :loading="loading"
        ><v-icon left>mdi-check</v-icon>
          登録する
        </v-btn>

        <v-col><!-- 表示ボタン：処理中はローディング表示-->
        <v-btn
          color="#FCE4EC"
          @click="readData"
          :loading="loading"
        ><v-icon left>mdi-format-list-bulleted</v-icon>
          現在の登録内容を表示する
        </v-btn></v-col>

        <v-row 
          class="mb-3 mt-3"
          justify="center"
          v-for="data in dataList" :key="data.ID">
          ID:{{ data.ID }},  商品名:{{ data.Name }},  金額:{{ data.Price }}
        </v-row>

        <!-- 商品登録完了時に表示するポップアップメッセージ -->
        <v-alert
          v-if="showPopup"
          type="success"
          class="mt-6"
          border="left"
          colored-border
          elevation="2"
        >
          商品登録が完了しました！
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AboutView',
  data(){
    return {
    ID: '',
    Name: '',
    Price: '',
    dataList: [],
    loading: false,
    showPopup: false
    };
  },
   methods: {
    // DBにデータを追加する関数
    addData: async function() {
      //IDの入力チェック（空白か数字以外なら終了）
      if(!this.ID || isNaN(this.ID)){
        console.log("IDに数値が入力されていません");
        return;
      }
      //POSTメソッドで送るパラメーターを作成
      const param = {
        ID : this.ID,
        Name : this.Name,
        Price : this.Price,
      }; 

      //INSERT用のAPIを呼び出し
      const response = await axios.post('https://m3h-nako-0807-edc2cmdwh6adgga4.japaneast-01.azurewebsites.net/api/INSERT?',param);
      //結果をコンソールに出力
      console.log(response.data);
    },
    // データベースからデータを取得する関数
    readData: async function() {
      //SELECT用のAPIを呼び出し      
      const response = await axios.get('https://m3h-nako-0807-edc2cmdwh6adgga4.japaneast-01.azurewebsites.net/api/SELECT?');
      //結果をコンソールに出力
      console.log(response.data);
      //結果リストを表示用配列に代入
      this.dataList = response.data.List;
    },
  },
};
</script>
