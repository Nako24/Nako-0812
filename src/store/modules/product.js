import axios from 'axios'

export default {
  namespaced: true, //product/を付けてアクセスできるようにする。
  // 状態（state）：アプリ全体で共有する商品関連のデータ
  state: {
    products: [],
    AItext: ''
  },

  // ゲッター（getters）：state の値を加工して取り出す。カートに入っている商品を取得
  getters: {
    productsInCart(state) {
      return state.products.filter(p => p.inCart); //カート内商品の配列を取得
    },
  },

  // ミューテーション（mutations）：state のデータを変更する関数（同期処理のみ）
  mutations: {
    setProducts(state, products) {
      state.products = products.map(p => ({
        product_id: p.product_id,
        seller_user_id: p.seller_user_id,
        product_name: p.product_name,
        product_description: p.product_description,
        price: p.price,
        product_image: p.product_image,
        category: p.category,
        status: p.status,
        inCart: false  // 初期状態ではカートに入っていない
      }));
    },
    addToCart(state, product) {
      const item = state.products.find(p => p.product_id === product.product_id); //商品IDが一致する商品を一覧から探す
      if (item) item.inCart = true;
    },
    clearCart(state) {
      state.products.forEach(p => (p.inCart = false));
    },
    setAItext(state, AItext) {
      state.AItext = AItext;
    },
  },

  // アクション（actions）：API通信などの非同期処理を行う関数
  actions: {
    async selectProducts({ commit }) {
      try {
        const response = await axios.get('https://m3h-nako-0820-ggdyatb2cvhuethu.japaneast-01.azurewebsites.net/api/SELECTPRODUCT?');
        commit('setProducts', response.data.List); // APIから取得した商品リストを state に保存
      } catch (error) {
        console.error('商品データの取得に失敗しました:', error);
      }
    },
    
    // 購入処理 rootStateで全体のstateにアクセスできる
    async purchaseItems({ state, rootState, commit }) {
      try {
        // ログイン中のユーザーIDを accountM モジュールから取得（rootStateを使う）
        const buyerId = rootState.accountM.accountM.ID;
        // カートに入っている商品だけを取得
        const cartItems = state.products.filter(p => p.inCart);
        // 1つずつ購入APIへ送信（awaitはforループの中で使う）
        for (const item of cartItems) {
          const param = {
            buyer_user_id: buyerId,
            product_id: item.product_id
          };
          // APIへPOSTリクエスト
          await axios.post('https://m3h-nako-0820-ggdyatb2cvhuethu.japaneast-01.azurewebsites.net/api/INSERTPURCHASE?', param);
        }

        // 購入完了後はカートを空にする
        commit('clearCart');
      } catch (error) {
        console.error('購入処理に失敗しました:', error);
      }
    }
  }
}