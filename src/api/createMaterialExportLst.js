import { ref } from 'vue';
import axios from 'axios';
import { ElNotification } from 'element-plus';

export default function useCreateMaterialExportLst() {
  const dataCreateMaterialExportLst = ref();
  async function createMaterialExportLst(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialExport/CreateMaterialExportLst',
      data: req,
    });
    dataCreateMaterialExportLst.value = res.data;

    if (res.data.RespCode === 0) {
      ElNotification({
        title: 'Thành công',
        message: 'Xuất phụ liệu thành công',
        type: 'success',
      });
    } else {
      ElNotification({
        title: 'Thất bại',
        message: res.data.RespText,
        type: 'warning',
      });
    }
  }

  return {
    dataCreateMaterialExportLst,
    createMaterialExportLst,
  };
}
