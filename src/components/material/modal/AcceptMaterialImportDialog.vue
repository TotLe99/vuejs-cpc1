<template>
  <div>
    <p class="content-accept">
      Xác nhận
      {{
        statusNumberProp === 2
          ? 'Chờ kiểm'
          : statusNumberProp === 3
          ? 'Đạt'
          : statusNumberProp === 6
          ? 'Chờ duyệt'
          : ''
      }}
      lô hàng {{ itemMaterialProp.BFOCode }} -
      {{ itemMaterialProp.NameMaterial }} - {{ itemMaterialProp.LotCode }}?
    </p>
  </div>
  <div>
    <el-input v-model="note" placeholder="Ghi chú..." />
  </div>
  <br />
  <div class="d-flex justify-content-end">
    <el-button @click="closeDialog">Huỷ</el-button>
    <el-button type="primary" @click="fetchAcceptMaterialImport"
      >Xác nhận</el-button
    >
  </div>
</template>

<script>
import { ref } from 'vue';
import useAcceptMaterialImport from '../../../api/acceptMaterialImport';

export default {
  props: {
    itemMaterialProp: {
      type: Object,
      required: true,
    },
    statusNumberProp: {
      type: Number,
      required: true,
    },
  },

  setup(props, { emit }) {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));

    const { dataAcceptMaterialImport, acceptMaterialImport } =
      useAcceptMaterialImport();

    const note = ref(null);

    function closeDialog() {
      emit('closeDialog', false);
    }

    // api acceptMaterialImport
    async function fetchAcceptMaterialImport() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        ID: props.itemMaterialProp.RowID,
        Note: note.value,
        Status: props.statusNumberProp,
      };
      await acceptMaterialImport(req);

      if (dataAcceptMaterialImport.value.RespCode === 0) {
        emit(
          'changeStatusNumber',
          props.statusNumberProp,
          props.itemMaterialProp.RowID
        );
      }

      closeDialog();
    }

    return { fetchAcceptMaterialImport, note, closeDialog };
  },
};
</script>

<style>
.content-accept {
  font-size: 1rem;
}
</style>
