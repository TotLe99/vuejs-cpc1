<template>
  <div class="mb-1 p-1">
    <el-button type="warning" @click="openChangeLocation"
      ><i class="ti-arrow-right p-1"></i> Chuyển</el-button
    >
  </div>
  <div class="grid-container">
    <div
      class="grid-item"
      v-for="item in dataGetLocation.Data"
      :key="item.RowID"
    >
      <div class="content">
        <div class="img-location">
          <img
            src="../../assets/img/location-icon.png"
            height="20"
            width="20"
          />
        </div>
        <span class="text" @click="openStampByWare(item.WareID)">{{
          item.WareID
        }}</span>
        <i class="ti-more"></i>
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-between">
    <div>Tổng {{ dataGetLocation.TotalRows }}</div>
    <el-pagination
      v-model:current-page="currentPage"
      :page-Size="pageSize"
      :background="true"
      layout="prev, pager, next"
      :total="dataGetLocation.TotalRows"
    />
  </div>

  <!-- dialog StampByWare -->
  <el-dialog v-model="isOpenStampByWare" width="700px" top="5px">
    <template #header>
      <h5 :style="{ color: '#409EFF' }">Danh sách tem vị trí {{ wareID }}</h5>
    </template>
    <StampByWare v-if="isOpenStampByWare" :wareIDProps="wareID" />
  </el-dialog>
  <!-- end dialog StampByWare -->

  <!-- dialog ChangeLocation -->
  <el-dialog v-model="isOpenChangeLocation" width="750px" top="5px">
    <template #header>
      <h5 :style="{ color: '#409EFF', fontWeight: 'bold' }">
        <i class="ti-arrow-right"></i> ĐIỀU CHUYỂN VỊ TRÍ
      </h5>
    </template>
    <ChangeLocation
      v-if="isOpenChangeLocation"
      @closeDialog="closeDialogChangLocation"
    />
  </el-dialog>
  <!-- end dialog ChangeLocation -->
</template>

<script>
import { ref, watch } from 'vue';
import useGetLocation from '../../api/getLocation';
import StampByWare from './modal/StampByWare.vue';
import ChangeLocation from './modal/ChangeLocation.vue';

export default {
  components: {
    StampByWare,
    ChangeLocation,
  },

  setup() {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const { dataGetLocation, getLocation } = useGetLocation();

    // phan trang
    const currentPage = ref(1);
    const pageSize = ref(60);

    async function fetchGetLocation() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        WareType: 'PL',
        Search: '',
        PageNumber: currentPage.value,
        RowspPage: pageSize.value,
      };
      await getLocation(req);
    }
    fetchGetLocation();

    watch(currentPage, () => {
      fetchGetLocation();
    });

    const wareID = ref();
    function getWareID(prop) {
      wareID.value = prop;
    }

    const isOpenStampByWare = ref(false);
    function openStampByWare(prop) {
      getWareID(prop);
      isOpenStampByWare.value = true;
    }

    const isOpenChangeLocation = ref(false);
    function openChangeLocation() {
      isOpenChangeLocation.value = true;
    }

    function closeDialogChangLocation(prop) {
      isOpenChangeLocation.value = prop;
    }

    return {
      currentPage,
      pageSize,
      dataGetLocation,
      openStampByWare,
      isOpenStampByWare,
      wareID,
      isOpenChangeLocation,
      openChangeLocation,
      closeDialogChangLocation,
    };
  },
};
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
  background-color: #eee;
  width: 111%;
}

.grid-item {
  flex-basis: calc(100% / 7);
  margin: 0 5px 10px;
  background-color: #fff;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: 2px dashed #ccc;
}

.content {
  position: relative;
  padding: 0 5px;
}

.img-location {
  position: absolute;
  line-height: 40px;
  left: 14%;
}

.text {
  color: #409eff;
  font-weight: 600;
  font-size: 10pt;
  cursor: pointer;
  height: 100%;
}

.ti-more {
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 14pt;
  cursor: pointer;
  opacity: 0.5;
}
</style>
