<template>
  <div>
    <el-checkbox v-model="payOut" label="Xuất trả NCC" name="type" />
  </div>
  <div class="d-flex scan-checkStamp mb-2">
    <el-col :span="3">
      <label :style="{ lineHeight: '37px' }"
        ><strong :style="{ fontSize: '0.92857rem' }"
          >Danh sách tem:</strong
        ></label
      >
    </el-col>
    <el-col :span="20">
      <el-input v-model="inputStamp" placeholder="Quét | nhập mã tem..."
    /></el-col>
    <el-col
      :span="1"
      :style="{
        height: '100%',
        width: '60px',
        textAlign: 'center',
        lineHeight: '37px',
        backgroundColor: '#F5F7FA',
        borderRadius: '0 8px 8px 0',
        cursor: 'pointer',
      }"
      @click="openCheckStamp"
    >
      <span>
        <i class="ti-layout-grid2"></i>
      </span>
    </el-col>
  </div>

  <el-table
    :data="MaterialExportLst"
    border
    :summary-method="getSummaries"
    show-summary
  >
    <el-table-column label="STT" width="80">
      <template #default="props">
        {{ props.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column label="Số CT" width="120">
      <template #default="props">
        <el-input v-model="props.row.DocumentID" placeholder="Nhập số CT" />
      </template>
    </el-table-column>
    <el-table-column label="Tên" width="180">
      <template #default="props">
        [{{ props.row.BFOCode }}] {{ props.row.MaterialName }}
      </template>
    </el-table-column>
    <el-table-column label="Lô" prop="LotCode" width="100" />
    <el-table-column label="Vị trí" prop="WareMaterial" width="100" />
    <el-table-column label="Mã tem" prop="StampID" width="120" />
    <el-table-column label="Lượng xuất" prop="Quantity" width="120">
      <template #default="props">
        <el-input
          v-model="props.row.Quantity"
          placeholder="Lượng xuất"
          type="number"
        />
      </template>
    </el-table-column>
    <el-table-column label="ĐVT" prop="Unit" />
    <el-table-column label="Kho" prop="StoreCode">
      <template #default="props">
        <el-input v-model="props.row.StoreCode" placeholder="Kho" />
      </template>
    </el-table-column>
    <el-table-column label="Bộ phận" width="140">
      <template #default="props">
        <el-input v-model="props.row.Department" placeholder="Bộ phận..." />
      </template>
    </el-table-column>
    <el-table-column label="Ghi chú" width="160">
      <template #default="props">
        <el-input
          v-model="props.row.Note"
          placeholder="Ghi chú..."
          type="textarea"
        />
      </template>
    </el-table-column>

    <el-table-column>
      <template #default="props">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="deleteRow(props.$index)"
        >
          Xoá
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="text-center mt-4">
    <el-button type="primary" @click="fetchCreateExport"
      ><i class="ti-check" :style="{ marginRight: '5px' }"></i>Xác
      nhận</el-button
    >
  </div>

  <!-- scan check stamp -->
  <el-dialog v-model="isOpenCheckStamp" width="580px">
    <template #header>
      <h4 :style="{ color: '#409EFF' }">
        <i class="ti-marker-alt"></i> QUÉT MÃ
      </h4>
    </template>

    <ScanCheckStamp v-if="isOpenCheckStamp" @scanCheckStamp="scanCheckStamp" />
  </el-dialog>
  <!-- end scan check stamp -->
</template>

<script>
import { ref, watch } from 'vue';
import useCheckStamp from '../../../api/checkStamp';
import useCreateMaterialExportLst from '../../../api/createMaterialExportLst';
import _ from 'lodash';
import { ElNotification } from 'element-plus';
import ScanCheckStamp from './ScanCheckStamp';

export default {
  components: {
    ScanCheckStamp,
  },

  setup(props, { emit }) {
    const getSummaries = (param) => {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Tổng';
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (index === 6) {
          sums[index] = `${values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!Number.isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0)}`;
        }
      });

      return sums;
    };

    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));

    const { dataCheckStamp, checkStamp } = useCheckStamp();
    const { dataCreateMaterialExportLst, createMaterialExportLst } =
      useCreateMaterialExportLst();

    const payOut = ref(false);
    const inputStamp = ref('');

    const countSTT = ref(1);
    const MaterialExportLst = ref([]);

    // dialog checkStamp
    const isOpenCheckStamp = ref(false);
    function openCheckStamp() {
      isOpenCheckStamp.value = true;
    }

    function scanCheckStamp(prop) {
      inputStamp.value = prop;
    }
    // end dialog checkStamp

    // table add
    const onAddItem = () => {
      for (let i = 0; i < MaterialExportLst.value.length; i++) {
        if (inputStamp.value === MaterialExportLst.value[i].StampID) {
          ElNotification({
            title: 'Xảy ra lỗi',
            message: 'Mã tem đã tồn tại',
            type: 'warning',
          });
          return;
        }
      }

      MaterialExportLst.value.push({
        BFOCode: dataCheckStamp.value.Data.BFOCode,
        Department: '',
        DocumentID: '',
        LotCode: dataCheckStamp.value.Data.LotCode,
        LotID: dataCheckStamp.value.Data.LotID,
        MaterialName: dataCheckStamp.value.Data.MaterialName,
        Note: '',
        NumKN: dataCheckStamp.value.Data.NumKN,
        Quantity: dataCheckStamp.value.Data.QuantityRemain,
        QuantityGet: 0,
        QuantityOrigin: dataCheckStamp.value.Data.QuantityRemain,
        QuantityRemain: 0,
        Reasion: 'Xuất lẻ phụ liệu',
        STT: countSTT.value++,
        StampID: dataCheckStamp.value.Data.StampID,
        StoreCode: dataCheckStamp.value.Data.StoreCode,
        Type: 'PL',
        Unit: dataCheckStamp.value.Data.Unit,
        WareMaterial: dataCheckStamp.value.Data.WareMaterial,
      });

      ElNotification({
        title: 'Thành công',
        message: 'Thêm tem ' + dataCheckStamp.value.Data.StampID,
        type: 'success',
      });
    };

    const deleteRow = (index) => {
      MaterialExportLst.value.splice(index, 1);
      countSTT.value--;
    };
    // end table add

    // call api create export
    async function fetchCreateExport() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        MaterialExportLst: MaterialExportLst.value,
      };
      await createMaterialExportLst(req);
      console.log('dataCreateMaterialExportLst', dataCreateMaterialExportLst);
      if (dataCreateMaterialExportLst.value.RespCode === 0) {
        emit('closeDialog', false);
      }
    }
    // end call api create export

    // call api check Stamp
    async function fetchCheckStamp(inputStampProp) {
      let inputStampTrim = inputStampProp.trim();
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        StampID: inputStampTrim,
        Type: payOut.value === true ? 'Xuất huỷ' : '',
      };

      const patternMoreThan10 = /^\d{11,}$/;
      const patternMoreThan11AndDash = /^\d{11,}-\d*$/;
      if (
        patternMoreThan10.test(inputStampTrim) |
        patternMoreThan11AndDash.test(inputStampTrim)
      ) {
        await checkStamp(req);

        if (dataCheckStamp.value.RespCode === 0) {
          onAddItem();
          inputStamp.value = '';
        } else {
          ElNotification({
            title: 'Xảy ra lỗi',
            message: dataCheckStamp.value.RespText,
            type: 'warning',
          });
        }
      }
    }
    // end call api check stamp

    const checkStampDebounce = _.debounce((newValue) => {
      fetchCheckStamp(newValue);
    }, 1500);

    watch(inputStamp, (newValue) => {
      if (inputStamp.value !== '') {
        checkStampDebounce(newValue);
      }
    });

    return {
      payOut,
      inputStamp,
      MaterialExportLst,
      onAddItem,
      deleteRow,
      getSummaries,
      scanCheckStamp,
      isOpenCheckStamp,
      openCheckStamp,
      fetchCreateExport,
    };
  },
};
</script>

<style>
.scan-checkStamp .el-input__wrapper {
  border-radius: 8px 0 0 8px;
}
</style>
