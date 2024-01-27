<template>
  <div>
    <p>Xác nhận tạo phiếu kiểm kê vị trị {{ wareIDProps }} ? Ghi chú:</p>
  </div>
  <div>
    <el-input v-model="note" placeholder="Ghi chú..." />
  </div>
  <div class="mt-3 d-flex justify-content-end">
    <el-button @click="closeDialog">Huỷ</el-button>
    <el-button type="primary" @click="fetchCreateInventoryInternal"
      >Xác nhận</el-button
    >
  </div>
</template>

<script>
import { ref } from 'vue';
import useCreateInventoryInternal from '../../../api/createInventoryInternal';
import { ElNotification } from 'element-plus';

export default {
  props: {
    wareIDProps: {
      type: String,
      required: true,
    },
    isAllCheckBoxProps: {
      type: Boolean,
      required: true,
    },
    lineLstProp: {
      type: Array,
      required: true,
    },
  },

  setup(props, { emit }) {
    console.log(props);

    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const { dataCreateInventoryInternal, createInventoryInternal } =
      useCreateInventoryInternal();
    const note = ref('');

    function closeDialog() {
      emit('closeDialog', false);
    }

    async function fetchCreateInventoryInternal() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        InventoryHeaderInfo: {
          IsAll: props.isAllCheckBoxProps === true ? 1 : 0,
          Note: note.value,
          Type: 'PL',
          WareID: props.wareIDProps,
          LineLst: props.lineLstProp,
        },
      };
      await createInventoryInternal(req);
      if (dataCreateInventoryInternal.value.RespCode === 0) {
        ElNotification({
          title: 'Thành công',
          message: 'Tạo phiếu kiểm kê NB thành công',
          type: 'success',
        });
        closeDialog();
        emit('openToScan');
      } else {
        ElNotification({
          title: 'Xảy ra lỗi',
          message: dataCreateInventoryInternal.value.RespText,
          type: 'warning',
        });
      }
    }

    return {
      closeDialog,
      fetchCreateInventoryInternal,
      note,
    };
  },
};
</script>

<style></style>
