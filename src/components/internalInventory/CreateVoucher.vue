<template>
  <div class="vh-100 bg-white">
    <div class="text-center click-to-scan" v-if="isShowClickToScan">
      <img src="../../assets/img/ScanImg.jpg" @click="openToScan" />
      <p class="opacity-50 font-italic cursor-pointer" @click="openToScan">
        Click để quét mã <i class="ti-layout-grid2"></i>
      </p>
    </div>
    <div
      class="text-center click-to-scan"
      v-if="isLoadingData"
      v-loading="isLoadingData"
      element-loading-text="Đang kiểm tra..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="rgba(122, 122, 122, 0.8)"
    >
      <img src="../../assets/img/ScanImg.jpg" />
    </div>
    <div v-if="isOpenToScan">
      <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
      <el-input
        v-model="inputScan"
        placeholder="Quét mã barcode..."
        clearable
      />
    </div>
    <div v-if="isOpenStampByWareInven">
      <el-button
        class="create-receipts"
        type="primary"
        @click="openCreateInventoryDialog"
        ><i class="ti-plus me-2"></i> Tạo phiếu</el-button
      >
      <div class="p-2">
        <el-checkbox v-model="isAllCheckBox" label="Xác nhận kiểm kê tất cả" />
      </div>
      <el-table
        v-loading="isLoading"
        :data="dataGetStampByWareInven.Data"
        border
        class="table-inven"
      >
        <el-table-column width="55">
          <template #default="props">
            <el-checkbox
              v-model="props.row.IsCheck"
              @change="handleSelectionChange(props.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="STT" width="80">
          <template #default="props">
            {{ (currentPage - 1) * pageSize + props.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="Mã" prop="StampID" width="120" />
        <el-table-column label="Tên" width="180">
          <template #default="props">
            [{{ props.row.BFOCode }}] {{ props.row.Name }}
          </template>
        </el-table-column>
        <el-table-column label="Lô" prop="LotCode" width="120" />
        <el-table-column
          label="Hạn dùng"
          prop="DateExpired"
          :formatter="formatDateTemplate"
          width="120"
        />
        <el-table-column label="SL" width="110">
          <template #default="props">
            {{ props.row.QuantityRemain }} {{ props.row.Unit }}
          </template>
        </el-table-column>
        <el-table-column label="Thực tế" width="110">
          <template #default="props">
            <el-input
              v-model="props.row.BoxQuantity"
              @change="changeInputQuantity(props.row, $event)"
              type="number"
              placeholder="Nhập khối lượng..."
            />
          </template>
        </el-table-column>
        <el-table-column label="Chênh lệch" width="110">
          <template #default="props">
            {{ props.row.QuantityMin }} {{ props.row.Unit }}
          </template>
        </el-table-column>
        <el-table-column label="Ghi chú" width="120">
          <template #default="props">
            <el-input v-model="props.row.Note" type="textarea" rows="1" />
          </template>
        </el-table-column>
      </el-table>

      <div class="d-flex justify-content-between">
        <div>Tổng {{ dataGetStampByWareInven.TotalRows }}</div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          v-model:page-sizes="pageSizes"
          :background="true"
          layout="sizes, prev, pager, next"
          :total="dataGetStampByWareInven.TotalRows"
        />
      </div>

      <div class="text-center mt-1">
        <p class="opacity-50 font-italic cursor-pointer" @click="openToScan">
          Click để quét mã <i class="ti-layout-grid2 ml-2"></i>
        </p>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="isOpenCreateInventoryDialog"
    title="Tạo phiếu kiểm kê"
    width="420px"
  >
    <CreateInventoryDialog
      v-if="isOpenCreateInventoryDialog"
      :wareIDProps="inputScan"
      :isAllCheckBoxProps="isAllCheckBox"
      :lineLstProp="lineLstProp"
      @closeDialog="closeCreateInventoryDialog"
      @openToScan="openToScan"
    />
  </el-dialog>
</template>

<script>
import { ref, watch } from 'vue';
import { StreamBarcodeReader } from 'vue-barcode-reader';
import _ from 'lodash';
import useGetStampByWareInven from '../../api/getStampByWareInven';
import useCreateInventoryInternal from '../../api/createInventoryInternal';
import CreateInventoryDialog from './modal/CreateInventoryDialog';

export default {
  components: {
    StreamBarcodeReader,
    CreateInventoryDialog,
  },

  setup() {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));

    const inputScan = ref('');
    const isOpenToScan = ref(false);
    const isShowClickToScan = ref(true);
    const isLoadingData = ref(false);
    const { dataGetStampByWareInven, getStampByWareInven } =
      useGetStampByWareInven();
    const { createInventoryInternal } = useCreateInventoryInternal();
    const isOpenStampByWareInven = ref(false);
    const isLoading = ref(true);
    const isAllCheckBox = ref(false);
    const lineLstProp = ref([]);

    const reqCreateInventoryInternal = {
      UserName: inforLogin.UserInfo.Phone,
      Token: inforLogin.Token,
      InventoryHeaderInfo: {
        LineLst: [],
        Note: '',
        Type: 'PL',
        WareID: '',
      },
    };

    const handleSelectionChange = (val) => {
      if (val.BoxQuantity !== '') {
        reqCreateInventoryInternal.InventoryHeaderInfo.LineLst.push({
          Code: val.StampID,
          IsCheck: val.IsCheck === true ? 1 : 0,
          Note: val.Note,
          Quantity: val.BoxQuantity,
          QuantityRemain: val.QuantityRemain,
        });
        fetchCreateInventoryInternal();
        if (val.IsCheck) {
          for (let i = 0; i < lineLstProp.value.length; i++) {
            if (lineLstProp.value[i].Code === val.StampID) {
              return;
            }
          }
          lineLstProp.value.push({
            Code: val.StampID,
            IsCheck: val.IsCheck === true ? 1 : 0,
            Note: val.Note,
            Quantity: val.BoxQuantity,
            QuantityRemain: val.QuantityRemain,
          });
        }
      } else {
        reqCreateInventoryInternal.InventoryHeaderInfo.LineLst.push({
          Code: val.StampID,
          IsCheck: val.IsCheck === true ? 1 : 0,
          Note: val.Note,
          QuantityRemain: val.QuantityRemain,
        });
        fetchCreateInventoryInternal();
        if (val.IsCheck) {
          for (let i = 0; i < lineLstProp.value.length; i++) {
            if (lineLstProp.value[i].Code === val.StampID) {
              return;
            }
          }
          lineLstProp.value.push({
            Code: val.StampID,
            IsCheck: val.IsCheck === true ? 1 : 0,
            Note: val.Note,
            QuantityRemain: val.QuantityRemain,
          });
        }
      }
    };

    function openStampByWareInven() {
      isOpenToScan.value = false;
      isOpenStampByWareInven.value = true;
    }

    function openToScan() {
      inputScan.value = '';
      isShowClickToScan.value = false;
      isOpenStampByWareInven.value = false;
      isOpenToScan.value = true;
    }

    function onDecode(text) {
      inputScan.value = text;
    }

    // format Date
    function formatDateTemplate(row, column, cellValue) {
      const date = new Date(cellValue);
      const formattedDate = date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      return formattedDate;
    }

    // isOpenCreateInventoryDialog
    const isOpenCreateInventoryDialog = ref(false);
    function openCreateInventoryDialog() {
      isOpenCreateInventoryDialog.value = true;
    }

    function closeCreateInventoryDialog(prop) {
      isOpenCreateInventoryDialog.value = prop;
    }

    async function fetchCreateInventoryInternal() {
      reqCreateInventoryInternal.InventoryHeaderInfo.WareID = inputScan.value;

      await createInventoryInternal(reqCreateInventoryInternal);

      reqCreateInventoryInternal.InventoryHeaderInfo.LineLst = [];
    }

    // phan trang
    const currentPage = ref(1);
    const pageSize = ref(20);
    const pageSizes = ref([20, 30, 50, 100]);

    async function fetchGetStampByWareInven() {
      isOpenToScan.value = false;
      isLoadingData.value = true;
      isLoading.value = true;
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        Type: 'PL',
        WareID: inputScan.value,
        Search: '',
        PageNumber: currentPage.value,
        RowspPage: pageSize.value,
      };
      await getStampByWareInven(req);
      if (dataGetStampByWareInven.value.RespCode === 0) {
        openStampByWareInven();
        isLoading.value = false;
      } else {
        isOpenToScan.value = true;
      }

      isLoadingData.value = false;
    }

    const inputScanDebounce = _.debounce(() => {
      fetchGetStampByWareInven();
    }, 500);

    watch(inputScan, (newValue) => {
      if (newValue !== '') {
        inputScanDebounce();
      }
    });

    watch(currentPage, () => {
      fetchGetStampByWareInven();
    });

    watch(pageSize, () => {
      fetchGetStampByWareInven();
    });

    watch(isOpenStampByWareInven, (newValue) => {
      if (newValue === true) {
        dataGetStampByWareInven.value.Data.map((item) => {
          item.BoxQuantity = item.QuantityRemain;
        });
      }
    });

    function changeInputQuantity(row, value) {
      if (value === '') {
        row.QuantityMin = 'NaN';
      } else {
        row.QuantityMin = value - row.QuantityRemain;
      }
    }

    return {
      inputScan,
      onDecode,
      isShowClickToScan,
      isOpenToScan,
      openToScan,
      dataGetStampByWareInven,
      currentPage,
      pageSize,
      pageSizes,
      handleSelectionChange,
      isOpenStampByWareInven,
      openStampByWareInven,
      changeInputQuantity,
      formatDateTemplate,
      isLoadingData,
      isLoading,
      isOpenCreateInventoryDialog,
      openCreateInventoryDialog,
      closeCreateInventoryDialog,
      isAllCheckBox,
      lineLstProp,
    };
  },
};
</script>

<style>
.click-to-scan {
  position: relative;
  top: 10%;
}

.click-to-scan img {
  cursor: pointer;
}

.scanner-container > div {
  position: relative;
  text-align: center;
  height: 80vh;
}

.scanner-container video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* căn giữa theo chiều dọc */
}

.create-receipts {
  position: fixed;
  bottom: 15%;
  right: 5%;
  z-index: 9999;
}

.table-inven .el-table__body,
.table-inven .el-table__header {
  width: 100% !important;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
