import Vue from 'vue'
import Vuex from 'vuex'
import accountM from './modules/accountM'
import product from './modules/product' 


Vue.use(Vuex)

//モジュールの登録
export default new Vuex.Store({

  modules: {
    accountM, 
    product   
  }
})