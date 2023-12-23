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
      <button
        class="btn btn-success"
        :style="{ marginLeft: '0.5rem', height: '100%' }"
        @click="openModalCreate()"
      >
        +Thêm
      </button>
    </div>
  </div>
  <div>
    <el-table
      :data="dataMeterialList"
      v-loading="isLoading"
      stripe
      style="width: 100%"
    >
      <el-table-column label="Thao tác" width="82">
        <template v-slot="{ row }">
          <i
            class="ti-pencil-alt"
            title="Chỉnh sửa"
            :style="{
              color: '#409eff',
              fontSize: '18px',
              fontWeight: '900',
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
      <el-table-column prop="TimeImport" label="Ngày nhập" width="95" />
      <el-table-column prop="Creater" label="Người nhập" width="152" />
      <el-table-column
        prop="NameMaterial"
        label="Tên nguyên liệu"
        width="190"
      />
      <el-table-column prop="NLID" label="Số lô" width="110" />
      <el-table-column prop="LotNo" label="Mã lô" width="120" />
      <el-table-column prop="WareMaterial" label="Vị trí" width="105" />
      <el-table-column prop="MassLot" label="Khối lượng" width="105" />
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
    ></DelMaterial>
  </el-dialog>
  <!-- end modal delete -->

  <!-- modal create -->
  <el-dialog
    v-if="modalCreate"
    v-model="modalCreate"
    close-on-click-modal
    title="NHẬP LÔ NGUYÊN LIỆU"
    width="700px"
    top="30px"
  >
    <CreateMaterial @closeModal="closeModalCreate" />
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
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';
import useMaterialLst from '../../api/materialList';
import CreateMaterial from './modal/CreateMaterial';
import UpdateMaterial from './modal/UpdateMaterial';
import DelMaterial from './modal/DelMaterial';
export default {
  components: {
    CreateMaterial,
    UpdateMaterial,
    DelMaterial,
  },

  setup() {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));

    const { getMaterialLst, paginateMaterialLst, dataMaterialLst } =
      useMaterialLst();

    const isLoading = ref(true); // Trạng thái loading

    const hiddenButton = ref(true);

    // modal
    const modalCreate = ref(false);
    function openModalCreate() {
      modalCreate.value = true;
    }

    function closeModalCreate(props) {
      modalCreate.value = props;
    }

    const modalUpdate = ref(false);
    function openModalUpdate() {
      modalUpdate.value = true;
    }

    function closeModalUpdate(props) {
      modalUpdate.value = props;
    }

    const modalDelete = ref(false);
    function openModalDelete() {
      hiddenButton.value = true;
      modalDelete.value = true;
    }

    function closeModalDelete(props) {
      modalDelete.value = props;
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
    const materials = ref([]);
    const selectedStartDate = ref(new Date());
    const selectedEndDate = ref(new Date() + 1);
    watch(selectedStartDate, () => {
      fetchMaterialList();
    });

    watch(selectedEndDate, () => {
      fetchMaterialList();
    });

    function fetchMaterialList() {
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
        getMaterialLst(req, isLoading);
      } catch (error) {
        console.error(error);
      }

      isLoading.value = false; // Kết thúc loading
    }

    fetchMaterialList();
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
    const currentPage = ref(1);
    const pageSize = ref(10);
    const pageSizes = ref([10, 20, 30, 50, 100, 200]);

    const dataMeterialList = computed(() => {
      return paginateMaterialLst(currentPage, pageSize);
    });

    watch(pageSizes, (newPageSizes) => {
      if (!newPageSizes.includes(pageSize.value)) {
        pageSize.value = newPageSizes[0];
      }
    });
    // end phan trang

    return {
      fetchMaterialList,
      selectedStartDate,
      selectedEndDate,
      formatDateDdMMyyyy,
      formatDateYyyyMMdd,
      materials,
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
    };
  },
};
</script>

<style scoped>
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
</style>
