<template>
  <div class="left">
    <ul class="sidebar">
      <li>
        <div class="d-flex">
          <img
            src="../login/img/logo.png"
            alt="logo"
            class="logo-img"
            width="40"
            height="24"
          />
          <strong class="logo-title">QUẢN LÝ TÀI SẢN</strong>
        </div>
      </li>
      <li class="sub-sidebar" @click="handlePushToMaterialList">
        <div class="d-flex">
          <i class="ti-home me-1 icon-sidebar"></i>
          <p class="title-sidebar">Danh sách nhập kho</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    handlePushToMaterialList() {
      this.$router.push('/qlts/lo-nhap');
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
}

.left {
  background-color: rgb(48, 65, 86);
  height: auto;
  width: 210px;
  position: relative;
  top: 0;
  left: 0;
  z-index: 99;
}

.logo-title {
  color: #fff;
  font-weight: 600;
  margin-left: 0.4rem;
}

ul li {
  color: rgb(191, 203, 217);
  list-style-type: none;
  padding: 20px;
  cursor: pointer;
}

ul .sub-sidebar:hover {
  background-color: #263445;
}

ul .sub-sidebar:focus {
  background-color: #263445;
  color: #409eff;
}
</style>
