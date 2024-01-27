<template>
  <div :style="{ padding: '5px' }">
    <el-button type="primary" @click="openScanQRCodeFunc"
      ><i class="ti-layout-grid2"></i> Quét mã</el-button
    >
  </div>

  <el-table
    :data="dataMaterialStamp.Data"
    v-loading="isLoading"
    @expand-change="onCellClickMaterialStamp"
  >
    <el-table-column type="expand">
      <!-- <template v-slot="{ row }"> -->
      <el-table :data="dataDetailStamp">
        <el-table-column label="STT" type="index" />
        <el-table-column label="Mô tả" prop="Reasion" />
        <el-table-column label="Số chứng từ" prop="DocumentID" />
        <el-table-column label="Số lượng">
          <template v-slot="{ row }">
            {{ row.Quantity }} {{ itemMaterialStamp.Unit }}
          </template>
        </el-table-column>
        <el-table-column label="Vị trí" prop="WareMaterial" />
        <el-table-column label="Người tạo" prop="Creater" />
        <el-table-column label="Ngày tạo" prop="TimeCreate" />
        <el-table-column label="Người cập nhật" prop="" />
        <el-table-column label="Ngày cập nhật" prop="" />
      </el-table>
      <!-- </template> -->
    </el-table-column>
    <el-table-column label="STT" type="index" width="120">
      <template #default="props">
        {{ (currentPage - 1) * pageSize + props.$index + 1 }}
        <i
          class="ti-pencil-alt"
          title="Chỉnh sửa"
          :style="{
            color: '#409eff',
            fontSize: '18px',
            fontWeight: '900',
            cursor: 'pointer',
          }"
        ></i>
        <i
          class="ti-trash"
          title="Xoá"
          :style="{
            color: 'red',
            fontSize: '18px',
            marginLeft: '10px',
            cursor: 'pointer',
          }"
        ></i>
      </template>
    </el-table-column>
    <el-table-column label="Mã tem" prop="StampID" width="120" />
    <el-table-column label="Phụ liệu" width="250">
      <template v-slot="{ row }">
        [{{ row.BFOCode }}] {{ row.MaterialName }}
      </template>
    </el-table-column>
    <el-table-column label="Số lô" prop="LotCode" width="150" />
    <el-table-column label="Vị trí" prop="WareMaterial" width="120" />
    <el-table-column label="Kho" prop="StoreCode" width="80" />
    <el-table-column label="Lượng nhập" prop="Quantity" width="120" />
    <el-table-column label="Xuất SX" prop="QuanExProduce" />
    <el-table-column label="Xuất lẻ" prop="QuanExElement" />
    <el-table-column label="Xuất KN" prop="QuanExSample" />
    <el-table-column label="HH tăng" prop="QuanExLossR" />
    <el-table-column label="HH giảm" prop="QuanExLossL" />
    <el-table-column label="Lượng tồn" prop="QuantityRemain" width="100" />
    <el-table-column label="ĐVT" prop="Unit" />
    <el-table-column label="QRCode" prop="QRCode" width="120" />
    <el-table-column label="Ghi chú" prop="Note" />
  </el-table>

  <div class="d-flex justify-content-between">
    <div>Tổng {{ dataMaterialStamp.TotalRows }}</div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      v-model:page-sizes="pageSizes"
      :background="true"
      layout="sizes, prev, pager, next"
      :total="dataMaterialStamp.TotalRows"
    />
  </div>

  <el-dialog
    v-model="opentScanQRCode"
    title="Quét mã QRCode"
    width="580px"
    :style="{ marginTop: '10px' }"
  >
    <CheckStamp v-if="opentScanQRCode" @closeDialog="closeScanQRCodeDialog" />
  </el-dialog>

  <el-dialog
    v-if="openCreateChildStamp"
    v-model="openCreateChildStamp"
    title="NHẬP TEM NPL"
    width="580px"
    :style="{ marginTop: '10px' }"
  >
    <CreateChildStampModal @closeDialog="closeDialogCreateChildStampModal" />
  </el-dialog>

  <div :style="{ width: '200px' }">
    <QRCodeVue3
      value=""
      :width="200"
      :height="200"
      :qrOptions="{
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'H',
      }"
      :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
      :dotsOptions="{
        type: 'dots',
        color: '#26249a',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#26249a' },
            { offset: 1, color: '#26249a' },
          ],
        },
      }"
      :backgroundOptions="{ color: '#ffffff' }"
      :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
      :cornersDotOptions="{ type: undefined, color: '#000000' }"
      fileExt="png"
      :download="true"
      myclass="my-qur"
      imgclass="img-qr"
      downloadButton="my-button"
      :downloadOptions="{ name: 'vqr', extension: 'png' }"
    />
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import useStampLineMaterial from '../../api/getMaterialStamp';
import useDetailStamp from '../../api/getDetailStamp';
import CreateChildStampModal from './modal/CreateChildStampModal';
import CheckStamp from './modal/CheckStamp';
import QRCodeVue3 from 'qrcode-vue3';

export default {
  components: {
    CreateChildStampModal,
    CheckStamp,
    QRCodeVue3,
  },

  setup() {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));

    const { getMaterialStamp, dataMaterialStamp } = useStampLineMaterial();
    const { getDetailStamp, dataDetailStamp } = useDetailStamp();

    const isLoading = ref(true); //loading

    const itemMaterialStamp = reactive({}); //get one

    // modal Scan QRCode
    const opentScanQRCode = ref(false);
    function openScanQRCodeFunc() {
      opentScanQRCode.value = true;
    }
    // end modal ScanQRCode

    // modal Child Stamp
    const openCreateChildStamp = ref(false);
    function closeScanQRCodeDialog(props) {
      opentScanQRCode.value = props;
      openCreateChildStamp.value = true;
    }
    // end modal Child Stamp

    //click arow table
    function onCellClickMaterialStamp(row) {
      Object.assign(itemMaterialStamp, row);
      fetchDetailStamp();
    }

    // close Dialog CreateChildStampModal
    function closeDialogCreateChildStampModal(props) {
      openCreateChildStamp.value = props;
      fetchMaterialStamp();
    }

    //paginate
    const currentPage = ref(1);
    const pageSizes = ref([10, 20, 30, 50, 100]);
    const pageSize = ref(pageSizes.value[0]);

    //call api Material Stamp
    async function fetchMaterialStamp() {
      isLoading.value = true; //begin loading

      const req = {
        PageNumber: currentPage.value,
        RowspPage: pageSize.value,
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        TypeMaterial: 'PL',
        Search: '',
        LotCode: '',
        Product: '',
        WareMaterial: '',
      };
      try {
        await getMaterialStamp(req);
      } catch (e) {
        console.log(e);
      }
      isLoading.value = false; //end loading
    }
    fetchMaterialStamp();

    watch(currentPage, () => {
      fetchMaterialStamp();
    });

    watch(pageSize, () => {
      fetchMaterialStamp();
    });

    //call api Detail Stamp
    async function fetchDetailStamp() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        StampID: itemMaterialStamp.StampID,
      };
      try {
        await getDetailStamp(req);
      } catch (e) {
        console.log(e);
      }
    }

    return {
      isLoading,
      onCellClickMaterialStamp,
      currentPage,
      pageSize,
      pageSizes,
      dataMaterialStamp,
      dataDetailStamp,
      itemMaterialStamp,
      openCreateChildStamp,
      opentScanQRCode,
      openScanQRCodeFunc,
      closeScanQRCodeDialog,
      closeDialogCreateChildStampModal,
    };
  },
};
</script>

<style></style>
