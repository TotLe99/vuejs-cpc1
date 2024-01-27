import { ref } from 'vue';
import axios from 'axios';

export default function useGetInventoryInternalLineLst() {
  const dataGetInventoryInternalLineLst = ref();

  async function getInventoryInternalLineLst(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Inventory/GetInventoryInternalLineLst',
      data: req,
    });
    dataGetInventoryInternalLineLst.value = res.data;
  }

  return {
    dataGetInventoryInternalLineLst,
    getInventoryInternalLineLst,
  };
}
