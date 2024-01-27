<template>
  <el-table :data="dataGetStampByWare.Data" v-loading="isLoading" height="80vh">
    <el-table-column width="60">
      <template #default="props">
        {{ (currentPage - 1) * pageSize + props.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="StampID" label="Mã" />
    <el-table-column prop="Name" label="Tên" />
    <el-table-column prop="LotCode" label="Lô" />
    <el-table-column label="SL">
      <template #default="props">
        {{ props.row.QuantityRemain }} {{ props.row.Unit }}
      </template>
    </el-table-column>
  </el-table>
  <div class="d-flex justify-content-between">
    <div>Tổng {{ dataGetStampByWare.TotalRows }}</div>
    <el-pagination
      v-model:current-page="currentPage"
      :page-Size="pageSize"
      :background="true"
      layout="prev, pager, next"
      :total="dataGetStampByWare.TotalRows"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import useGetStampByWare from '../../../api/getStampByWare';
export default {
  props: {
    wareIDProps: {},
  },

  setup(props) {
    console.log(props);
    console.log(props.wareIDProps);
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const { dataGetStampByWare, getStampByWare } = useGetStampByWare();

    const isLoading = ref(true);

    // phan trang
    const currentPage = ref(1);
    const pageSize = ref(30);

    async function fetchGetStampByWare() {
      isLoading.value = true;
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        Type: 'PL',
        Search: '',
        WareMaterial: props.wareIDProps,
        PageNumber: currentPage.value,
        RowspPage: pageSize.value,
      };
      await getStampByWare(req);
      console.log('dataGetStampByWare', dataGetStampByWare);

      isLoading.value = false;
    }
    fetchGetStampByWare();

    watch(currentPage, () => {
      fetchGetStampByWare();
    });

    return { currentPage, pageSize, isLoading, dataGetStampByWare };
  },
};
</script>

<style>
.el-dialog__body {
  padding-top: 0px;
}
</style>
