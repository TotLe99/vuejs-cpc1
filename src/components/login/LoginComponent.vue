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

          <el-form
            ref="ruleFormRef"
            :model="account"
            status-icon
            :rules="rules"
            class="demo-ruleForm w-100"
            @keyup.enter="submitForm(ruleFormRef)"
          >
            <el-form-item prop="username">
              <el-input
                placeholder="Tài khoản"
                v-model="account.username"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="Mật khẩu"
                v-model="account.password"
                autocomplete="off"
              />
            </el-form-item>

            <div class="form-question-1">
              <div class="checkbox-save">
                <input type="checkbox" name="checkbox" class="checkbox" />
                <label class="checkbox-name color">Lưu đăng nhập</label>
              </div>
              <div>
                <a href="#" class="forget-password">Quên mật khẩu?</a>
              </div>
            </div>
            <el-form-item>
              <el-button
                class="btn-login w-100"
                type="primary"
                @click="submitForm(ruleFormRef)"
                >ĐĂNG NHẬP</el-button
              >
            </el-form-item>
          </el-form>
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
import { reactive, ref } from 'vue';
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
    const account = reactive({
      username: '',
      password: '',
    });

    const ruleFormRef = ref(null);

    const validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Vui lòng nhập tên đăng nhập'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('Vui lòng nhập mật khẩu'));
      } else {
        callback();
      }
    };

    const rules = {
      username: [{ validator: validateUserName, trigger: 'blur' }],
      password: [{ validator: validatePassword, trigger: 'blur' }],
    };

    const submitForm = () => {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          fetchLogin();
          console.log('Submit!');
        } else {
          console.log('Error submit!');
        }
      });
    };

    //
    const router = useRouter();
    const store = useStore();

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
          router.push('/kpl/lo-nhap');
        }
      }
    }

    return {
      account,
      fetchLogin,
      ruleFormRef,
      rules,
      submitForm,
    };
  },
};
</script>

<style>
@import './css/style.css';

.el-input__inner {
  font-size: 12px;
  padding: 15px 0;
  height: 4.6em;
}

.el-input__wrapper {
  border-radius: 8px;
}
</style>
