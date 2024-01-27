<template>
  <div class="dialog-body">
    <div class="d-flex justify-content-between mb-20px">
      <label class="input-11em">Nguyên liệu</label>
      <el-input
        :value="dataCheckStamp.MaterialName"
        placeholder="Nguyên liệu"
        readonly
      />
    </div>
    <div class="d-flex justify-content-between mb-20px">
      <div class="d-flex justify-content-between w-50">
        <label>Số lô</label>
        <el-input
          :style="{ width: '57%', cursor: 'not-allowed' }"
          :value="dataCheckStamp.LotNo"
          placeholder="Số lô"
          readonly
        />
      </div>
      <div class="d-flex justify-content-between w-50">
        <label class="indent-20px">Thùng số</label>
        <el-input
          :style="{ width: '57%' }"
          :value="numberBox"
          placeholder="Nhập thùng số"
          readonly
        />
      </div>
    </div>
    <div class="d-flex justify-content-between mb-20px">
      <div class="d-flex justify-content-between w-50">
        <label>Số lượng/ Klg</label>
        <el-input
          :style="{ width: '57%' }"
          :value="dataCheckStamp.Quantity"
          placeholder="Số lượng/ Klg"
          readonly
        />
      </div>
      <div class="d-flex justify-content-between w-50">
        <label class="indent-20px">Đã nhập</label>
        <el-input
          :style="{ width: '57%' }"
          :value="dataCheckStamp.QuantityExpect"
          placeholder="Đã nhập"
          readonly
        />
      </div>
    </div>
    <div class="d-flex justify-content-between mb-20px">
      <label class="input-11em">Vị trí</label>
      <el-input
        :value="dataCheckStamp.WareMaterial"
        placeholder="Vị trí"
        readonly
      />
    </div>
    <div class="d-flex justify-content-between mb-20px">
      <label>Danh sách</label>
      <div class="d-flex scan-code-child-stamp">
        <el-input v-model="addChildStamp" placeholder="Quét mã code..." />
        <span
          @click="openDialogCreateChildStamp"
          :style="{
            height: '100%',
            width: '60px',
            textAlign: 'center',
            lineHeight: '37px',
            backgroundColor: '#F5F7FA',
            borderRadius: '0 8px 8px 0',
            cursor: 'pointer',
          }"
        >
          <i class="ti-layout-grid2"></i>
        </span>
      </div>
    </div>

    <div>
      <table class="dashed-border" v-if="showTable">
        <span
          :style="{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            opacity: '.6',
          }"
          >Không có dữ liệu</span
        >
      </table>

      <el-table v-else-if="showTableData" :data="childStamp">
        <el-table-column prop="name" label="STT" align="center" width="120">
          <template #default="props">
            {{ props.$index + 1 }}

            <i
              class="ti-trash"
              title="Xoá"
              :style="{
                color: 'red',
                fontSize: '18px',
                cursor: 'pointer',
              }"
              @click.prevent="deleteRow(props.$index)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="Mã">
          <template #default="props">
            <span>{{ childStamp[props.$index].StampID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Số lượng" align="center">
          <template #default="props">
            <el-input-number
              v-model="childStamp[props.$index].Quantity"
              :min="1"
              :max="1000000"
              width="100%"
          /></template>
        </el-table-column>

        <template #append>
          <div class="el-table__footer-wrapper">
            <table
              class="table table-hover"
              :style="{
                marginBottom: '0',
                height: '35px',
                textAlign: 'center',
              }"
            >
              <tr :style="{ backgroundColor: '#F5F7FA' }">
                <td :style="{ width: '120px' }">Tổng</td>
                <td :style="{ width: '260px' }"></td>
                <td :style="{ width: '260px' }">{{ sumQuantityChildStamp }}</td>
              </tr>
            </table>
          </div>
        </template>
      </el-table>
    </div>

    <div class="footer text-center mt-3">
      <el-button type="primary" @click="fetchCreateMaterialStamp"
        ><i class="ti-check"></i> Xác nhận</el-button
      >
    </div>
  </div>

  <el-dialog
    v-model="isOpenDialogCreateChildStamp"
    title="Quét mã QRCode"
    width="580px"
    :style="{ marginTop: '10px' }"
  >
    <ScanCreateChildStamp
      v-if="isOpenDialogCreateChildStamp"
      @onAddItem="onAddItem"
    />
  </el-dialog>
</template>

<script>
import { ref, reactive, watch, computed } from 'vue';
import { useStore } from 'vuex';
import useCreateMaterialStamp from '../../../api/createMaterialStamp';
import { ElNotification } from 'element-plus';
import _ from 'lodash';
import ScanCreateChildStamp from './ScanCreateChildStamp';

export default {
  components: {
    ScanCreateChildStamp,
  },

  setup(props, { emit }) {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const store = useStore();
    const dataCheckStamp = reactive(store.getters.dataCheckStampVuex.Data);
    const { dataCreateMaterialStamp, createMaterialStamp } =
      useCreateMaterialStamp();
    const addChildStamp = ref('');

    // open dialog scan qrcode
    const isOpenDialogCreateChildStamp = ref(false);
    function openDialogCreateChildStamp() {
      isOpenDialogCreateChildStamp.value = true;
    }

    // get Number box
    let numberBox = ref('');
    function numberBoxFunc() {
      let array = [];
      for (let i = 0; i < dataCheckStamp.StampID.length; i++) {
        array.push(dataCheckStamp.StampID[i]);
      }
      array[array.length - 2] === '-'
        ? (numberBox.value = array.slice(-1))
        : array[array.length - 3] === '-'
        ? (numberBox.value = array.slice(-2))
        : array[array.length - 4] === '-'
        ? (numberBox.value = array.slice(-3))
        : array[array.length - 5] === '-'
        ? (numberBox.value = array.slice(-4))
        : (numberBox.value = 'quá 10000');
    }
    numberBoxFunc();
    // end get Number box

    const childStamp = ref([]);

    // action table
    let countSTT = 0;
    const pattern23AndMoreThan10 = /^23\d{10,}$/;
    function onAddItem(addChildStampProp) {
      if (
        addChildStampProp !== '' &&
        pattern23AndMoreThan10.test(addChildStampProp)
      ) {
        for (let i = 0; i < childStamp.value.length; i++) {
          if (addChildStampProp === childStamp.value[i].StampID) {
            ElNotification({
              title: 'Xảy ra lỗi',
              message: 'Mã ' + addChildStampProp + ' đã tồn tại',
              type: 'warning',
            });
            return;
          }
        }

        childStamp.value.push({
          LotID: dataCheckStamp.LotID,
          Note: dataCheckStamp.Note,
          NumberBox: numberBox.value[0],
          QRCode: dataCheckStamp.StampID,
          Quantity: 1,
          STT: countSTT++,
          StampID: addChildStampProp,
          WareMaterial: dataCheckStamp.WareMaterial,
        });

        ElNotification({
          title: 'Thành công',
          message: 'Mã ' + addChildStampProp + ' được thêm!',
          type: 'success',
        });

        showTableFunc();
      } else if (addChildStampProp === '') {
        ElNotification({
          title: 'Xảy ra lỗi',
          message: 'Vui lòng nhập mã code',
          type: 'warning',
        });
      } else if (!pattern23AndMoreThan10.test(addChildStampProp)) {
        ElNotification({
          title: 'Xảy ra lỗi',
          message: 'Bắt đầu là 23 và >=10 đơn vị tiếp...',
          type: 'warning',
        });
      }
    }

    const onAddItemDebounced = _.debounce((newValue) => {
      onAddItem(newValue);
    }, 1500);

    watch(addChildStamp, (newValue) => {
      onAddItemDebounced(newValue);
    });

    function deleteRow(index) {
      childStamp.value.splice(index, 1);
      countSTT--;
      showTableFunc();
    }

    const showTable = ref(true);
    const showTableData = ref(false);
    function showTableFunc() {
      if (childStamp.value.length === 0) {
        showTable.value = true;
      } else {
        showTable.value = false;
        showTableData.value = true;
      }
    }

    const sumQuantityChildStamp = computed(() => {
      return childStamp.value.reduceRight(
        (total, stamp) => total + stamp.Quantity,
        0
      );
    });
    // end action table

    // close Dialog
    function closeDialog() {
      emit('closeDialog', false);
    }

    // api create child stamp
    async function fetchCreateMaterialStamp() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        MaterialStampLst: childStamp.value,
      };

      await createMaterialStamp(req);
      countSTT = 0;
      if (dataCreateMaterialStamp.value.RespCode !== 0) {
        ElNotification({
          title: 'Xảy ra lỗi',
          message: 'Vui lòng nhập danh sách',
          type: 'warning',
        });
      } else {
        if (
          dataCheckStamp.QuantityExpect + sumQuantityChildStamp.value >
          dataCheckStamp.Quantity
        ) {
          ElNotification({
            title: 'Xảy ra lỗi',
            message: 'Vượt quá số lượng tem',
            type: 'warning',
          });
        } else {
          ElNotification({
            title: 'Thành công',
            message: 'Bạn đã tạo tem',
            type: 'success',
          });
          closeDialog();
        }
      }
    }

    return {
      dataCheckStamp,
      numberBox,
      addChildStamp,
      childStamp,
      fetchCreateMaterialStamp,
      onAddItem,
      deleteRow,
      showTable,
      showTableData,
      closeDialog,
      isOpenDialogCreateChildStamp,
      openDialogCreateChildStamp,
      sumQuantityChildStamp,
    };
  },
};
</script>

<style>
.el-input__inner {
  height: 2.7rem !important;
}

.el-input__wrapper {
  height: 2.7rem !important;
}

.mb-20px {
  margin-bottom: 20px;
}

.input-40em {
  width: 40em;
}

.input-13em {
  width: 13em;
}

.input-11em {
  width: 11em;
}

.input-16em {
  width: 16em;
}

.indent-20px {
  text-indent: 20px;
}

label {
  font-size: 13.33333px;
  font-weight: bold;
}

.dashed-border {
  text-align: center;
  line-height: 6em;
  border: 0.5px dashed #403f3f;
  width: 100%;
  height: 6em;
  opacity: 0.8;
}

.el-icon svg {
  font-size: 1.6rem;
}

.scan-code-child-stamp {
  width: 35.9em;
}

.scan-code-child-stamp .el-input__wrapper {
  border-radius: 8px 0 0 8px;
}

.el-input-number {
  width: 100%;
}
</style>
