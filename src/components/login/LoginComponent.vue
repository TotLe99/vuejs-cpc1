<template>
  <div class="login" id="login">
    <!-- logo -->
    <div class="logo-banner">
      <img
        src="./img/logo.png"
        alt="logo"
        class="logo-img"
        width="40"
        height="24"
      />
      <h1 class="logo-title">{{ title }}</h1>
    </div>

    <div class="container1">
      <!-- body left -->
      <div class="body-left">
        <div class="banner"></div>
      </div>

      <!-- body right -->
      <div class="body-right">
        <div class="form-login">
          <div class="title">
            <h5 class="form-title color">{{ titleForm }}</h5>
            <p class="sub-title">{{ subTitle }}</p>
          </div>

          <input
            type="text"
            placeholder="Tài khoản"
            class="username"
            v-model="username"
          />

          <input
            type="text"
            placeholder="Mật khẩu"
            class="password"
            v-model="password"
          />

          <div class="form-question-1">
            <div class="checkbox-save">
              <input type="checkbox" name="checkbox" class="checkbox" />
              <label class="checkbox-name color">Lưu đăng nhập</label>
            </div>
            <div>
              <a href="#" class="forget-password">Quên mật khẩu?</a>
            </div>
          </div>
          <button type="submit" class="btn-login" @click="fetchLogin()">ĐĂNG NHẬP</button>
          <div class="form-question-2">
            <span class="notice-register color">Bạn chưa có tài khoản?</span>
            <a href="#" class="register">Đăng ký</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { login } from '../../api/login';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'LoginComponent',

  data() {
    return {
      imgBg: '.',
      title: 'KHO PHỤ LIỆU',
      titleForm: 'Chào mừng đến với KPL! 👋🏼',
      subTitle: 'Vui lòng đăng nhập để bắt đầu sử dụng.',
    };
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    let username = ref('');
    let password = ref('');
    
    async function fetchLogin() {
      const UserInfo = {
        'username': username.value,
        'password': password.value,
      };
      const pushLogin = await login(UserInfo)
      console.log(pushLogin);
      
      if(pushLogin.RespCode !== 0) {
        alert("Tài khoản, mật khẩu sai");
      } else {
        store.commit('setInforLogin', pushLogin)
        router.push('/home');
      }
    }

    return {
      username,
      password,
      fetchLogin,
    };
  },
};
</script>

<style scoped>
@import './css/style.css';
</style>
