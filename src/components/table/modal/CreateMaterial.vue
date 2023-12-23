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
                v-model="inputData.selectedBFOCode"
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
                v-model="inputData.inputProducer"
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
                v-model="inputData.inputLotCode"
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
                v-model="inputData.inputUnitPrice"
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
                v-model="inputData.inputDateManufacture"
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
                v-model="inputData.inputStatusMaterial"
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
                v-model="inputData.inputStoreCode"
                placeholder="Chọn kho..."
                size="large"
                class="w-100"
              >
                <el-option
                  v-for="item in StoreSelect"
                  :key="item[0]"
                  :label="item[0] + ' - ' + item[1]"
                  :value="item[0]"
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
                v-model="inputData.inputNameMaterial"
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
                v-model="inputData.selectedSupplier"
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
                v-model="inputData.inputLotNo"
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
                v-model="inputData.inputSupplierID"
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
                v-model="inputData.inputDateExpired"
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
                v-model="inputData.inputWareMaterial"
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
                  v-model="inputData.inputPacking"
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
                  v-model="inputData.inputUnit"
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
            v-model="inputData.inputNote"
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
                v-model="inputData.inputIsKN"
                label="Lấy mẫu kiểm nghiệm"
                size="large"
              />
            </lable>
          </div>

          <div
            class="w-50 el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
            :style="{ paddingLeft: '10px' }"
          >
            <el-select
              v-model="inputData.inputUrgent"
              size="large"
              class="w-100"
            >
              <el-option selected label="Thường" :value="0" />
              <el-option label="Gấp" :value="1" />
            </el-select>
          </div>
        </div>
      </div>
      <div class="modal-footer text-center">
        <el-button type="primary" @click="fetchCreateMaterial"
          ><i class="ti-check"></i> Xác nhận</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import useMaterialLst from '../../../api/materialList';

export default {
  setup(props, { emit }) {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const { createMaterial } = useMaterialLst();

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

    //create Lo
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

    const inputData = reactive({
      selectedBFOCode: '',
      inputNameMaterial: '',
      inputProducer: '',
      inputLotCode: '',
      inputLotNo: '',
      inputUnitPrice: 0,
      selectedSupplier: '',
      inputSupplierID: '',
      inputDateManufacture: '',
      inputDateExpired: '',
      inputStatusMaterial: '',
      inputWareMaterial: '',
      inputStoreCode: '',
      inputPacking: '',
      inputUnit: '',
      inputNote: '',
      inputIsKN: false,
      inputUrgent: 0,
    });

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
    async function fetchCreateMaterial() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        MaterialImportInfo: {
          BFOCode: inputData.selectedBFOCode,
          NameMaterial: inputData.inputNameMaterial,
          Producer: inputData.inputProducer,
          LotCode: inputData.inputLotCode,
          LotNo: inputData.inputLotNo,
          UnitPrice:
            inputData.inputUnitPrice !== Number ? 0 : inputData.inputUnitPrice,
          Supplier: inputData.selectedSupplier,
          SupplierID: inputData.inputSupplierID,
          DateManufacture: formatDateYyyyMMddHHmmss(
            inputData.inputDateManufacture
          ),
          DateExpired: formatDateYyyyMMddHHmmss(inputData.inputDateExpired),
          StatusMaterial: inputData.inputStatusMaterial,
          WareMaterial: inputData.inputWareMaterial,
          StoreCode: inputData.inputStoreCode,
          Packing: inputData.inputPacking,
          Unit: inputData.inputUnit,
          Note: inputData.inputNote,
          IsKN: inputData.inputIsKN === false ? 0 : 1,
          Urgent: inputData.inputUrgent,
          CategoryMaterial: '',
          PostingDate: '',
          BillNo: '',
          BillDate: '',
          Symbol: '',
          TimeCreate: '',
          Creater: inforLogin.UserInfo.FullName,
          TimeModify: '',
          ModifyID: '',
          TimeImport: formatDateYyyyMMddHHmmss(new Date()),
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
      await createMaterial(req);
      closeModal();
    }
    // end create LO
    return {
      closeModal,
      BFOCodeSlect,
      SupplierSelect,
      StoreSelect,
      WareMaterialSelect,
      PackingSelect,
      UnitSelect,
      StatusMaterialSelect,
      inputData,
      onInputFocus,
      onInputBlur,
      fetchCreateMaterial,
    };
  },
};
</script>

<style>
.custom-modal {
  max-width: 700px;
}

.custom-modal-content {
  height: 100%;
}

.el-input__inner::placeholder,
.el-textarea__inner::placeholder {
  font-size: 12px;
}

.mb-18px--mw-100 {
  margin-bottom: 18px;
  max-width: 100%;
}

.text-center {
  justify-content: center !important;
}
</style>
