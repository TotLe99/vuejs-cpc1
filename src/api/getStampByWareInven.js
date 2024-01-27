import { ref } from 'vue';
import axios from 'axios';
import { ElNotification } from 'element-plus';

export default function useGetStampByWareInven() {
  const dataGetStampByWareInven = ref();

  async function getStampByWareInven(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Inventory/GetStampByWareInven',
      data: req,
    });

    dataGetStampByWareInven.value = res.data;
    if (dataGetStampByWareInven.value.RespCode !== 0) {
      ElNotification({
        title: 'Xảy ra lỗi',
        message: dataGetStampByWareInven.value.RespText,
        type: 'warning',
      });
    }
  }

  return {
    dataGetStampByWareInven,
    getStampByWareInven,
  };
}
