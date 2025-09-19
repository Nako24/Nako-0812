<!-- メイン画面(ログイン・登録フォームの抑制)-->

<template>
  <v-app>
    <v-app-bar>
      <div class="d-flex align-center">
        <v-icon style="color: black;">mdi-shopping</v-icon>
          <h1>Flea Market</h1>
      </div>

      <v-spacer></v-spacer>
      <v-btn text to="/home" tag="router-link" v-show="loginState"><v-icon>mdi-home</v-icon>HOME</v-btn>
      <v-btn text to="/purchase" tag="router-link" v-show="loginState"><v-icon>mdi-cart</v-icon>購入</v-btn> 
      <v-btn text to="/sell" tag="router-link" v-show="loginState"><v-icon>mdi-camera</v-icon>出品</v-btn>
      <v-btn text to="/readAI" tag="router-link" v-show="loginState"><v-icon>mdi-magnify</v-icon>AI</v-btn>
    </v-app-bar>

    <v-main>
        <div class="background-container">
          <router-view/></div>
    </v-main>
    
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),

  computed:{
    loginState(){
      console.log(this.$store.state.accountM.loginState);
      return this.$store.state.accountM.loginState;
    },
  }
  
};
</script>

<style>
.background-container {
  min-height: 100vh; /* 画面いっぱいに高さを確保 */
  background-image: url('https://i.gyazo.com/ffd8a44d9855e9cdb626262afa179030.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; /* 画面いっぱいに画像を拡大 */
}
</style>
