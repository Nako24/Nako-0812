<template>
  <!-- 画面全体のレイアウトコンテナ -->
  <v-container>
    
        <!-- 商品リストの説明文 -->
        <h3 class="text-subtitle-1 font-weight-bold mb-2 text-center">カートに入っている商品</h3>

        <!-- カート内の商品を表示する Vuetify コンポーネント -->
        <v-row justify="center">
        <v-col
          v-for="item in productsInCart"
          :key="item.product_id"
          cols="12" sm="6" md="4"
        >
        
        <v-card>
          <v-img
            :src="item.product_image"
            height="300"
            cover
          ></v-img>
          <v-card-title>{{ item.product_name }}</v-card-title>
          <v-card-subtitle>{{ item.price }}円</v-card-subtitle>

        </v-card>
        </v-col>
        </v-row>

        <v-row justify="center">
        <v-col cols="12" sm="6" md="4" class="text-center">

        <!-- 購入ボタン：購入処理中はローディング表示、商品がない時は非活性 -->
        <v-btn
          block color="primary"
          @click="purchase"
          :loading="loading"
          :disabled="loading || productsInCart.length === 0" 
        ><v-icon left>mdi-cart</v-icon>
          購入する
        </v-btn>

        <!-- 購入完了時に表示するポップアップメッセージ -->
        <v-alert
          v-if="showPopup"
          type="success"
          class="mt-6"
          border="left"
          colored-border
          elevation="2"
        >
          購入が完了しました！
        </v-alert>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PurchaseView',

  data() {
    return {
      loading: false,     // 購入処理中かどうかを表すフラグ
      showPopup: false    // 購入ポップアップ表示を管理するフラグ
    }
  },

  computed: {
    // getterからカートに入っている数量が1以上の商品を取得
    productsInCart() {
      return this.$store.getters['product/productsInCart'];
    },
  },

  methods: {
    // 「購入する」ボタン押下時の処理
    async purchase() {
      this.loading = true  // ボタンをローディング状態にする
      
      try {
      // VuexのpurchaseItemsアクションを呼び出す
      await this.$store.dispatch('product/purchaseItems');
      this.showPopup = true; // 購入完了メッセージを表示
    } catch (error) {
      alert('購入に失敗しました。もう一度お試しください。');
    }finally {
      this.loading = false;
    } 

      // 3秒後にポップアップを非表示にする
      setTimeout(() => {
        this.showPopup = false
      }, 3000)
    }
  }
}
</script>