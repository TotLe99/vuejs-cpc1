<template>
  <div class="navbar">
    <div class="navbar-left d-flex">
      <div class="navbar-ti-menu-alt">
        <i class="ti-menu-alt" :style="{ fontWeight: 'bold' }"></i>
      </div>
      <div class="navbar-title d-flex justify-content-between">
        <span>
          <p>QLTS</p>
        </span>
        <span>/</span>
        <span>
          <p :style="{ opacity: '0.5' }">Trang chủ</p>
        </span>
      </div>
    </div>
    <div class="navbar-right d-flex">
      <div class="logo">
        <img
          src="../login/img/logo.png"
          alt="logo-user"
          class="logo-img"
          width="40"
          height="40"
        />
      </div>
      <div class="hello-user">
        <p>Xin chào</p>
        <p class="user-name">{{ fullNameComputed }} !</p>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, computed} from 'vue';

export default {
  setup() {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const fullName = ref();
    fullName.value = inforLogin.UserInfo.FullName;

    const fullNameComputed = computed(() => {
      return fullName.value;
    })
    
    return {
      inforLogin,
      fullName,
      fullNameComputed
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
}
.navbar {
  background-color: white;
  height: 50px;
  padding: 0;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  z-index: 98;
}

.navbar-ti-menu-alt {
  height: 100%;
}

.navbar-title {
  margin-left: 4%;
  width: 120px;
}

.ti-menu-alt {
  width: 10px;
  height: 10px;
  padding: 0 15px;
}

.navbar-right {
  padding: 0 1.8rem;
}

.logo img {
  height: 100%;
}

.hello-user {
  padding: 5px;
  color: #606266;
}

.hello-user p {
  font-weight: 600;
  font-size: 10pt;
}

.hello-user .user-name {
  opacity: 0.8;
  font-weight: 100;
}
</style>
