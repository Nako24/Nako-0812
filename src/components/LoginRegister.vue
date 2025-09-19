<template>
    <v-container>
    <v-main>

      <!-- ログインフォーム（ログインしていない登録画面じゃないとき表示）-->
      <div v-show="!loginState && !registerView">
        <v-form
        ref="form"
        >

          <v-text-field
          v-model="id"
          :counter="10"
          label="ID"
          required
          ></v-text-field>

          <v-text-field
          v-model="pass"
          :counter="10"
          label="Password"
          type="password"
          required
          ></v-text-field>

          <v-btn
          color="primary"
          class="mr-4"
          @click="login(id, pass);"
          :disabled="!id || !pass"
          >
          ログイン
          </v-btn>

          <v-btn
          class="mr-4"
          @click="registerView=!registerView"
          >新規作成
          </v-btn>

        </v-form>
      </div>

      <!-- 新規登録フォーム -->
      <div v-show="registerView">
        <v-form
        ref="form"
        >

          <v-text-field
          v-model="registerId"
          :counter="10"
          label="ID"
          required
          ></v-text-field>

          <v-text-field
          v-model="registerName"
          :counter="10"
          label="Name"
          required
          ></v-text-field>

          <v-text-field
          v-model="registerPass"
          :counter="10"
          label="Password"
          type="password"
          required
          ></v-text-field>

          <v-btn
          color="primary"
          class="mr-4"
          @click="register(registerId, registerName, registerPass);"
          :disabled="!registerId || !registerName || !registerPass"
          >
          登録
          </v-btn>

          <v-btn
          class="mr-4"
          @click="registerView=!registerView; deleteLog();"
          >
          ログイン画面に戻る
          </v-btn>
          
          <v-alert
          v-show="this.$store.state.accountM.log['REGISTER RESULT'] === '1 件新規登録されました'"
          type="success"
          class="mt-6"
          border="left"
          colored-border
          elevation="2"
          >登録が完了しました</v-alert>

          <v-alert
          v-show="trueFalse"
          type="error"
          class="mt-6"
          border="left"
          colored-border
          elevation="2"
          >登録ができませんでした</v-alert>

        </v-form>
      </div>      
    </v-main>
    </v-container>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
    id: "",
    pass: "",
    registerId: "",
    registerName: "",
    registerPass: "",
    registerView:false, //ログインフォーム表示
  }),

  computed:{
    //ログイン(true)の場合はフォームを非表示
    loginState(){
      return this.$store.state.accountM.loginState;
    },
    trueFalse(){
      return (/DBエラー/.test(this.$store.state.accountM.log));
    }
  },

  //情報をAPIに投げて処理
  methods: {
    //accountMアクションに param を渡してAPIへ。
    login(id, pass){
      const param = {
        user_id: id,
        user_password: pass,
      }
      this.$store.dispatch('accountM/login', param);
    },
    register(id, name, pass){
      const param ={
        user_id: id,
        user_name: name,
        user_password: pass,
      }
      console.log(param)
      this.$store.dispatch('accountM/register', param);
    },
    //accountMミューテーションでログの初期化
    deleteLog(){
      this.$store.commit('accountM/register', "")
    },
  }
};
</script>


<style>
.v-label {
  color: black !important;
}
</style>
