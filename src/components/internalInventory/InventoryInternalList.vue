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
  </div>
  <el-table
    :data="dataInventoryInternalLst"
    v-loading="isLoading"
    border
    @expand-change="onCellExpand"
  >
    <el-table-column type="expand">
      <template #default="props">
        <el-table :data="props.row.LineLst" v-model="rowExpand" border>
          <el-table-column label="STT">
            <template #default="props">
              {{ (currentPageLine - 1) * pageSizeLine + props.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="Mã tem" prop="Code" />
          <el-table-column label="Tên">
            <template #default="props">
              [{{ props.row.BFOCode }}] {{ props.row.Name }}
            </template>
          </el-table-column>
          <el-table-column label="Lô" prop="LotCode" />
          <el-table-column label="Vị trí" prop="WareID" />
          <el-table-column label="Số lượng" prop="Quantity" />
          <el-table-column label="Thực tế" prop="QuantityRemain" />
          <el-table-column label="Chênh lệch">
            <template #default="props">
              {{ props.row.QuantityRemain - props.row.Quantity }}
            </template>
          </el-table-column>
          <el-table-column label="Ghi chú" prop="Note" />
        </el-table>

        <div class="d-flex justify-content-between">
          <div>Tổng {{ props.row.TotalRows }}</div>
          <el-pagination
            v-model:current-page="currentPageLine"
            v-model:page-size="pageSizeLine"
            v-model:page-sizes="pageSizes"
            :background="true"
            layout="sizes, prev, pager, next"
            :total="props.row.TotalRows"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="STT">
      <template #default="props">
        {{
          (currentPageInventoryInternalLst - 1) * pageSizeInventoryInternalLst +
          props.$index +
          1
        }}
      </template>
    </el-table-column>
    <el-table-column label="Trạng thái">
      <template #default="props">
        <span
          :class="
            props.row.Status === 1
              ? 'status-1-newCreated'
              : props.row.Status === 3
              ? 'status-3-pass'
              : ''
          "
        >
          {{
            props.row.Status === 1
              ? 'Mới tạo'
              : props.row.Status === 3
              ? 'Xác nhận'
              : ''
          }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="Mã phiếu" prop="DocumentID" />
    <el-table-column label="Vị trí" prop="WareID" />
    <el-table-column label="Thực hiện" prop="Creater" />
    <el-table-column label="Ngày tạo" prop="TimeCreate" />
    <el-table-column label="Ghi chú" prop="Note" />
  </el-table>

  <div class="d-flex justify-content-between">
    <div>Tổng {{ totalRowsInventoryInternalLst }}</div>
    <el-pagination
      v-model:current-page="currentPageInventoryInternalLst"
      v-model:page-size="pageSizeInventoryInternalLst"
      v-model:page-sizes="pageSizes"
      :background="true"
      layout="sizes, prev, pager, next"
      :total="totalRowsInventoryInternalLst"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import useGetInventoryInternalLst from '../../api/getInventoryInternalLst';
import useGetInventoryInternalLineLst from '../../api/getInventoryInternalLineLst';

export default {
  setup() {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));

    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);

    const selectedStartDate = ref(fomartDateYYYYMMDD(startDate));
    const selectedEndDate = ref(fomartDateYYYYMMDD(endDate));

    const isLoading = ref(false);
    const isLoadingLine = ref(false);

    const dataInventoryInternalLst = ref();
    const totalRowsInventoryInternalLst = ref();

    const { dataGetInventoryInternalLst, getInventoryInternalLst } =
      useGetInventoryInternalLst();

    const { dataGetInventoryInternalLineLst, getInventoryInternalLineLst } =
      useGetInventoryInternalLineLst();

    // fomart date yyyy-MM-dd
    function fomartDateYYYYMMDD(date) {
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, '0');
      let day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    //   call api InventoryInternalLst
    // phân trang
    const pageSizes = ref([10, 20, 30, 40, 50, 100]);
    const currentPageInventoryInternalLst = ref(1);
    const pageSizeInventoryInternalLst = ref(pageSizes.value[0]);
    async function fetchInventoryInternalLst() {
      isLoading.value = true;
      const req = {
        PageNumber: currentPageInventoryInternalLst.value,
        RowspPage: pageSizeInventoryInternalLst.value,
        Search: '',
        TimeEnd: selectedEndDate.value,
        TimeStart: selectedStartDate.value,
        Token: inforLogin.Token,
        Type: 'PL',
        UserName: inforLogin.UserInfo.Phone,
      };
      await getInventoryInternalLst(req);

      dataInventoryInternalLst.value = dataGetInventoryInternalLst.value.Data;
      totalRowsInventoryInternalLst.value =
        dataGetInventoryInternalLst.value.TotalRows;
      isLoading.value = false;
    }
    fetchInventoryInternalLst();

    watch(currentPageInventoryInternalLst, () => {
      fetchInventoryInternalLst();
    });

    watch(pageSizeInventoryInternalLst, () => {
      fetchInventoryInternalLst();
    });

    // call api InventoryInternalLineLst
    // phân trang
    const currentPageLine = ref(1);
    const pageSizeLine = ref(pageSizes.value[0]);

    const rowExpand = ref();
    async function fetchgetInventoryInternalLineLst(row) {
      //   isLoadingLine.value = true;

      rowExpand.value = row;
      const req = {
        DocumentID: row.DocumentID,
        PageNumber: currentPageLine.value,
        RowspPage: pageSizeLine.value,
        Search: '',
        TimeEnd: selectedEndDate.value,
        TimeStart: selectedStartDate.value,
        Token: inforLogin.Token,
        Type: 'PL',
        UserName: inforLogin.UserInfo.Phone,
      };
      await getInventoryInternalLineLst(req);

      row.LineLst = dataGetInventoryInternalLineLst.value.Data;

      row.TotalRows = dataGetInventoryInternalLineLst.value.TotalRows;

      //   isLoadingLine.value = false;
    }

    function onCellExpand(row) {
      if (row.LineLst.length === 0) {
        fetchgetInventoryInternalLineLst(row);
      }
    }

    watch(currentPageLine, () => {
      fetchgetInventoryInternalLineLst(rowExpand.value);
    });

    watch(pageSizeLine, () => {
      fetchgetInventoryInternalLineLst(rowExpand.value);
    });

    return {
      selectedStartDate,
      selectedEndDate,
      isLoading,
      isLoadingLine,
      pageSizes,
      currentPageInventoryInternalLst,
      pageSizeInventoryInternalLst,
      currentPageLine,
      pageSizeLine,
      dataInventoryInternalLst,
      totalRowsInventoryInternalLst,
      fetchgetInventoryInternalLineLst,
      onCellExpand,
    };
  },
};
</script>

<style>
.status-1-newCreated {
  padding: 0 5px;
  border-radius: 4px;
  background-color: #ecf5ff;
  color: #409eff;
  border-color: 1px solid #d9ecff;
}

.status-3-pass {
  padding: 0 5px;
  border-radius: 4px;
  background-color: #f0f9eb;
  color: #67c23a;
  border-color: 1px solid #e1f3d8;
}
</style>
