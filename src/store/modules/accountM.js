//Vuexモジュール。ログイン・登録の状態管理とAPI連携

import axios from 'axios'
import router from '@/router';

export default{
    namespaced: true, 
     
    // 状態（state）：アプリ全体で共有するアカウント関連のデータ
     state: {
        loginState: false, //true: ログイン中 / false: 未ログイン
        accountM: {        //ログインしたアカウントの情報を保持するオブジェクト
        ID: "",
        Name: "",
        },
        log:"",           // APIレスポンスやエラーなどを保持するログ
    },
     
    // ゲッター（getters）：state の値を加工して取り出す
     getters: {
    },
    
    // ミューテーション（mutations）：state のデータを変更する関数（同期処理のみ）
      mutations: {
        login(state, param){
        state.accountM.ID = param.ID; 
        state.accountM.Name = param.Name;
        state.loginState = true;
        },
        register(state, param){
        state.log=param;  // APIのレスポンスデータ（ログ）をstateに保存
        console.log(state.log["REGISTER RESULT"])
        }
    },
    
    // アクション（actions）：API通信などの非同期処理を行う関数
    actions: {
        
        // パラメータをAPIに送信 → ログイン成功ならミューテーション呼び出し
        async login({commit}, param){     
            const response = await axios.post('https://m3h-nako-0820-ggdyatb2cvhuethu.japaneast-01.azurewebsites.net/api/LOGIN?',param);

             // レスポンスのListに1件以上データがある場合＝ログイン成功
            if(response.data.List.length > 0){
                // コミット用のデータを作成（stateに保存する用）
                const commitParam = {
                ID: response.data.List[0].user_ID,
                Name: response.data.List[0].user_name,
            }
            this.ID = response.data.List[0].user_ID;//ログイン状態を保持
            console.log(this.ID)
            alert('ログインに成功しました。');
            router.push('/home');        //ホームページへ
            commit('login', commitParam);// ミューテーションを実行
            }
        },
        
         // 入力されたID・名前・パスワードをAPIに送信して登録
        async register({commit}, param) {
            const response = await axios.post('https://m3h-nako-0820-ggdyatb2cvhuethu.japaneast-01.azurewebsites.net/api/REGISTER?',param);
            commit('register', response.data) //ミューテーション実行
        }
    }
}