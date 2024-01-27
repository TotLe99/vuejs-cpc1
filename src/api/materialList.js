import axios from 'axios';
import { ref } from 'vue';
import { ElNotification } from 'element-plus';

export default function usseMaterialLst() {
  let dataMaterialLst = ref([]);

  // phan trang
  const currentPage = ref(1);
  const pageSize = ref(10);
  const pageSizes = ref([10, 20, 30, 50, 100]);

  async function getMaterialLst(data) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialImport/GetMaterialImport',
      data: data,
    });
    dataMaterialLst.value = await res.data.Data;

    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = Math.min(
      startIndex + pageSize.value,
      Array.from(dataMaterialLst.value).length
    );
    return Array.from(dataMaterialLst.value).slice(startIndex, endIndex);
  }

  async function createMaterial(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialImport/CreateMaterialImport',
      data: req,
    });
    if (res.data.RespCode === 0) {
      ElNotification({
        title: 'Thành công',
        message: 'Thêm lô thành công',
        type: 'success',
      });
    } else {
      ElNotification({
        title: 'Thất bại',
        message: res.data.RespText,
        type: 'warning',
      });
    }
    return res.data;
  }

  async function updateMaterial(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialImport/UpdateMaterialImport',
      data: req,
    });
    if (res.data.RespCode === 0) {
      ElNotification({
        title: 'Thành công',
        message: 'Cập nhật thành công',
        type: 'success',
      });
    } else {
      ElNotification({
        title: 'Thất bại',
        message: res.data.RespText,
        type: 'warning',
      });
    }
    return res.data;
  }

  async function deleteMaterial(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialImport/DelMaterialImport',
      data: req,
    });
    if (res.data.RespCode === 0) {
      ElNotification({
        title: 'Thành công',
        message: 'Xóa lô thành công',
        type: 'success',
      });
    } else {
      ElNotification({
        title: 'Thất bại',
        message: res.data.RespText,
        type: 'warning',
      });
    }
    return res.data;
  }

  return {
    getMaterialLst,
    dataMaterialLst,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    currentPage,
    pageSize,
    pageSizes,
  };
}
