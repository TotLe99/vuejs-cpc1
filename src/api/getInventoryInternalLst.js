import { ref } from 'vue';
import axios from 'axios';

export default function useGetInventoryInternalLst() {
  const dataGetInventoryInternalLst = ref();

  async function getInventoryInternalLst(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Inventory/GetInventoryInternalLst',
      data: req,
    });
    dataGetInventoryInternalLst.value = res.data;
  }

  return {
    dataGetInventoryInternalLst,
    getInventoryInternalLst,
  };
}
