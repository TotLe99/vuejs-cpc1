<template>
  <div :style="{ padding: '5px' }">
    <el-button type="primary" @click="openCreateExportDialog"
      ><i
        class="ti-plus"
        :style="{ marginRight: '5px', fontWeight: 'bold' }"
      ></i
      >Xuất PL</el-button
    >
  </div>
  <el-table :data="data" v-loading="loading" style="width: 100%">
    <el-table-column label="STT" width="100">
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
    <el-table-column label="Trạng thái" width="100">
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
                    ? 'status-1-exported'
                    : ''
                "
              >
                {{
                  props.row.Status === 1 || props.row.Status === 2
                    ? 'Đã xuất'
                    : ''
                }}
              </span>
            </el-badge>
          </template>
        </el-popover>

        <span
          v-else
          :class="
            props.row.Status === 1 || props.row.Status === 2
              ? 'status-1-exported'
              : ''
          "
        >
          {{
            props.row.Status === 1 || props.row.Status === 2 ? 'Đã xuất' : ''
          }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="Tem" prop="StampID" />
    <el-table-column label="Phụ liệu">
      <template #default="props">
        [{{ props.row.BFOCode }}] {{ props.row.NameMaterial }}
      </template>
    </el-table-column>
    <el-table-column label="Số lô" prop="LotCode" />
    <el-table-column label="Lượng xuất">
      <template #default="props">
        {{ props.row.Quantity }} ({{ props.row.Unit }})
      </template>
    </el-table-column>
    <el-table-column label="Người xuất" prop="Creater" />
    <el-table-column label="Ngày xuất" prop="TimeCreate" width="140" />
  </el-table>

  <div class="d-flex justify-content-between">
    <div>Tổng {{ totalRows }}</div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      v-model:page-sizes="pageSizes"
      :background="true"
      layout="sizes, prev, pager, next"
      :total="totalRows"
    />
  </div>

  <el-dialog v-model="isOpenCreateExportDialog" width="80%">
    <template #header>
      <h4 :style="{ color: '#409EFF', frontWeight: 'bold' }">
        <i class="ti-pencil"></i>TẠO PHIẾU XUẤT PHỤ LIỆU
      </h4>
    </template>
    <CreateExportDialog
      v-if="isOpenCreateExportDialog"
      @closeDialog="closeCreateExportDialog"
    />
  </el-dialog>
</template>

<script>
import { ref, watch } from 'vue';
import useGetMaterialExport from '../../api/getMaterialExport';
import CreateExportDialog from './modal/CreateExportDialog';

export default {
  components: {
    CreateExportDialog,
  },
  setup() {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const data = ref();
    const totalRows = ref();

    const loading = ref(true);

    const { dataGetMaterialExport, getMaterialExport } = useGetMaterialExport();

    // phan trang
    const currentPage = ref(1);
    const pageSizes = ref([10, 20, 30, 50, 100]);
    const pageSize = ref(pageSizes.value[0]);

    async function fetchGetMaterialExport() {
      loading.value = true;
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        Type: 'PL',
        Reasion: 'Xuất lẻ phụ liệu',
        Search: '',
        PageNumber: currentPage.value,
        RowspPage: pageSize.value,
      };
      await getMaterialExport(req);
      data.value = dataGetMaterialExport.value.Data;
      totalRows.value = dataGetMaterialExport.value.TotalRows;

      loading.value = false;
    }
    fetchGetMaterialExport();

    watch(currentPage, () => {
      fetchGetMaterialExport();
    });

    watch(pageSize, () => {
      fetchGetMaterialExport();
    });

    // dialog isOpenCreateExportDialog
    const isOpenCreateExportDialog = ref(false);
    function openCreateExportDialog() {
      isOpenCreateExportDialog.value = true;
    }

    function closeCreateExportDialog(prop) {
      isOpenCreateExportDialog.value = prop;
      fetchGetMaterialExport();
    }
    // end dialog isOpenCreateExportDialog

    return {
      currentPage,
      pageSize,
      pageSizes,
      dataGetMaterialExport,
      loading,
      data,
      totalRows,
      isOpenCreateExportDialog,
      openCreateExportDialog,
      closeCreateExportDialog,
    };
  },
};
</script>

<style>
.status-1-exported {
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
