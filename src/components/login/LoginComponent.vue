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
            v-model="account.username"
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            class="password"
            v-model="account.password"
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
          <button type="submit" class="btn-login" @click="fetchLogin()">
            ĐĂNG NHẬP
          </button>
          <div class="form-question-2">
            <span class="notice-register color">Bạn chưa có tài khoản?</span>
            <a href="#" class="register">Đăng ký</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <el-form
    ref="ruleFormRef"
    :model="account"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item prop="username">
      <el-input
        v-model="account.username"
        type="text"
        placeholder="Tài khoản"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="account.password"
        type="password"
        placeholder="Mật khẩu"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >ĐĂNG NHẬP</el-button
      >
    </el-form-item>
  </el-form> -->
</template>

<script>
import { reactive } from 'vue';
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
    const account = reactive({
      username: '',
      password: '',
    });

    async function fetchLogin() {
      const UserInfo = {
        username: account.username,
        password: account.password,
      };
      const pushLogin = await login(UserInfo);
      store.commit('setInforLogin', pushLogin);
      console.log(pushLogin);

      if (pushLogin.RespCode !== 0) {
        alert('Tài khoản, mật khẩu sai');
      } else {
        if (Object.keys(router.currentRoute.value.query).length > 0) {
          router.push(router.currentRoute.value.query.redirect);
        } else {
          router.push('/qlts/lo-nhap');
        }
      }
    }

    return {
      account,
      fetchLogin,
    };
  },
};
</script>

<style scoped>
@import './css/style.css';
</style>
