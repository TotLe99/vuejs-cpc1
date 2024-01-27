<template>
  <div class="d-flex">
    <div :style="{ padding: '5px' }">
      <el-date-picker
        v-model="selectedStartDate"
        type="date"
        placeholder="Ngày bắt đầu"
        format="DD-MM-YYYY"
        size="large"
      />
    </div>
    <div :style="{ padding: '5px' }">
      <el-date-picker
        v-model="selectedEndDate"
        type="date"
        placeholder="Ngày kết thúc"
        format="DD-MM-YYYY"
        size="large"
      />
    </div>
    <div :style="{ padding: '5px' }">
      <el-button
        type="primary"
        :style="{ marginLeft: '0.5rem', height: '100%' }"
        @click="openModalCreate()"
      >
        <i class="ti-plus"></i> Thêm lô
      </el-button>
    </div>
  </div>
  <div>
    <el-table
      :data="dataMeterialList"
      v-loading="isLoading"
      stripe
      @expand-change="onCellClickStampHeader"
    >
      <el-table-column type="expand" #default="props">
        <el-button type="primary" @click="openModalCreateStamp(props.row)"
          ><i class="ti-plus"></i> Thêm tem</el-button
        >

        <el-table
          :data="props.row.TemLst"
          @expand-change="onCellClickStampLine"
        >
          <el-table-column type="expand">
            <el-table :data="dataStampLineMaterial">
              <el-table-column label="STT" width="100">
                <template #default="props">
                  {{ (currentPage - 1) * pageSize + props.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="Mã tem" prop="StampID" width="150" />
              <el-table-column label="Tên" prop="Name" width="300">
                <template v-slot="{ row }">
                  [{{ row.BFOCode }}] {{ row.Name }}
                </template>
              </el-table-column>
              <el-table-column label="Số lô" prop="LotCode" width="160" />
              <el-table-column label="Số lượng" prop="Quantity" width="150" />
              <el-table-column label="Vị trí" prop="WareMaterial" width="150" />
              <el-table-column label="Ghi chú" prop="Note" />
            </el-table>
          </el-table-column>
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column label="Thao tác" width="82">
            <template>
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
          <el-table-column label="Mã tem" prop="StampID" width="150" />
          <el-table-column label="Tên" prop="Name" width="300">
            <template v-slot="{ row }">
              [{{ row.BFOCode }}] {{ row.Name }}
            </template>
          </el-table-column>
          <el-table-column label="Số lô" prop="LotCode" width="160" />
          <el-table-column label="Số lượng" prop="Quantity" width="150" />
          <el-table-column label="Vị trí" prop="WareMaterial" width="150" />
          <el-table-column label="Ghi chú" prop="Note" />
        </el-table>
      </el-table-column>
      <el-table-column width="80">
        <template #default="props">
          {{ (currentPage - 1) * pageSize + props.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" width="110">
        <template v-slot="{ row }">
          <el-popover trigger="click">
            <div class="p-1">
              <el-button
                type="info"
                @click="openAcceptMaterialImportDialog(row, 2)"
                ><i class="ti-check"></i>
                <span :style="{ marginLeft: '5px' }">Chờ kiểm</span></el-button
              >
            </div>
            <div class="p-1">
              <el-button
                type="warning"
                @click="openAcceptMaterialImportDialog(row, 6)"
                ><i class="ti-upload"></i>
                <span :style="{ marginLeft: '5px' }">Chờ duyệt</span></el-button
              >
            </div>
            <div class="p-1">
              <el-button
                type="success"
                @click="openAcceptMaterialImportDialog(row, 3)"
                ><i class="ti-check-box"></i>
                <span :style="{ marginLeft: '5px' }">Đạt</span></el-button
              >
            </div>

            <template #reference>
              <i
                class="ti-exchange-vertical"
                title="Xác nhận"
                :style="{
                  color: 'green',
                  fontSize: '18px',
                  fontWeight: '900',
                  cursor: 'pointer',
                }"
              ></i>
            </template>
          </el-popover>

          <i
            class="ti-pencil-alt"
            title="Chỉnh sửa"
            :style="{
              color: '#409eff',
              fontSize: '18px',
              fontWeight: '900',
              marginLeft: '10px',
              cursor: 'pointer',
            }"
            @click="
              () => {
                openModalUpdate();
                getItemMaterial(row);
              }
            "
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
            @click="
              () => {
                openModalDelete();
                getItemMaterial(row);
              }
            "
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="TimeImport" label="Ngày nhập" width="92" />
      <el-table-column prop="Creater" label="Người nhập" width="152" />
      <el-table-column label="Trạng thái" width="110">
        <template #default="props">
          <el-popover trigger="hover" v-if="props.row.Note">
            <div class="popover-title">Ghi chú</div>
            <div class="popover-content">
              {{ props.row.Note }}
            </div>
            <template #reference>
              <el-badge is-dot class="item">
                <span
                  :class="
                    props.row.Status === 1 || props.row.Status === 2
                      ? 'status-2-waitingCheck'
                      : props.row.Status === 6
                      ? 'status-6-pending'
                      : props.row.Status === 3
                      ? 'status-3-pass'
                      : props.row.Status === 4
                      ? 'status-4-waitingSample'
                      : ''
                  "
                  >{{
                    props.row.Status === 1 || props.row.Status === 2
                      ? 'Chờ kiểm'
                      : props.row.Status === 6
                      ? 'Chờ duyệt'
                      : props.row.Status === 3
                      ? 'Đạt'
                      : props.row.Status === 4
                      ? 'Chờ lấy mẫu'
                      : ''
                  }}</span
                >
              </el-badge>
            </template>
          </el-popover>
          <span
            v-else
            :class="
              props.row.Status === 1 || props.row.Status === 2
                ? 'status-2-waitingCheck'
                : props.row.Status === 6
                ? 'status-6-pending'
                : props.row.Status === 3
                ? 'status-3-pass'
                : props.row.Status === 4
                ? 'status-4-waitingSample'
                : ''
            "
            >{{
              props.row.Status === 1 || props.row.Status === 2
                ? 'Chờ kiểm'
                : props.row.Status === 6
                ? 'Chờ duyệt'
                : props.row.Status === 3
                ? 'Đạt'
                : props.row.Status === 4
                ? 'Chờ lấy mẫu'
                : ''
            }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="NameMaterial" label="Tên nguyên liệu" width="190">
        <template v-slot="{ row }">
          [{{ row.BFOCode }}] {{ row.NameMaterial }}
        </template>
      </el-table-column>
      <el-table-column prop="NLID" label="Số lô" width="110" />
      <el-table-column prop="LotNo" label="Mã lô" width="120" />
      <el-table-column prop="WareMaterial" label="Vị trí" width="105" />
      <el-table-column prop="NumImport" label="Khối lượng" width="105" />
      <el-table-column prop="QuantityPack" label="Quy cách" width="105" />
      <el-table-column prop="SumPrice" label="Giá tiền" width="105" />
      <el-table-column prop="StoreCode" label="Kho" width="105" />
      <el-table-column
        prop="DateManufacture"
        :formatter="formatDateTemplate"
        label="NSX"
        width="105"
      />
      <el-table-column
        prop="DateExpired"
        :formatter="formatDateTemplate"
        label="HD"
        width="105"
      />
      <el-table-column prop="Producer" label="Nhà SX" width="162" />
      <el-table-column prop="Supplier" label="Nhà CC" width="155" />
    </el-table>

    <div class="d-flex justify-content-between">
      <div>Tổng {{ Array.from(dataMaterialLst).length }}</div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        v-model:page-sizes="pageSizes"
        :background="true"
        layout="sizes, prev, pager, next"
        :total="Array.from(dataMaterialLst).length"
      />
    </div>
  </div>

  <!-- modal delete -->
  <el-dialog
    v-if="modalDelete"
    v-model="modalDelete"
    title="Xoá báo cáo"
    width="600"
    align-center
  >
    <DelMaterial
      :getMaterialProps="itemMaterial"
      :hiddenButtonProps="hiddenButton"
      @closeModal="closeModalDelete"
      @accept="acceptDel"
    ></DelMaterial>
  </el-dialog>
  <!-- end modal delete -->

  <!-- modal create -->
  <el-dialog
    v-if="modalCreate"
    v-model="modalCreate"
    close-on-click-modal
    width="700px"
    top="30px"
  >
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <span :id="titleId" :class="titleClass"
          ><i class="ti-pencil"></i> THÊM MỚI LÔ PHỤ LIỆU</span
        >
      </div>
    </template>
    <CreateMaterial
      @closeModal="closeModalCreate"
      :dataGetItemFastProps="dataGetItemFast"
      :dataGetLocationStoreProps="dataGetLocationStore"
      :dataGetLocationProps="dataGetLocation"
      :dataQASupplierProps="dataQASupplier"
      :dataQAMaterialUnitProps="dataQAMaterialUnit"
      :dataQAStatusMaterialProps="dataQAStatusMaterial"
      :dataQAMaterialPackingProps="dataQAMaterialPacking"
    />
  </el-dialog>
  <!-- end modal create -->

  <!-- modal update -->
  <el-dialog
    v-if="modalUpdate"
    v-model="modalUpdate"
    close-on-click-modal
    title="CẬP NHẬT LÔ NGUYÊN LIỆU"
    width="700px"
    top="30px"
  >
    <UpdateMaterial
      :getMaterialProps="itemMaterial"
      @closeModal="closeModalUpdate"
    ></UpdateMaterial>
  </el-dialog>
  <!-- end modal update -->

  <!-- modal create stamp -->
  <el-dialog
    v-if="modalCreateStamp"
    v-model="modalCreateStamp"
    close-on-click-modal
    title="THÊM TEM LÔ NHẬP"
    width="580px"
    top="30px"
  >
    <CreateStampDialog
      :itemMaterialProps="itemMaterial"
      @closeModalCreateStamp="closeModalCreateStamp"
    />
  </el-dialog>
  <!-- end modal create tem -->

  <!-- modal accept material import -->
  <el-dialog
    v-model="isOpenAcceptMaterialImportDialog"
    close-on-click-modal
    title="Xác nhận trạng thái"
    width="420px"
  >
    <AcceptMaterialImportDialog
      v-if="isOpenAcceptMaterialImportDialog"
      :itemMaterialProp="itemMaterial"
      :statusNumberProp="statusNumber"
      @closeDialog="closeAcceptMaterialImportDialog"
      @changeStatusNumber="changeStatusNumber"
    />
  </el-dialog>
  <!-- end modal accept material import -->
</template>

<script>
import { ref, reactive, watch } from 'vue';
import useMaterialLst from '../../api/materialList';
import useStampHeaderMaterial from '../../api/getStampHeaderMaterial';
import useStampLineMaterial from '../../api/getStampLineMaterial';
import useGetItemFast from '../../api/getItemFast';
import useGetLocationStore from '../../api/getLocationStore';
import useGetDefaultValue from '../../api/getDefaultValue';
import useGetLocation from '../../api/getLocation';
import CreateMaterial from './modal/CreateMaterial';
import UpdateMaterial from './modal/UpdateMaterial';
import DelMaterial from './modal/DelMaterial';
import CreateStampDialog from './modal/CreateStampDialog';
import AcceptMaterialImportDialog from './modal/AcceptMaterialImportDialog';

export default {
  components: {
    CreateMaterial,
    UpdateMaterial,
    DelMaterial,
    CreateStampDialog,
    AcceptMaterialImportDialog,
  },

  setup() {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));

    const {
      getMaterialLst,
      dataMaterialLst,
      currentPage,
      pageSize,
      pageSizes,
    } = useMaterialLst();

    const { getStampHeaderMaterial, dataStampHeaderMaterial } =
      useStampHeaderMaterial();

    const { getStampLineMaterial, dataStampLineMaterial } =
      useStampLineMaterial();

    const { dataGetItemFast, getItemFast } = useGetItemFast();

    const { dataGetLocationStore, getLocationStore } = useGetLocationStore();

    const {
      dataQASupplier,
      dataQAMaterialUnit,
      dataQAStatusMaterial,
      dataQAMaterialPacking,
      getDefaultValue,
    } = useGetDefaultValue();

    const { dataGetLocation, getLocation } = useGetLocation();

    const isLoading = ref(true); // Trạng thái loading

    const hiddenButton = ref(true);

    // modal
    const modalCreate = ref(false);
    function openModalCreate() {
      modalCreate.value = true;
    }

    function closeModalCreate(props) {
      modalCreate.value = props;
      fetchMaterialList();
    }

    const modalUpdate = ref(false);
    function openModalUpdate() {
      modalUpdate.value = true;
    }

    function closeModalUpdate(props) {
      modalUpdate.value = props;
      fetchMaterialList();
    }

    const modalDelete = ref(false);
    function openModalDelete() {
      hiddenButton.value = true;
      modalDelete.value = true;
    }

    let accept = ref(false);
    function acceptDel(props) {
      accept.value = props;
    }

    function closeModalDelete(props) {
      modalDelete.value = props;
      fetchMaterialList();
    }

    const modalCreateStamp = ref(false);
    function openModalCreateStamp() {
      modalCreateStamp.value = true;
    }

    function closeModalCreateStamp(props) {
      modalCreateStamp.value = props;
      fetchStampHeaderMaterial();
    }

    const isOpenAcceptMaterialImportDialog = ref(false);
    const statusNumber = ref();
    function openAcceptMaterialImportDialog(item, number) {
      getItemMaterial(item);
      statusNumber.value = number;
      isOpenAcceptMaterialImportDialog.value = true;
    }

    function closeAcceptMaterialImportDialog(prop) {
      isOpenAcceptMaterialImportDialog.value = prop;
    }

    function changeStatusNumber(StatusNumberProp, rowIDProp) {
      dataMeterialList.value.find((item) => item.RowID === rowIDProp).Status =
        StatusNumberProp;
    }
    //end modal

    // get one material
    const itemMaterial = reactive({});

    function getItemMaterial(item) {
      Object.assign(itemMaterial, item);
    }
    // end get one material

    // format date yyyy-MM-dd
    function formatDateYyyyMMdd(date) {
      const inputDate = new Date(date);

      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const day = String(inputDate.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }

    function formatDateTemplate(row, column, cellValue) {
      const date = new Date(cellValue);
      const formattedDate = date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      return formattedDate;
    }

    // format date dd/MM/yy
    function formatDateDdMMyyyy(date) {
      const inputDate = new Date(date);

      const year = String(inputDate.getFullYear());
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const day = String(inputDate.getDate()).padStart(2, '0');

      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }

    // display List
    const dataMeterialList = ref([]);
    const selectedStartDate = ref(new Date());
    const selectedEndDate = ref(new Date() + 1);

    watch(selectedEndDate, () => {
      fetchMaterialList();
    });

    watch(selectedStartDate, () => {
      fetchMaterialList();
    });

    //api list
    async function fetchMaterialList() {
      isLoading.value = true;
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        DateStart:
          selectedStartDate.value != null
            ? formatDateYyyyMMdd(selectedStartDate.value)
            : '',
        DateEnd:
          selectedEndDate.value != null
            ? formatDateYyyyMMdd(selectedEndDate.value)
            : '',
        TypeMaterial: 'PL',
        Search: '',
        Status: '',
        ReTest: 0,
      };

      try {
        dataMeterialList.value = await getMaterialLst(req);
      } catch (error) {
        console.error(error);
      }

      isLoading.value = false; // Kết thúc loading
    }
    fetchMaterialList();

    watch([currentPage, pageSize], () => {
      fetchMaterialList();
    });
    //end api list

    // call api getItemFast
    async function fetchItemFast() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        ID: 'QA',
      };
      await getItemFast(req);
    }
    fetchItemFast();

    // call api getLocationStore
    async function fetchLocationStore() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
      };
      await getLocationStore(req);
    }
    fetchLocationStore();

    // call api QA Supplier
    async function fetchQASupplier() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        Table: 'QASupplier',
      };
      await getDefaultValue(req);
    }
    fetchQASupplier();

    // call api QA MaterialUnit
    async function fetchQAMaterialUnit() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        Table: 'QAMaterialUnit',
      };
      await getDefaultValue(req);
    }
    fetchQAMaterialUnit();

    // call api QA StatusMaterial
    async function fetchQAStatusMaterial() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        Table: 'QAStatusMaterial',
      };
      await getDefaultValue(req);
    }
    fetchQAStatusMaterial();

    // call api QA MaterialPacking
    async function fetchQAMaterialPacking() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        Table: 'QAMaterialPacking',
      };
      await getDefaultValue(req);
    }
    fetchQAMaterialPacking();

    // call api getLocation
    async function fetchLocation() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        PageNumber: 1,
        RowspPage: 5000,
        Search: '',
        WareType: 'PL',
      };
      await getLocation(req);
    }
    fetchLocation();

    //api stamp header
    async function fetchStampHeaderMaterial(row) {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        NLID: row.NLID,
      };

      try {
        await getStampHeaderMaterial(req);
        row.TemLst = dataStampHeaderMaterial.value.Data;
        row.TotalRows = dataStampHeaderMaterial.value.TotalRows;
        console.log(dataStampHeaderMaterial.value);
      } catch (e) {
        console.log(e);
      }
    }

    //api stamp line
    async function fetchStampLineMaterial() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        StampID: itemStampHeaderMaterial.StampID,
      };

      try {
        await getStampLineMaterial(req);
      } catch (e) {
        console.log(e);
      }
    }
    //end display List

    //default 0
    function onInputFocus() {
      if (this.inputData.inputUnitPrice === '0') {
        this.inputData.inputUnitPrice = ''; // Xóa giá trị mặc định 0 khi người dùng tập trung vào ô input
      }
    }

    function onInputBlur() {
      if (this.inputData.inputUnitPrice === '') {
        this.inputData.inputUnitPrice = '0'; // Khôi phục giá trị mặc định 0 khi người dùng rời khỏi ô input mà không nhập gì
      }
    }
    // end default 0

    // phan trang
    watch(pageSizes, (newPageSizes) => {
      if (!newPageSizes.includes(pageSize.value)) {
        pageSize.value = newPageSizes[0];
      }
    });
    // end phan trang

    function onCellClickStampHeader(row) {
      console.log(row.TemLst);
      if (row.TemLst.length === 0) {
        fetchStampHeaderMaterial(row);
      }
    }

    const itemStampHeaderMaterial = reactive({});
    function onCellClickStampLine(row) {
      Object.assign(itemStampHeaderMaterial, row);
      fetchStampLineMaterial();
    }

    return {
      fetchMaterialList,
      fetchStampHeaderMaterial,
      selectedStartDate,
      selectedEndDate,
      formatDateDdMMyyyy,
      formatDateYyyyMMdd,
      dataMeterialList,
      onInputFocus,
      onInputBlur,
      itemMaterial,
      getItemMaterial,
      isLoading,
      currentPage,
      pageSize,
      pageSizes,
      dataMaterialLst,
      modalCreate,
      openModalCreate,
      modalUpdate,
      openModalUpdate,
      modalDelete,
      openModalDelete,
      formatDateTemplate,
      closeModalCreate,
      closeModalUpdate,
      closeModalDelete,
      hiddenButton,
      acceptDel,
      dataStampHeaderMaterial,
      onCellClickStampHeader,
      dataStampLineMaterial,
      onCellClickStampLine,
      modalCreateStamp,
      openModalCreateStamp,
      closeModalCreateStamp,
      dataGetItemFast,
      dataGetLocationStore,
      dataQASupplier,
      dataQAMaterialUnit,
      dataQAStatusMaterial,
      dataQAMaterialPacking,
      dataGetLocation,
      isOpenAcceptMaterialImportDialog,
      openAcceptMaterialImportDialog,
      closeAcceptMaterialImportDialog,
      statusNumber,
      changeStatusNumber,
    };
  },
};
</script>

<style scoped>
.my-header span {
  color: #409eff;
  font-weight: bold;
}

.my-header span i {
  font-size: 18px;
}
.custom-input::placeholder {
  font-size: 14px;
  opacity: 0.5;
}

.custom-textarea::placeholder {
  font-size: 14px;
  opacity: 0.5;
}

.custom-input,
.custom-select,
.custom-textarea {
  border: 0.5px solid #ccc;
}

.custom-modal {
  max-width: 700px;
}

.custom-modal-content {
  height: 100%;
}

.mb-18px--mw-100 {
  margin-bottom: 18px;
  max-width: 100%;
}

.text-center {
  justify-content: center !important;
}

.status-2-waitingCheck {
  padding: 0 5px;
  border-radius: 4px;
  background-color: #f4f4f5;
  color: #909399;
  border: 1px solid #e9e9eb;
}

.status-3-pass {
  padding: 0 5px;
  border-radius: 4px;
  background-color: #f0f9eb;
  color: #67c23a;
  border-color: 1px solid #e1f3d8;
}

.status-6-pending {
  padding: 0 5px;
  border-radius: 4px;
  background-color: #fdf6ec;
  color: #e6a23c;
  border-color: 1px solid #faecd8;
}

.status-4-waitingSample {
  padding: 0 5px;
  border-radius: 4px;
  background-color: #ecf5ff;
  color: #409eff;
  border-color: 1px solid #d9ecff;
}

.popover-title {
  color: #e6a23c;
  font-size: 0.875;
  font-weight: bold;
}
</style>
