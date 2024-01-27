<template>
  <div class="modal-dialog custom-modal">
    <div class="modal-content custom-modal-content">
      <div class="modal-body">
        <div class="d-flex">
          <div class="modal-body-left" :style="{ width: '50%' }">
            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label><span :style="{ color: '#f56c6c' }">* </span>Mã BFO</label>
              <br />
              <el-select
                v-model="itemMaterial.BFOCode"
                placeholder="Chọn nguyên liệu"
                size="large"
                class="w-100"
              >
                <el-option
                  v-for="item in BFOCodeSlect"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label><span :style="{ color: '#f56c6c' }">* </span>Nhà SX</label>
              <el-input
                v-model="itemMaterial.Producer"
                clearable
                size="large"
                placeholder="Nhập nhà sản xuất..."
                class="w-100"
              />
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label><span :style="{ color: '#f56c6c' }">* </span>Số lô</label>
              <el-input
                v-model="itemMaterial.LotCode"
                clearable
                size="large"
                placeholder="Nhập số lô..."
                class="w-100"
              />
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label
                ><span :style="{ color: '#f56c6c' }">* </span>Đơn giá</label
              >
              <el-input
                v-model="itemMaterial.UnitPrice"
                clearable
                size="large"
                @focus="onInputFocus"
                @blur="onInputBlur"
                class="w-100"
              />
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label><span :style="{ color: '#f56c6c' }">* </span>NSX</label>
              <br />
              <el-date-picker
                v-model="itemMaterial.DateManufacture"
                type="date"
                placeholder="Chọn ngày sản xuất"
                format="DD-MM-YYYY"
                size="large"
                class="w-100"
              />
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label
                ><span :style="{ color: '#f56c6c' }">* </span>Tình trạng nguyên
                liệu</label
              >
              <br />
              <el-select
                v-model="itemMaterial.StatusMaterial"
                placeholder="Chọn tình trạng..."
                size="large"
                class="w-100"
              >
                <el-option
                  v-for="item in StatusMaterialSelect"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label><span :style="{ color: '#f56c6c' }">* </span>Kho</label>
              <br />
              <el-select
                v-model="itemMaterial.StoreCode"
                placeholder="Chọn kho..."
                size="large"
                class="w-100"
              >
                <el-option
                  v-for="item in StoreSelect"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
          </div>
          <div class="modal-body-right" :style="{ width: '50%' }">
            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label
                ><span :style="{ color: '#f56c6c' }">* </span>Nguyên liệu</label
              >
              <el-input
                v-model="itemMaterial.NameMaterial"
                clearable
                placeholder="Nhập nguyên liệu..."
                size="large"
                class="w-100"
              />
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label><span :style="{ color: '#f56c6c' }">* </span>Nhà CC</label>
              <br />
              <el-select
                v-model="itemMaterial.Supplier"
                placeholder="Chọn nhà cung cấp"
                size="large"
                class="w-100"
              >
                <el-option
                  v-for="item in SupplierSelect"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label><span :style="{ color: '#f56c6c' }">* </span>Mã lô</label>
              <el-input
                v-model="itemMaterial.LotNo"
                clearable
                placeholder="Nhập mã lô..."
                size="large"
                class="w-100"
              />
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label><span :style="{ color: '#f56c6c' }">* </span>Mã NCC</label>
              <el-input
                v-model="itemMaterial.SupplierID"
                clearable
                placeholder="Nhập mã ncc..."
                size="large"
                class="w-100"
              />
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label><span :style="{ color: '#f56c6c' }">* </span>HSD</label>
              <br />
              <el-date-picker
                v-model="itemMaterial.DateExpired"
                type="date"
                placeholder="Chọn ngày hết hạn"
                format="DD-MM-YYYY"
                size="large"
                class="w-100"
              />
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <label><span :style="{ color: '#f56c6c' }">* </span>Vị trí</label>
              <br />
              <el-select
                v-model="itemMaterial.WareMaterial"
                placeholder="Chọn vị trí bảo quản..."
                size="large"
                class="w-100"
              >
                <el-option
                  v-for="item in WareMaterialSelect"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>

            <div
              class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100 d-flex"
              :style="{ paddingLeft: '10px', paddingRight: '10px' }"
            >
              <div :style="{ width: '50%' }">
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Quy cách</label
                >
                <br />
                <el-select
                  v-model="itemMaterial.Packing"
                  placeholder="Chọn quy cách"
                  size="large"
                  class="w-100"
                >
                  <el-option
                    v-for="item in PackingSelect"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </div>

              <div :style="{ width: '50%' }">
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Đơn vị</label
                >
                <br />
                <el-select
                  v-model="itemMaterial.Unit"
                  placeholder="Chọn đơn vị"
                  size="large"
                  class="w-100"
                >
                  <el-option
                    v-for="item in UnitSelect"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-18px--mw-100" :style="{ padding: '0 10px' }">
          <label>Ghi chú</label>
          <el-input
            v-model="itemMaterial.Note"
            :rows="2"
            type="textarea"
            placeholder="Ghi chú..."
            class="w-100"
          />
        </div>

        <div class="d-flex mb-18px--mw-100" :style="{ padding: '0 10px' }">
          <div class="custom-checkbox w-50">
            <lable for="myCheckbox">
              <el-checkbox
                v-model="itemMaterial.IsKN"
                :checked="itemMaterial.IsKN === 1 ? true : false"
                label="Lấy mẫu kiểm nghiệm"
                size="large"
              />
            </lable>
          </div>

          <div
            class="w-50 el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
            :style="{ paddingLeft: '10px' }"
          >
            <el-select v-model="itemMaterial.Urgent" size="large" class="w-100">
              <el-option selected label="Thường" :value="0" />
              <el-option label="Gấp" :value="1" />
            </el-select>
          </div>
        </div>
      </div>
      <div class="modal-footer text-center">
        <el-button type="primary" @click="fetchUpdateMaterial"
          ><i class="ti-check"></i> Xác nhận</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useMaterialLst from '../../../api/materialList';

export default {
  props: {
    getMaterialProps: {
      type: Object,
      required: true,
    },
  },

  setup(props, { emit }) {
    let BFOCodeSlect = ['D01802', 'P01749', 'B01783'];
    let SupplierSelect = ['Việt Hàn', 'Hoà Bình', 'An Thịnh'];
    let StoreSelect = [
      ['010100', 'Kho 01'],
      ['010101', 'Kho 02'],
      ['010102', 'Kho 03'],
    ];
    let WareMaterialSelect = ['K1.A.0.0', 'K1.A1-001', 'K1.A1-002'];
    let PackingSelect = ['Cái', 'Bao', 'Hộp'];
    let UnitSelect = ['KG', 'ML', 'BAO'];
    let StatusMaterialSelect = [
      'Nguyên đai nguyên kiện',
      'Lấy mẫu kiểm nghiệm',
      'Khác',
    ];

    const itemMaterial = ref(props.getMaterialProps);

    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const { updateMaterial } = useMaterialLst();

    function closeModal() {
      emit('closeModal', false);
    }

    // format date yyyy-MM-dd
    function formatDateYyyyMMddHHmmss(date) {
      const inputDate = new Date(date);

      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const day = String(inputDate.getDate()).padStart(2, '0');
      const hour = String(inputDate.getHours()).padStart(2, '0');
      const minute = String(inputDate.getMinutes()).padStart(2, '0');
      const second = String(inputDate.getSeconds()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      return formattedDate;
    }

    // update LO
    async function fetchUpdateMaterial() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        MaterialImportInfo: {
          RowID: itemMaterial.value.RowID,
          BFOCode: itemMaterial.value.BFOCode,
          NameMaterial: itemMaterial.value.NameMaterial,
          Producer: itemMaterial.value.Producer,
          LotCode: itemMaterial.value.LotCode,
          LotNo: itemMaterial.value.LotNo,
          UnitPrice:
            itemMaterial.value.UnitPrice !== Number
              ? 0
              : itemMaterial.value.UnitPrice,
          Supplier: itemMaterial.value.Supplier,
          SupplierID: itemMaterial.value.SupplierID,
          DateManufacture: formatDateYyyyMMddHHmmss(
            itemMaterial.value.DateManufacture
          ),
          DateExpired: formatDateYyyyMMddHHmmss(itemMaterial.value.DateExpired),
          StatusMaterial: itemMaterial.value.StatusMaterial,
          WareMaterial: itemMaterial.value.WareMaterial,
          StoreCode: itemMaterial.value.StoreCode,
          Packing: itemMaterial.value.Packing,
          Unit: itemMaterial.value.Unit,
          Note: itemMaterial.value.Note,
          IsKN: itemMaterial.value.IsKN === false ? 0 : 1,
          Urgent: itemMaterial.value.Urgent,
          CategoryMaterial: '',
          PostingDate: '',
          BillNo: '',
          BillDate: '',
          Symbol: '',
          TimeCreate: '',
          Creater: inforLogin.UserInfo.FullName,
          TimeModify: '',
          ModifyID: '',
          TypeImport: 1,
          Quantity: 0,
          MassLot: 0,
          Status: 27,
          Sense: '',
          Condition: '',
          Region: '',
          CheckElement: 34,
          ApproveID: '',
          TimeApprove: '',
          TypeMaterial: 'PL',
          StoreName: '',
          NumberK: '',
          COA: '',
          NumImport: 0,
          SumPrice: 0,
          QuantityPack: 0,
          VAT: 0,
          NLID: '',
          ImportFAST: true,
          TemLst: [],
        },
      };
      await updateMaterial(req);
      closeModal();
    }
    // end update LO

    return {
      itemMaterial,
      fetchUpdateMaterial,
      closeModal,
      BFOCodeSlect,
      SupplierSelect,
      StoreSelect,
      WareMaterialSelect,
      PackingSelect,
      UnitSelect,
      StatusMaterialSelect,
    };
  },
};
</script>

<style scoped>
* {
  font-size: 12px;
}
.custom-modal {
  max-width: 700px;
}

.custom-modal-content {
  height: 100%;
}

.el-input__inner::placeholder,
.el-textarea__inner::placeholder {
  font-size: 0.8571rem;
}

.el-input__inner,
.el-textarea__inner {
  height: 3.5em;
}

.mb-18px--mw-100 {
  margin-bottom: 18px;
  max-width: 100%;
}

.text-center {
  justify-content: center !important;
}
</style>
