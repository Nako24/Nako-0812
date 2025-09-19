<template>
  <!-- 画面全体のレイアウトコンテナ -->
  <v-container>

    <!-- 商品カードを表示 -->
    <v-row>
      <v-col
        v-for="item in products"
        :key="item.product_id"
        cols="12"
        sm="6"
        md="4">
        
        <v-card>
          <!-- 商品画像 -->
          <v-img
            :src="item.product_image"
            height="300px"
            cover
            @click="openDescription(item)"
          ></v-img>

          <!-- 商品情報 -->
          <v-card-title class="text-wrap">{{ item.product_name }}</v-card-title>
          <v-card-subtitle class="text-wrap px-4">{{ item.price }}円,
            <span :class="{ 'red--text': item.status === '売り切れ' }">{{ item.status }}</span>
          </v-card-subtitle>

          <!-- カート追加ボタン -->
          <v-card-actions class="d-flex justify-center">
            <v-btn
              block color="primary"
              @click="addToCart(item)"
              :disabled="item.status === '売り切れ'">
              <v-icon left>mdi-cart-plus</v-icon>
              追加
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

     <!-- 商品詳細ダイアログ -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <!-- 商品画像 -->
        <v-img
          v-if="selectedProduct"
          :src="selectedProduct.product_image"
          height="300px"
          cover
        ></v-img>
        <v-card-title>{{ selectedProduct?.product_name }}</v-card-title>
        <v-card-text>
          {{ selectedProduct?.product_description }}
          <br>
          <small class="grey--text">
            カテゴリ：{{ selectedProduct?.category }}
          </small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
    export default {
        data() {
          return {
            dialog: false,           // ダイアログの開閉
            selectedProduct: null,   // クリックされた商品情報
          }
        },
        computed: {
            
            // ストアのstateからproductsの中身を取得
            products() {
                return this.$store.state.product.products;
            },
            
            // ストアのgettersからtotalpriceの処理結果を取得
            totalPrice() {
                return this.$store.getters['product/totalPrice'];
            }
        },

        methods: {
            // ストアのmutationのaddToCartを呼び出す処理
            addToCart(product) {
                this.$store.commit('product/addToCart', product); 
                this.$router.push('/purchase'); //購入ページへ遷移
            },
            
            // APIから商品一覧を取得
            selectProducts() {
              this.$store.dispatch('product/selectProducts');
            },

            openDescription(product) {
              this.selectedProduct = product;
              this.dialog = true;
            }

        },
        // ページ表示時に商品一覧を取得
        mounted() {
          this.selectProducts();
        }
    }
</script>