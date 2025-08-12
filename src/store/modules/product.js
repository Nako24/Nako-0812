export default {
  namespaced: true, // モジュール名でアクセスするための設定
  state: {
    products: []
  },
  getters: {
    totalPrice(state) {
      return state.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    productsInCart(state) {
      return state.products.filter(p => p.quantity > 0);
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products.map(p => ({
        id: p.ID,
        name: p.Name,
        price: p.Price,
        quantity: p.quantity || 0
      }));
    },
    addToCart(state, product) {
      const item = state.products.find(p => p.id === product.id);
      if (item) item.quantity++;
    },
    clearCart(state) {
      state.products.forEach(p => (p.quantity = 0));
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await fetch('https://m3h-nako-0807-edc2cmdwh6adgga4.japaneast-01.azurewebsites.net/api/SELECT');
        const data = await response.json();
        commit('setProducts', data.List);
      } catch (error) {
        console.error('商品データの取得に失敗しました:', error);
      }
    },
    async purchaseItems({ commit }) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      commit('clearCart');
    }
  }
}