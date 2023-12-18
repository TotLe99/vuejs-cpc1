<template>
  <div :style="{ marginBottom: '1%' }" class="d-flex">
    <div>
      <VueDatePicker
        v-model="selectedStartDate"
        :format="formatDateDdMMyyyy"
      ></VueDatePicker>
    </div>
    <div>
      <VueDatePicker
        v-model="selectedEndDate"
        :format="formatDateDdMMyyyy"
      ></VueDatePicker>
    </div>
    <div>
      <button
        class="btn btn-success"
        :style="{ marginLeft: '1rem' }"
        data-bs-toggle="modal"
        data-bs-target="#modalCreate"
      >
        +Thêm
      </button>
    </div>
  </div>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Thao tác</th>
          <th>Ngày nhập</th>
          <th>Người nhập</th>
          <th>Tên nguyên liệu</th>
          <th>Số lô</th>
          <th>Mã lô</th>
          <th>Vị trí</th>
          <th>Khối lượng</th>
          <th>Quy cách</th>
          <th>Giá tiền</th>
          <th>Nhà SX</th>
          <th>Nhà CC</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dataMeterialList" :key="item.RowID">
          <td>
            <i
              class="ti-pencil-alt"
              title="Chỉnh sửa"
              :style="{ color: '#409eff', fontSize: '18px', cursor: 'pointer' }"
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
          </td>
          <td>{{ formatDateDdMMyyyy(item.TimeImport) }}</td>
          <td>{{ item.Creater }}</td>
          <td>{{ item.NameMaterial }}</td>
          <td>{{ item.NLID }}</td>
          <td>{{ item.LotNo }}</td>
          <td>{{ item.WareMaterial }}</td>
          <td>{{ item.MassLot }} (GAM)</td>
          <td>{{ item.QuantityPack }} ({{ item.Packing }})</td>
          <td>{{ item.SumPrice }}</td>
          <td>{{ item.Producer }}</td>
          <td>{{ item.Supplier }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- modal create -->
  <div
    class="modal fade"
    id="modalCreate"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="exampleModalLabel"
            :style="{ color: 'rgb(64, 158, 255)' }"
          >
            NHẬP Lô NGUYÊN LIỆU
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex">
            <div class="modal-body-left" :style="{ width: '50%' }">
              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Mã BFO</label
                >
                <br />
                <select
                  :style="{ width: '100%', height: '32px', padding: '0 15px' }"
                  v-model="inputData.selectedBFOCode"
                  class="custom-select"
                >
                  <option
                    v-for="item in BFOCodeSlect"
                    v-bind:key="item"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Nhà SX</label
                >
                <input
                  type="text"
                  placeholder="Nhập nhà sản xuất..."
                  v-model="inputData.inputProducer"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '0 15px',
                  }"
                  class="custom-input"
                />
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Số lô</label
                >
                <input
                  type="text"
                  placeholder="Nhập số lô..."
                  v-model="inputData.inputLotCode"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '0 15px',
                  }"
                  class="custom-input"
                />
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Đơn giá</label
                >
                <input
                  type="text"
                  v-model="inputData.inputUnitPrice"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '0 15px',
                  }"
                  class="custom-input"
                  @focus="onInputFocus"
                  @blur="onInputBlur"
                />
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label><span :style="{ color: '#f56c6c' }">* </span>NSX</label>
                <VueDatePicker
                  v-model="inputData.inputDateManufacture"
                  :format="formatDateDdMMyyyy"
                ></VueDatePicker>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Tình trạng
                  nguyên liệu</label
                >
                <br />
                <select
                  :style="{ width: '100%', height: '32px', padding: '0 15px' }"
                  v-model="inputData.inputStatusMaterial"
                  class="custom-select"
                >
                  <option
                    v-for="item in StatusMaterialSelect"
                    v-bind:key="item"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label><span :style="{ color: '#f56c6c' }">* </span>Kho</label>
                <br />
                <select
                  :style="{ width: '100%', height: '32px', padding: '0 15px' }"
                  v-model="inputData.inputStoreCode"
                  class="custom-select"
                >
                  <option
                    v-for="item in StoreSelect"
                    v-bind:key="item[0]"
                    :value="item[0]"
                  >
                    {{ item[1] }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-body-right" :style="{ width: '50%' }">
              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Tên nguyên
                  liệu</label
                >
                <input
                  type="text"
                  placeholder="Nhập tên nguyên liệu..."
                  v-model="inputData.inputNameMaterial"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '0 15px',
                  }"
                  class="custom-input"
                />
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Nhà CC</label
                >
                <br />
                <select
                  :style="{ width: '100%', height: '32px', padding: '0 15px' }"
                  v-model="inputData.selectedSupplier"
                  class="custom-select"
                >
                  <option
                    v-for="item in SupplierSelect"
                    v-bind:key="item"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Mã lô</label
                >
                <input
                  type="text"
                  placeholder="Nhập mã lô..."
                  v-model="inputData.inputLotNo"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '0 15px',
                  }"
                  class="custom-input"
                />
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Mã NCC</label
                >
                <input
                  type="text"
                  placeholder="Nhập mã ncc..."
                  v-model="inputData.inputSupplierID"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '0 15px',
                  }"
                  class="custom-input"
                />
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label><span :style="{ color: '#f56c6c' }">* </span>HSD</label>
                <VueDatePicker
                  v-model="inputData.inputDateExpired"
                  :format="formatDateDdMMyyyy"
                ></VueDatePicker>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Vị trí</label
                >
                <br />
                <select
                  :style="{ width: '100%', height: '32px', padding: '0 15px' }"
                  v-model="inputData.inputWareMaterial"
                  class="custom-select"
                >
                  <option
                    v-for="item in WareMaterialSelect"
                    v-bind:key="item"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 d-flex"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <div :style="{ width: '50%' }">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>Quy
                    cách</label
                  >
                  <br />
                  <select
                    :style="{ width: '80%', height: '32px', padding: '0 15px' }"
                    v-model="inputData.inputPacking"
                  >
                    <option
                      v-for="item in PackingSelect"
                      v-bind:key="item"
                      :value="item"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>

                <div :style="{ width: '50%' }">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>Đơn vị</label
                  >
                  <br />
                  <select
                    :style="{ width: '80%', height: '32px', padding: '0 15px' }"
                    v-model="inputData.inputUnit"
                  >
                    <option
                      v-for="item in UnitSelect"
                      v-bind:key="item"
                      :value="item"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div :style="{ padding: '0 10px' }">
            <label>Ghi chú</label>
            <textarea
              type="text"
              placeholder="Ghi chú..."
              :style="{ width: '100%', padding: '0 15px' }"
              class="custom-textarea"
            />
          </div>

          <div class="d-flex" :style="{ padding: '0 10px' }">
            <div class="custom-checkbox w-50">
              <lable for="myCheckbox">
                <input
                  type="checkbox"
                  v-model="inputData.inputIsKN"
                  id="myCheckbox"
                  class="custom-input"
                />
                <span :style="{ paddingLeft: '10px' }"
                  >Lấy mẫu kiểm nghiệm</span
                ></lable
              >
            </div>

            <div
              class="w-50 el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12"
              :style="{ paddingLeft: '10px' }"
            >
              <select
                :style="{ width: '100%', height: '32px', padding: '0 15px' }"
                v-model="inputData.inputUrgent"
                class="custom-select"
              >
                <option :value="0" selected>Thường</option>
                <option :value="1">Gấp</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer center">
          <button
            type="button"
            class="btn btn-primary"
            @click="fetchCreateMaterial()"
          >
            <i class="ti-check"></i> Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';
import { materialList, createMaterial } from '../../api/materialList';

export default {
  components: {},

  setup() {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));

    // format date yyyy-MM-dd
    function formatDateYyyyMMdd(date) {
      const inputDate = new Date(date);

      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const day = String(inputDate.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }

    // format date yyyy-MM-dd
    function formatDateYyyyMMddHHmmss(date) {
      const inputDate = new Date(date);

      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const day = String(inputDate.getDate()).padStart(2, '0');
      const hour = String(inputDate.getHours());
      const minute = String(inputDate.getMinutes());
      const second = String(inputDate.getSeconds()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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

    async function fetchMaterialList() {
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
      const data = await materialList(req);

      materials.value = data.Data;
    }
    fetchMaterialList();
    //end display List

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
          DateManufacture: formatDateYyyyMMddHHmmss(inputData.inputDateManufacture),
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
          NLID:'',
          ImportFAST: true,
          TemLst:[]
        },
      };
          console.log(formatDateYyyyMMddHHmmss(inputData.inputDateManufacture));
          console.log(formatDateYyyyMMddHHmmss(inputData.inputDateExpired));
          console.log(formatDateYyyyMMddHHmmss(new Date()));
      const res = await createMaterial(req);
      alert(res.RespText);
    }
    // end create LO

    // const pageSize = ref(100); // Kích thước trang
    const dataMeterialList = computed(() => {
      // return materials.value.slice(pageSize.value);
      return materials.value;
    });

    return {
      fetchMaterialList,
      selectedStartDate,
      selectedEndDate,
      formatDateDdMMyyyy,
      materials,
      dataMeterialList,
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
</style>
