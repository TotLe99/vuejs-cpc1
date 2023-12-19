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
          <th>Kho</th>
          <th>Nhà SX</th>
          <th>Nhà CC</th>
        </tr>
      </thead>
      <div v-if="isLoading">
        <h6>Loading...</h6>
      </div>
      <tbody v-else>
        <tr v-for="item in dataMeterialList" :key="item.RowID">
          <td>
            <i
              class="ti-pencil-alt"
              title="Chỉnh sửa"
              :style="{
                color: '#409eff',
                fontSize: '18px',
                fontWeight: '900',
                cursor: 'pointer',
              }"
              @click="getItemMaterial(item)"
              data-bs-toggle="modal"
              data-bs-target="#modalUpdate"
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
              @click="getItemMaterial(item)"
              data-bs-toggle="modal"
              data-bs-target="#modalDelete"
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
          <td>{{ item.StoreCode }}</td>
          <td>{{ item.Producer }}</td>
          <td>{{ item.Supplier }}</td>
        </tr>

        <vuejs-paginate
          :page-count="totalPages"
          :click-handler="goToPage"
          :container-class="'pagination'"
          :prev-text="'Previous'"
          :next-text="'Next'"
        ></vuejs-paginate>
      </tbody>
    </table>
  </div>

  <!-- modal delete -->
  <div
    class="modal fade"
    id="modalDelete"
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
            Xóa báo cáo
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Xác nhận xoá nguyên liệu</p>
        </div>
        <div class="modal-footer center">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Huỷ
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="delMaterial()"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal delete -->

  <!-- modal update -->
  <div
    class="modal fade"
    id="modalUpdate"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog custom-modal">
      <div class="modal-content custom-modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="exampleModalLabel"
            :style="{ color: 'rgb(64, 158, 255)', fontWeight: '900' }"
          >
            <i class="ti-marker-alt"></i> CẬP NHẬT LÔ NGUYÊN LIỆU
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Mã BFO</label
                >
                <br />
                <select
                  :style="{ width: '100%', height: '32px', padding: '0 15px' }"
                  v-model="itemMaterial.BFOCode"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Nhà SX</label
                >
                <input
                  type="text"
                  placeholder="Nhập nhà sản xuất..."
                  v-model="itemMaterial.Producer"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '0 15px',
                  }"
                  class="custom-input"
                />
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Số lô</label
                >
                <input
                  type="text"
                  placeholder="Nhập số lô..."
                  v-model="itemMaterial.LotCode"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '0 15px',
                  }"
                  class="custom-input"
                />
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Đơn giá</label
                >
                <input
                  type="text"
                  v-model="itemMaterial.UnitPrice"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label><span :style="{ color: '#f56c6c' }">* </span>NSX</label>
                <VueDatePicker
                  v-model="itemMaterial.DateManufacture"
                  :format="formatDateDdMMyyyy"
                ></VueDatePicker>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Tình trạng
                  nguyên liệu</label
                >
                <br />
                <select
                  :style="{ width: '100%', height: '32px', padding: '0 15px' }"
                  v-model="itemMaterial.StatusMaterial"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label><span :style="{ color: '#f56c6c' }">* </span>Kho</label>
                <br />
                <select
                  :style="{ width: '100%', height: '32px', padding: '0 15px' }"
                  v-model="itemMaterial.StoreCode"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Tên nguyên
                  liệu</label
                >
                <input
                  type="text"
                  placeholder="Nhập tên nguyên liệu..."
                  v-model="itemMaterial.NameMaterial"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '0 15px',
                  }"
                  class="custom-input"
                />
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Nhà CC</label
                >
                <br />
                <select
                  :style="{ width: '100%', height: '32px', padding: '0 15px' }"
                  v-model="itemMaterial.Supplier"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Mã lô</label
                >
                <input
                  type="text"
                  placeholder="Nhập mã lô..."
                  v-model="itemMaterial.LotNo"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '0 15px',
                  }"
                  class="custom-input"
                />
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Mã NCC</label
                >
                <input
                  type="text"
                  placeholder="Nhập mã ncc..."
                  v-model="itemMaterial.SupplierID"
                  :style="{
                    width: '100%',
                    height: '32px',
                    padding: '0 15px',
                  }"
                  class="custom-input"
                />
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label><span :style="{ color: '#f56c6c' }">* </span>HSD</label>
                <VueDatePicker
                  v-model="itemMaterial.DateExpired"
                  :format="formatDateDdMMyyyy"
                ></VueDatePicker>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label
                  ><span :style="{ color: '#f56c6c' }">* </span>Vị trí</label
                >
                <br />
                <select
                  :style="{ width: '100%', height: '32px', padding: '0 15px' }"
                  v-model="itemMaterial.WareMaterial"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px d-flex"
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
                    v-model="itemMaterial.Packing"
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
                    v-model="itemMaterial.Unit"
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

          <div class="mb-18px" :style="{ padding: '0 10px' }">
            <label>Ghi chú</label>
            <textarea
              type="text"
              placeholder="Ghi chú..."
              v-model="itemMaterial.Note"
              :style="{ width: '100%', padding: '0 15px' }"
              class="custom-textarea"
            />
          </div>

          <div class="d-flex" :style="{ padding: '0 10px' }">
            <div class="custom-checkbox w-50">
              <lable for="myCheckbox">
                <input
                  type="checkbox"
                  :checked="itemMaterial.IsKN === 1 ? true : false"
                  v-model="itemMaterial.IsKN"
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
                v-model="itemMaterial.Urgent"
                class="custom-select"
              >
                <option :value="0" selected>Thường</option>
                <option :value="1">Gấp</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="fetchUpdateMaterial()"
          >
            <i class="ti-check"></i> Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- modal create -->
  <div
    class="modal fade"
    id="modalCreate"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog custom-modal">
      <div class="modal-content custom-modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="exampleModalLabel"
            :style="{ color: 'rgb(64, 158, 255)', fontWeight: '900' }"
          >
            <i class="ti-marker-alt"></i> NHẬP LÔ NGUYÊN LIỆU
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
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
                  <option value="" hidden disabled selected>
                    Chọn nguyên liệu
                  </option>
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label><span :style="{ color: '#f56c6c' }">* </span>NSX</label>
                <VueDatePicker
                  v-model="inputData.inputDateManufacture"
                  :format="formatDateDdMMyyyy"
                ></VueDatePicker>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <label><span :style="{ color: '#f56c6c' }">* </span>HSD</label>
                <VueDatePicker
                  v-model="inputData.inputDateExpired"
                  :format="formatDateDdMMyyyy"
                ></VueDatePicker>
              </div>

              <div
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px"
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
                class="el-col el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-12 mb-18px d-flex"
                :style="{ paddingLeft: '10px', paddingRight: '10px' }"
              >
                <div :style="{ width: '50%' }">
                  <label
                    ><span :style="{ color: '#f56c6c' }">* </span>Quy
                    cách</label
                  >
                  <br />
                  <select
                    class="custom-select"
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
                    class="custom-select"
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

          <div class="mb-18px" :style="{ padding: '0 10px' }">
            <label>Ghi chú</label>
            <textarea
              type="text"
              placeholder="Ghi chú..."
              v-model="inputData.inputNote"
              :style="{ width: '100%', padding: '0 15px' }"
              class="custom-textarea"
            />
          </div>

          <div class="d-flex mb-18px" :style="{ padding: '0 10px' }">
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
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
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
import {
  materialList,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from '../../api/materialList';

export default {
  components: {},

  setup() {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));

    // get one material
    const itemMaterial = reactive({});

    function getItemMaterial(item) {
      console.log(item);
      Object.assign(itemMaterial, item);
      console.log(itemMaterial);
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

    const isLoading = ref(false); // Trạng thái loading

    async function fetchMaterialList() {
      isLoading.value = true; // Bắt đầu loading

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
        const data = await materialList(req);
        materials.value = data.Data;
      } catch (error) {
        console.error(error);
      }

      isLoading.value = false; // Kết thúc loading
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
      const res = await createMaterial(req);
      if (res.RespCode === 0) {
        fetchMaterialList();
      }
      alert(res.RespText);
    }
    // end create LO

    // update LO
    async function fetchUpdateMaterial() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        MaterialImportInfo: {
          RowID: itemMaterial.RowID,
          BFOCode: itemMaterial.BFOCode,
          NameMaterial: itemMaterial.NameMaterial,
          Producer: itemMaterial.Producer,
          LotCode: itemMaterial.LotCode,
          LotNo: itemMaterial.LotNo,
          UnitPrice:
            itemMaterial.UnitPrice !== Number ? 0 : itemMaterial.UnitPrice,
          Supplier: itemMaterial.Supplier,
          SupplierID: itemMaterial.SupplierID,
          DateManufacture: formatDateYyyyMMddHHmmss(
            itemMaterial.DateManufacture
          ),
          DateExpired: formatDateYyyyMMddHHmmss(itemMaterial.DateExpired),
          StatusMaterial: itemMaterial.StatusMaterial,
          WareMaterial: itemMaterial.WareMaterial,
          StoreCode: itemMaterial.StoreCode,
          Packing: itemMaterial.Packing,
          Unit: itemMaterial.Unit,
          Note: itemMaterial.Note,
          IsKN: itemMaterial.IsKN === false ? 0 : 1,
          Urgent: itemMaterial.Urgent,
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
      const res = await updateMaterial(req);
      if (res.RespCode === 0) {
        fetchMaterialList();
      }
      alert(res.RespText);
    }
    // end update LO

    // delete LO
    async function delMaterial() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        ID: itemMaterial.RowID,
      };
      const res = await deleteMaterial(req);
      if (res.RespCode === 0) {
        fetchMaterialList();
      }
      alert(res.RespText);
    }
    // end delete LO

    // phan trang
    const currentPage = ref(1);
    const pageSize = 10;

    const totalPages = computed(() => {
      return Math.ceil(materials.value.length / pageSize);
    });

    const dataMeterialList = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      console.log(startIndex);
      console.log(endIndex);
      console.log('1:', materials.value);
      console.log('2:', [...materials.value]);
      console.log('3:', Array.from(materials.value));
      console.log(
        '4:',
        Array.from(materials.value).slice(startIndex, endIndex)
      );
      return Array.from(materials.value).slice(startIndex, endIndex);
    });

    const goToPage = (pageNumber) => {
      currentPage.value = pageNumber;
    };
    // end phan trang

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
      itemMaterial,
      getItemMaterial,
      fetchUpdateMaterial,
      delMaterial,
      isLoading,
      currentPage,
      totalPages,
      goToPage,
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
  height: 78vh;
  max-width: 700px;
}

.custom-modal-content {
  height: 100%;
}

.mb-18px {
  margin-bottom: 18px;
}

.text-center {
  justify-content: center !important;
}
</style>
