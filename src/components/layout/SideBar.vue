<template>
  <!-- <div class="left">
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
          <strong class="logo-title">KHO PHỤ LIỆU</strong>
        </div>
      </li>
      <li class="sub-sidebar" @click="handlePushToMaterialList">
        <div class="d-flex">
          <i class="ti-home me-1 icon-sidebar"></i>
          <p class="title-sidebar">Danh sách nhập kho</p>
        </div>
      </li>
      <li class="sub-sidebar" @click="handlePushToTemList">
        <div class="d-flex">
          <i class="ti-home me-1 icon-sidebar"></i>
          <p class="title-sidebar">Danh sách tem</p>
        </div>
      </li>
      <li class="sub-sidebar" @click="handlePushToLocationMaterial">
        <div class="d-flex">
          <i class="ti-home me-1 icon-sidebar"></i>
          <p class="title-sidebar">Vị trí</p>
        </div>
      </li>
      <li class="sub-sidebar" @click="handlePushToRetailExport">
        <div class="d-flex">
          <i class="ti-home me-1 icon-sidebar"></i>
          <p class="title-sidebar">Xuất lẻ</p>
        </div>
      </li>
      <li class="sub-sidebar" @click="handlePushToCreateVoucher">
        <div class="d-flex">
          <i class="ti-home me-1 icon-sidebar"></i>
          <p class="title-sidebar">Tạo phiếu kiểm kê NB</p>
        </div>
      </li>
    </ul>
  </div> -->

  <el-menu class="el-menu-vertical-demo left" :collapse="isCollapse">
    <el-scrollbar>
      <el-menu-item index="1">
        <template #title>
          <div class="d-flex justify-content-center align-items-center">
            <img
              src="../login/img/logo.png"
              alt="logo"
              class="logo-img"
              width="40"
              height="24"
            />
            <strong class="logo-title">KHO PHỤ LIỆU</strong>
          </div>
        </template>
      </el-menu-item>
      <el-menu-item index="2" @click="handlePushToMaterialList">
        <template #title> Danh sách nhập kho</template>
      </el-menu-item>
      <el-menu-item index="3" @click="handlePushToTemList">
        <template #title>Danh sách tem</template>
      </el-menu-item>
      <el-menu-item index="4" @click="handlePushToLocationMaterial">
        <template #title>Vị trí</template>
      </el-menu-item>
      <el-menu-item index="5" @click="handlePushToRetailExport">
        <template #title>Xuất lẻ</template>
      </el-menu-item>
      <el-sub-menu index="6" class="sub-menu">
        <template #title>
          <span>Kiểm kê NB</span>
        </template>
        <el-menu-item index="6-1" @click="handlePushToCreateVoucher"
          >Tạo phiếu</el-menu-item
        >
        <el-menu-item index="6-2" @click="handlePushToInventoryInternalList"
          >Danh sách</el-menu-item
        >
      </el-sub-menu>
    </el-scrollbar>
  </el-menu>
</template>

<script>
import { ref } from 'vue';

export default {
  methods: {
    handlePushToMaterialList() {
      this.$router.push('/kpl/lo-nhap');
    },
    handlePushToTemList() {
      this.$router.push('/kpl/tem');
    },
    handlePushToLocationMaterial() {
      this.$router.push('/kpl/location');
    },
    handlePushToRetailExport() {
      this.$router.push('/kpl/retailExport');
    },
    handlePushToCreateVoucher() {
      this.$router.push('/kpl/createVoucher');
    },
    handlePushToInventoryInternalList() {
      this.$router.push('/kpl/inventoryInternalList');
    },
  },

  setup() {
    const isCollapse = ref(false);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollapse,
      handleOpen,
      handleClose,
    };
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

.el-menu-item:hover {
  background-color: #263445 !important;
}
.el-sub-menu__title:hover {
  background-color: #263445 !important;
}

.el-menu-item.is-active {
  color: #409eff;
  background-color: #263445 !important;
}

ul li[data-v-74b7f7c7] {
  padding: 0;
}

.sub-menu > div > span {
  color: rgb(191, 203, 217) !important;
}
.sub-menu .el-sub-menu__icon-arrow {
  color: rgb(191, 203, 217) !important;
}
</style>
