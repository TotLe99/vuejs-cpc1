import { ref } from 'vue';
import axios from 'axios';
import { ElNotification } from 'element-plus';

export default function useAcceptMaterialImport() {
  const dataAcceptMaterialImport = ref();

  async function acceptMaterialImport(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialStore/AcceptMaterialImport',
      data: req,
    });
    dataAcceptMaterialImport.value = res.data;

    if (res.data.RespCode === 0) {
      ElNotification({
        title: 'Thành công',
        message: 'Xác nhận thành công',
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
    dataAcceptMaterialImport,
    acceptMaterialImport,
  };
}
