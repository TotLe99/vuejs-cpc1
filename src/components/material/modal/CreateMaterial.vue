<template>
  <div class="modal-dialog custom-modal">
    <el-form ref="ruleFormRef" :model="inputData" status-icon :rules="rules">
      <div class="modal-content custom-modal-content">
        <div class="modal-body">
          <div class="d-flex">
            <div class="modal-body-left" :style="{ width: '50%' }">
              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item prop="selectedBFOCode">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>Mã BFO</label
                  >
                  <br />
                  <el-select-v2
                    v-model="inputData.selectedBFOCode"
                    filterable
                    :options="dataGetItemFast"
                    placeholder="Chọn nguyên liệu"
                    class="w-100"
                  />
                </el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item>
                  <label>Nhà SX</label>
                  <el-input
                    v-model="inputData.inputProducer"
                    clearable
                    size="large"
                    placeholder="Nhập nhà sản xuất..."
                    class="w-100"
                    disabled
                  />
                </el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item prop="inputLotCode">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>Số lô</label
                  >
                  <el-input
                    v-model="inputData.inputLotCode"
                    clearable
                    size="large"
                    placeholder="Nhập số lô..."
                    class="w-100"
                /></el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item>
                  <label>Đơn giá</label>
                  <el-input
                    v-model="inputData.inputUnitPrice"
                    clearable
                    size="large"
                    @focus="onInputFocus"
                    @blur="onInputBlur"
                    class="w-100"
                  />
                </el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item prop="inputDateManufacture">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>NSX</label
                  >
                  <br />
                  <el-date-picker
                    v-model="inputData.inputDateManufacture"
                    type="date"
                    placeholder="Chọn ngày sản xuất"
                    format="DD-MM-YYYY"
                    size="large"
                    class="w-100"
                    @change="clearSelectedError"
                /></el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item prop="inputStatusMaterial">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>Tình
                    trạng</label
                  >
                  <br />
                  <el-select-v2
                    v-model="inputData.inputStatusMaterial"
                    filterable
                    :options="dataQAStatusMaterial"
                    placeholder="Chọn tình trạng"
                    class="w-100"
                    @change="clearSelectedError"
                  />
                </el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item prop="inputStoreCode">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>Kho</label
                  >
                  <br />
                  <el-select-v2
                    v-model="inputData.inputStoreCode"
                    filterable
                    :options="dataGetLocationStore"
                    placeholder="Chọn kho..."
                    class="w-100"
                    @change="clearSelectedError"
                  >
                    <template #default="{ item }">
                      <span :style="{ float: 'left' }">{{ item.label }}</span>
                      <span
                        :style="{
                          float: 'right',
                          fontSize: '10px',
                          opacity: '0.6',
                        }"
                        >{{ item.value }}</span
                      >
                    </template>
                  </el-select-v2>
                </el-form-item>
              </div>
            </div>
            <div class="modal-body-right" :style="{ width: '50%' }">
              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item prop="inputNameMaterial">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>Tên PL</label
                  >
                  <el-input
                    v-model="inputData.inputNameMaterial"
                    clearable
                    placeholder="Nhập phụ liệu..."
                    size="large"
                    class="w-100"
                    disabled
                /></el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item prop="selectedSupplier">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>Nhà CC</label
                  >
                  <br />
                  <el-select-v2
                    v-model="inputData.selectedSupplier"
                    filterable
                    :options="dataQASupplier"
                    placeholder="Chọn nhà cung cấp"
                    class="w-100"
                    @change="clearSelectedError"
                  />
                </el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item prop="inputLotNo">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>Mã lô</label
                  >
                  <el-input
                    v-model="inputData.inputLotNo"
                    clearable
                    placeholder="Nhập mã lô..."
                    size="large"
                    class="w-100"
                /></el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item>
                  <label>Mã NCC</label>
                  <el-input
                    v-model="inputData.inputSupplierID"
                    clearable
                    placeholder="Nhập mã ncc..."
                    size="large"
                    class="w-100"
                /></el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item prop="inputDateExpired">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>HSD</label
                  >
                  <br />
                  <el-date-picker
                    v-model="inputData.inputDateExpired"
                    type="date"
                    placeholder="Chọn ngày hết hạn"
                    format="DD-MM-YYYY"
                    size="large"
                    class="w-100"
                    @change="clearSelectedError"
                /></el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <el-form-item>
                  <label>Vị trí</label>
                  <br />
                  <el-select-v2
                    v-model="inputData.inputWareMaterial"
                    filterable
                    :options="dataGetLocation"
                    placeholder="Chọn vị trí bảo quản"
                    class="w-100"
                    @change="clearSelectedError"
                  />
                </el-form-item>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px--mw-100 d-flex"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <div :style="{ width: '50%' }">
                  <el-form-item prop="inputPacking">
                    <label
                      ><span :style="{ color: '#f56c6c' }">* </span>Quy
                      cách</label
                    >
                    <br />
                    <el-select-v2
                      v-model="inputData.inputPacking"
                      filterable
                      :options="dataQAMaterialPacking"
                      placeholder="Chọn quy cách"
                      class="w-100"
                      @change="clearSelectedError"
                    />
                  </el-form-item>
                </div>

                <div :style="{ width: '50%' }">
                  <el-form-item prop="inputUnit">
                    <label
                      ><span :style="{ color: '#f56c6c' }">* </span>Đơn
                      vị</label
                    >
                    <br />
                    <el-select-v2
                      v-model="inputData.inputUnit"
                      filterable
                      :options="dataQAMaterialUnit"
                      placeholder="Chọn đơn vị"
                      class="w-100"
                      @change="clearSelectedError"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-18px--mw-100">
            <el-table :data="inputData.inputTemLst" style="width: 100%">
              <el-table-column prop="tem-number" label="Tem số" width="75">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                  <i
                    class="ti-plus"
                    title="Thêm"
                    :style="{ color: '#409eff', cursor: 'pointer' }"
                    v-if="scope.$index === inputData.inputTemLst.length - 1"
                    @click="onAddItem"
                  ></i>
                </template>
              </el-table-column>
              <el-table-column
                prop="Quantity"
                label="Số lượng/ Klg"
                width="120"
              >
                <template #default="scope">
                  <el-input
                    v-model="inputData.inputTemLst[scope.$index].Quantity"
                    placeholder="Nhập số lượng/ Klg..."
                    @focus="onInputFocus"
                    @blur="onInputBlur"
                    clearable
                /></template>
              </el-table-column>
              <el-table-column prop="WareMaterial" label="Vị trí">
                <template #default="scope">
                  <el-input
                    v-model="inputData.inputTemLst[scope.$index].WareMaterial"
                    placeholder="Nhập vị trí..."
                    clearable
                /></template>
              </el-table-column>
              <el-table-column prop="Note" label="Ghi chú">
                <template #default="scope">
                  <el-input
                    v-model="inputData.inputTemLst[scope.$index].Note"
                    placeholder="Nhập ghi chú..."
                    clearable
                  />
                </template>
              </el-table-column>
              <el-table-column width="60">
                <template #default="scope">
                  <el-button
                    link
                    type="primary"
                    size="small"
                    v-if="scope.$index !== 0"
                    @click.prevent="deleteRow(scope.$index)"
                  >
                    Xoá
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
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
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            ><i class="ti-check"></i> Xác nhận</el-button
          >
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue';
import useMaterialLst from '../../../api/materialList';

export default {
  props: {
    dataGetItemFastProps: {
      type: Object,
      required: true,
    },
    dataGetLocationStoreProps: {
      type: Object,
      required: true,
    },
    dataGetLocationProps: {
      type: Object,
      required: true,
    },
    dataQASupplierProps: {
      type: Object,
      required: true,
    },
    dataQAMaterialUnitProps: {
      type: Object,
      required: true,
    },
    dataQAStatusMaterialProps: {
      type: Object,
      required: true,
    },
    dataQAMaterialPackingProps: {
      type: Object,
      required: true,
    },
  },

  setup(props, { emit }) {
    const dataGetItemFast = props.dataGetItemFastProps.ItemLst.map((item) => ({
      value: `${item.ProductID}`,
      label: `${item.ProductID}`,
    }));
    const dataGetLocationStore = props.dataGetLocationStoreProps.Data.map(
      (item) => ({
        value: `${item.StoreCode}`,
        label: `${item.StoreName}`,
      })
    );
    const dataGetLocation = props.dataGetLocationProps.Data.map((item) => ({
      value: `${item.WareID}`,
      label: `${item.WareID}`,
    }));
    const dataQASupplier = props.dataQASupplierProps.DefaultValueLst.map(
      (item) => ({
        value: `${item.value}`,
        label: `${item.value}`,
      })
    );
    const dataQAMaterialUnit =
      props.dataQAMaterialUnitProps.DefaultValueLst.map((item) => ({
        value: `${item.value}`,
        label: `${item.value}`,
      }));
    const dataQAStatusMaterial =
      props.dataQAStatusMaterialProps.DefaultValueLst.map((item) => ({
        value: `${item.value}`,
        label: `${item.value}`,
      }));
    const dataQAMaterialPacking =
      props.dataQAMaterialPackingProps.DefaultValueLst.map((item) => ({
        value: `${item.value}`,
        label: `${item.value}`,
      }));

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
      inputTemLst: [
        {
          Quantity: 0,
          WareMaterial: '',
          Note: '',
        },
      ],
    });

    // chọn mã BFO
    watch(
      () => inputData.selectedBFOCode,
      (newValue) => {
        const getItemFast = props.dataGetItemFastProps.ItemLst.find(
          (item) => item.ProductID === newValue
        );
        inputData.inputNameMaterial = getItemFast.ProductName;
        inputData.inputUnit = getItemFast.UnitOfMeasure;
        getItemFast.Supplier
          ? (inputData.inputProducer = getItemFast.Supplier)
          : (inputData.inputProducer = '');
      }
    );

    // chọn vị trí
    watch(
      () => inputData.inputWareMaterial,
      (newValue) => {
        inputData.inputTemLst.map((item) => (item.WareMaterial = newValue));
      }
    );

    // table tem
    const deleteRow = (index) => {
      inputData.inputTemLst.splice(index, 1);
    };

    const onAddItem = () => {
      inputData.inputTemLst.push({
        Quantity: 0,
        WareMaterial: inputData.inputWareMaterial,
        Note: '',
      });
      console.log(inputData.inputTemLst);
    };
    // end table tem

    //validate
    const ruleFormRef = ref(null);

    const validateInput = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Vui lòng nhập thông tin'));
      } else {
        callback();
      }
    };
    const validateSelect = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Vui lòng chọn thông tin'));
      } else {
        callback();
      }
    };
    const validateSelectTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Vui lòng chọn thời gian'));
      } else {
        callback();
      }
    };

    const rules = {
      selectedBFOCode: [{ validator: validateSelect, trigger: 'blur' }],
      inputNameMaterial: [{ validator: validateInput, trigger: 'blur' }],
      inputProducer: [{ validator: validateInput, trigger: 'blur' }],
      inputLotCode: [{ validator: validateInput, trigger: 'blur' }],
      inputLotNo: [{ validator: validateInput, trigger: 'blur' }],
      selectedSupplier: [{ validator: validateSelect, trigger: 'blur' }],
      inputSupplierID: [{ validator: validateInput, trigger: 'blur' }],
      inputDateManufacture: [
        { validator: validateSelectTime, trigger: 'blur' },
      ],
      inputDateExpired: [{ validator: validateSelectTime, trigger: 'blur' }],
      inputStatusMaterial: [{ validator: validateSelect, trigger: 'blur' }],
      inputWareMaterial: [{ validator: validateSelect, trigger: 'blur' }],
      inputStoreCode: [{ validator: validateSelect, trigger: 'blur' }],
      inputPacking: [{ validator: validateSelect, trigger: 'blur' }],
      inputUnit: [{ validator: validateSelect, trigger: 'blur' }],
    };

    async function clearSelectedError() {
      if (inputData.selectedBFOCode !== '') {
        ruleFormRef.value.clearValidate('selectedBFOCode');
      }
      if (inputData.selectedSupplier !== '') {
        ruleFormRef.value.clearValidate('selectedSupplier');
      }
      if (inputData.inputDateManufacture !== '') {
        ruleFormRef.value.clearValidate('inputDateManufacture');
      }
      if (inputData.inputDateExpired !== '') {
        ruleFormRef.value.clearValidate('inputDateExpired');
      }
      if (inputData.inputStatusMaterial !== '') {
        ruleFormRef.value.clearValidate('inputStatusMaterial');
      }
      if (inputData.inputWareMaterial !== '') {
        ruleFormRef.value.clearValidate('inputWareMaterial');
      }
      if (inputData.inputStoreCode !== '') {
        ruleFormRef.value.clearValidate('inputStoreCode');
      }
      if (inputData.inputPacking !== '') {
        ruleFormRef.value.clearValidate('inputPacking');
      }
      if (inputData.inputUnit !== '') {
        ruleFormRef.value.clearValidate('inputUnit');
      }
    }

    const submitForm = async () => {
      await ruleFormRef.value.validate((valid) => {
        if (valid) {
          console.log(valid);
          fetchCreateMaterial();
        } else {
          console.log('Error submit!');
        }
      });
    };
    //end validate

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

    function onInputFocus() {
      if (inputData.inputUnitPrice === 0) {
        inputData.inputUnitPrice = ''; // Xóa giá trị mặc định 0 khi người dùng tập trung vào ô input
      }
    }

    function onInputBlur() {
      if (
        (inputData.inputUnitPrice === '') |
        (inputData.inputUnitPrice !== Number)
      ) {
        inputData.inputUnitPrice = 0; // Khôi phục giá trị mặc định 0 khi người dùng rời khỏi ô input mà không nhập gì
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
          TemLst: inputData.inputTemLst,
        },
      };
      const res = await createMaterial(req);
      if (res.RespCode === 0) {
        closeModal();
      }
      return res;
    }
    // end create LO
    return {
      closeModal,
      inputData,
      onInputFocus,
      onInputBlur,
      fetchCreateMaterial,
      ruleFormRef,
      rules,
      submitForm,
      clearSelectedError,
      deleteRow,
      onAddItem,
      dataGetItemFast,
      dataGetLocationStore,
      dataGetLocation,
      dataQASupplier,
      dataQAMaterialUnit,
      dataQAStatusMaterial,
      dataQAMaterialPacking,
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
  font-size: 0.875rem;
}
.el-input__inner,
.el-textarea__inner {
  height: 3.5em !important;
}

.el-form-item__content {
  margin-left: 0 !important;
}

.mb-18px--mw-100 {
  margin-bottom: 18px;
  max-width: 100%;
}

.text-center {
  justify-content: center !important;
}

.el-select-v2__wrapper {
  height: 37px;
  border-radius: 8px;
}
</style>
