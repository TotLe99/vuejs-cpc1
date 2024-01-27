<template>
  <el-form
    ref="ruleFormRef"
    :model="req.LocationInfo"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    label-position="left"
    status-icon
  >
    <el-form-item label="Hình thức" prop="TypeLocation">
      <el-radio-group v-model="req.LocationInfo.TypeLocation">
        <el-radio :label="1">Tem</el-radio>
        <el-radio :label="2">Pallet</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Tem" prop="StampID">
      <el-col :span="22" class="input-qr">
        <el-input
          v-model="req.LocationInfo.StampID"
          placeholder="Quét | nhập mã tem..."
        />
      </el-col>
      <el-col
        :span="2"
        :style="{
          height: '100%',
          width: '100%',
          textAlign: 'center',
          lineHeight: '37px',
          backgroundColor: '#F5F7FA',
          borderRadius: '0 8px 8px 0',
          cursor: 'pointer',
        }"
        @click="openDialogCheckStampID"
      >
        <span>
          <i class="ti-layout-grid2"></i>
        </span>
      </el-col>
    </el-form-item>

    <el-form-item label="Tên hàng">
      <el-input v-model="req.LocationInfo.MaterialName" disabled />
    </el-form-item>

    <el-form-item label="Mã">
      <el-input :value="req.LocationInfo.BFOCode" disabled />
    </el-form-item>

    <el-form-item label="Số lô">
      <el-input :value="req.LocationInfo.LotCode" disabled />
    </el-form-item>

    <el-form-item label="Số lượng">
      <el-input :value="req.LocationInfo.Quantity" disabled />
    </el-form-item>

    <el-form-item label="Vị trí hiện tại">
      <el-input :value="req.LocationInfo.WareOld" disabled />
    </el-form-item>

    <el-form-item label="Vị trí mới" prop="WareModify">
      <el-col :span="22" class="input-qr">
        <el-input
          v-model="req.LocationInfo.WareModify"
          placeholder="Quét | nhập mã vị trí..."
        />
      </el-col>
      <el-col
        :span="2"
        :style="{
          height: '100%',
          width: '60px',
          textAlign: 'center',
          lineHeight: '37px',
          backgroundColor: '#F5F7FA',
          borderRadius: '0 8px 8px 0',
          cursor: 'pointer',
        }"
        @click="openDialogLocation"
      >
        <span>
          <i class="ti-layout-grid2"></i>
        </span>
      </el-col>
    </el-form-item>

    <el-form-item label="Ghi chú" prop="desc">
      <el-input
        v-model="req.LocationInfo.Note"
        type="textarea"
        placeholder="Nhập ghi chú..."
      />
    </el-form-item>
    <el-form-item>
      <div class="text-center w-100">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          <i class="ti-check"></i> Xác nhận
        </el-button>
      </div>
    </el-form-item>
  </el-form>

  <!-- dialog scan stampID -->
  <el-dialog
    v-model="isOpenDialogCheckStampID"
    title="Quét mã QRCode"
    width="580px"
    :style="{ marginTop: '10px' }"
  >
    <CheckStamp
      v-if="isOpenDialogCheckStampID"
      @scanQRStampID="scanQRStampID"
    />
  </el-dialog>

  <!-- dialog scan new Location -->
  <el-dialog
    v-model="isOpenDialogLocation"
    title="Quét mã QRCode"
    width="580px"
    :style="{ marginTop: '10px' }"
  >
    <ScanNewLocation
      v-if="isOpenDialogLocation"
      @scanNewLocation="scanNewLocation"
    />
  </el-dialog>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import useCheckStamp from '../../../api/checkStamp';
import useCreateChangeLocation from '../../../api/createChangeLocation';
import { ElNotification } from 'element-plus';
import _ from 'lodash';
import CheckStamp from './CheckStamp';
import ScanNewLocation from './ScanNewLocation';

export default {
  components: {
    CheckStamp,
    ScanNewLocation,
  },
  setup(props, { emit }) {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const { dataCheckStamp, checkStamp } = useCheckStamp();
    const { dataCreateChangeLocation, createChangeLocation } =
      useCreateChangeLocation();

    const req = reactive({
      LocationInfo: {
        BFOCode: '',
        LotCode: '',
        MaterialName: '',
        Note: '',
        Quantity: 0,
        RowID: '',
        StampID: '',
        Type: 'PL',
        TypeLocation: 1,
        WareModify: '',
        WareOld: '',
      },
      UserName: inforLogin.UserInfo.Phone,
      Token: inforLogin.Token,
    });

    watch(req.LocationInfo.StampID, (newValue) => {
      console.log('Thay đổi:', newValue);
    });

    async function fetchCheckStamp() {
      const reqCheckStamp = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        Type: 'Check tem',
        StampID: req.LocationInfo.StampID,
      };
      await checkStamp(reqCheckStamp);
      console.log('dataCheckStamp', dataCheckStamp.value);

      if (dataCheckStamp.value.RespCode !== 0) {
        ElNotification({
          title: 'Thất bại',
          message: 'Mã tem sai',
          type: 'warning',
        });
      }
    }

    const checkStampDebounced = _.debounce(() => {
      fetchCheckStamp();
    }, 1500);

    watch(
      () => req.LocationInfo.StampID,
      () => {
        checkStampDebounced();
      }
    );

    watch(dataCheckStamp, () => {
      req.LocationInfo.BFOCode = dataCheckStamp.value.Data.BFOCode;
      req.LocationInfo.LotCode = dataCheckStamp.value.Data.LotCode;
      req.LocationInfo.MaterialName = dataCheckStamp.value.Data.MaterialName;
      req.LocationInfo.Quantity = dataCheckStamp.value.Data.Quantity;
      req.LocationInfo.WareOld = dataCheckStamp.value.Data.WareMaterial;
    });

    // call api create change location
    async function fetchCreateChangeLocation() {
      await createChangeLocation(req);
      console.log('dataCreateChangeLocation ', dataCreateChangeLocation);

      if (dataCreateChangeLocation.value.RespCode === 0) {
        ElNotification({
          title: 'Thành công',
          message: 'Chuyển vị trí thành công',
          type: 'success',
        });
      } else {
        ElNotification({
          title: 'Thât bại',
          message: dataCreateChangeLocation.value.RespText,
          type: 'warning',
        });
      }
    }

    // dialog check stamp
    const isOpenDialogCheckStampID = ref(false);
    function openDialogCheckStampID() {
      req.LocationInfo.StampID = '';
      isOpenDialogCheckStampID.value = true;
    }

    function scanQRStampID(prop) {
      console.log(prop);
      req.LocationInfo.StampID = prop;
      isOpenDialogCheckStampID.value = false;
    }

    // dialog scan new location
    const isOpenDialogLocation = ref(false);
    function openDialogLocation() {
      isOpenDialogLocation.value = true;
    }

    function scanNewLocation(prop) {
      req.LocationInfo.WareModify = prop;
      isOpenDialogLocation.value = false;
    }

    // validate
    const ruleFormRef = ref();

    const validateTypeLocation = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Chọn hình thức'));
      } else {
        callback();
      }
    };

    const validateStampID = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Nhập mã tem'));
      } else {
        callback();
      }
    };

    const validateWareModify = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Nhập vị trí mới'));
      } else {
        callback();
      }
    };

    const rules = {
      TypeLocation: [
        {
          required: true,
          validator: validateTypeLocation,
          trigger: 'blur',
        },
      ],
      StampID: [
        {
          required: true,
          validator: validateStampID,
          trigger: 'blur',
        },
      ],
      WareModify: [
        {
          required: true,
          validator: validateWareModify,
          trigger: 'blur',
        },
      ],
    };

    const submitForm = async () => {
      await ruleFormRef.value.validate((valid) => {
        if (valid) {
          fetchCreateChangeLocation();
          emit('closeDialog', false);
        }
      });
    };

    return {
      req,
      ruleFormRef,
      rules,
      submitForm,
      fetchCheckStamp,
      isOpenDialogCheckStampID,
      openDialogCheckStampID,
      scanQRStampID,
      isOpenDialogLocation,
      openDialogLocation,
      scanNewLocation,
    };
  },
};
</script>

<style>
.input-qr .el-input__wrapper {
  border-radius: 8px 0 0 8px;
}
</style>
