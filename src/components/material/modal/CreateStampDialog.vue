<template>
  <el-form
    ref="ruleFormRef"
    :model="req.MaterialStampHeaderInfo"
    :rules="rules"
    label-position="left"
    class="demo-ruleForm"
  >
    <div class="d-flex quantity-stamp">
      <el-form-item label="Số lượng" prop="Quantity">
        <el-input v-model="req.MaterialStampHeaderInfo.Quantity"
      /></el-form-item>
      <el-input
        :value="itemMaterialProps.Unit"
        append
        :style="{ width: '20%' }"
      />
    </div>
    <el-form-item label="Vị trí">
      <el-input v-model="req.MaterialStampHeaderInfo.WareMaterial" />
    </el-form-item>
    <el-form-item label="Ghi chú">
      <el-input
        v-model="req.MaterialStampHeaderInfo.Note"
        :rows="2"
        type="textarea"
      />
    </el-form-item>
  </el-form>
  <div class="text-center">
    <el-form-item>
      <div class="text-center w-100">
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          ><i class="ti-check"></i> Xác nhận</el-button
        >
      </div>
    </el-form-item>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import useAddMaterialStampHeader from '../../../api/addMaterialStampHeader';
import { ElNotification } from 'element-plus';

export default {
  props: {
    itemMaterialProps: {
      type: Object,
      required: true,
    },
  },

  setup(props, { emit }) {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const { dataAddMaterialStampHeader, addMaterialStampHeader } =
      useAddMaterialStampHeader();

    const req = reactive({
      MaterialStampHeaderInfo: {
        BFOCode: props.itemMaterialProps.BFOCode,
        LotCode: props.itemMaterialProps.LotCode,
        NLID: props.itemMaterialProps.NLID,
        Note: '',
        Quantity: props.itemMaterialProps.NumImport,
        QuantityRemain: '',
        StampID: '',
        Status: '',
        TimeCreate: '',
        Unit: props.itemMaterialProps.Unit,
        WareMaterial: '',
      },
      Token: inforLogin.Token,
      UserName: inforLogin.UserInfo.Phone,
    });

    async function fetchAddMaterialStampHeader() {
      await addMaterialStampHeader(req);
      if (dataAddMaterialStampHeader.value.RespCode === 0) {
        ElNotification({
          title: 'Thành công',
          message: 'Thêm tem thành công',
          type: 'success',
        });
        emit('closeModalCreateStamp', false);
      } else {
        ElNotification({
          title: 'Thất bại',
          message: 'Thêm tem thất bại',
          type: 'warning',
        });
      }
    }

    const ruleFormRef = ref(null);

    const validateQuantity = (rule, value, callback) => {
      const isNumber = /^\d+$/;
      if (value === '') {
        callback(new Error('Vui lòng nhập số lượng'));
      } else if (isNumber.test(value)) {
        callback();
      } else {
        callback(new Error('Nhập số'));
      }
    };

    const rules = {
      Quantity: [{ validator: validateQuantity, trigger: 'blur' }],
    };

    const submitForm = async () => {
      await ruleFormRef.value.validate((valid) => {
        if (valid) {
          fetchAddMaterialStampHeader();
        } else {
          console.log('Error submit!');
        }
      });
    };

    return { req, ruleFormRef, rules, submitForm };
  },
};
</script>

<style>
.el-form-item__label {
  font-size: 0.95rem;
  width: 20%;
}

.quantity-stamp .el-form-item {
  width: 80%;
}

.quantity-stamp .el-form-item label {
  width: 25%;
}

.el-textarea__inner {
  font-size: 0.94rem;
}
</style>
