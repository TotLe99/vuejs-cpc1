import axios from 'axios';
import { ref } from 'vue';

export default function usseMaterialLst() {
  let dataMaterialLst = ref([]);

  async function getMaterialLst(data) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialImport/GetMaterialImport',
      data: data,
    });
    dataMaterialLst.value = await res.data.Data;
  }

  function paginateMaterialLst(currentPage, pageSize) {
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
      alert('Thêm lô thành công');
    } else {
      alert(res.data.RespText);
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
      alert('Cập nhật thành công');
    } else {
      alert(res.data.RespText);
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
      alert('Xóa lô thành công');
    } else {
      alert(res.data.RespText);
    }
    return res.data;
  }

  return {
    getMaterialLst,
    paginateMaterialLst,
    dataMaterialLst,
    createMaterial,
    updateMaterial,
    deleteMaterial,
  };
}
