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
            v-for="(item, index) in formLists"
            :key="index"
            :type="item.type"
            :placeholder="item.placeholder"
            :class="item.class"
            :ref="item.ref"
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
          <button class="btn-login" @click.prevent="handleLogin()">
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
</template>

<script>
// import { ref } from 'vue';

export default {
  name: 'LoginComponent',

  data() {
    let value = 0;
    return {
      imgBg: '.',
      title: 'QUẢN LÝ TÀI SẢN',
      titleForm: 'Chào mừng đến với QLTS! 👋🏼',
      subTitle: 'Vui lòng đăng nhập để bắt đầu sử dụng.',
      formLists: [
        {
          value: value++,
          type: 'text',
          placeholder: 'Tài khoản',
          class: 'username',
          ref: 'username',
        },
        {
          value: value++,
          type: 'password',
          placeholder: 'Mật khẩu',
          class: 'password',
          ref: 'password',
        },
      ],
      username: '',
      password: '',
    };
  },

  methods: {
    handleLogin() {
      this.username = this.$refs.username[0].value;
      this.password = this.$refs.password[0].value;
      this.$router.push("/login")
    },
  },
};
</script>

<style scoped>
@import './css/style.css';
</style>
