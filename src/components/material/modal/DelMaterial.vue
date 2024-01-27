<template>
  <span @click="openButton" class="accept-delete"
    ><i
      class="ti-trash"
      title="Xoá"
      :style="{
        color: 'red',
        fontSize: '18px',
      }"
    ></i>
    Xác nhận xoá nguyên liệu
    <span :style="{ fontWeight: 'bold' }"
      >{{ itemMaterial.NameMaterial }} - lô {{ itemMaterial.LotCode }}</span
    >?</span
  >
  <div class="d-flex justify-content-end" :style="{ marginTop: '30px' }">
    <span class="dialog-footer">
      <el-button @click="closeModal">Huỷ</el-button>
      <el-button
        type="primary"
        :disabled="hiddenButton"
        @click="
          () => {
            delMaterial();
            modalDelete = false;
          }
        "
      >
        Xác nhận
      </el-button>
    </span>
  </div>
</template>

<script>
import { ref } from 'vue';
import useMaterialLst from '../../../api/materialList';

export default {
  props: {
    getMaterialProps: {
      type: Object,
      required: true,
    },
    modalDeleteProps: {
      type: Boolean,
      required: true,
    },
    hiddenButtonProps: {
      type: Boolean,
      required: true,
    },
  },

  setup(props, { emit }) {
    const itemMaterial = ref(props.getMaterialProps);

    function closeModal() {
      hiddenButton.value = true;
      emit('closeModal', false);
      emit('accept', true);
    }

    const hiddenButton = ref(props.hiddenButtonProps);

    function openButton() {
      hiddenButton.value = false;
    }

    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const { deleteMaterial } = useMaterialLst();

    // delete LO
    async function delMaterial() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        ID: itemMaterial.value.RowID,
      };
      await deleteMaterial(req);
      closeModal();
    }
    // end delete LO

    return {
      itemMaterial,
      closeModal,
      delMaterial,
      hiddenButton,
      openButton,
    };
  },
};
</script>

<style scoped>
.accept-delete:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
