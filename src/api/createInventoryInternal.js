import { ref } from 'vue';
import axios from 'axios';

export default function useCreateInventoryInternal() {
  const dataCreateInventoryInternal = ref();
  async function createInventoryInternal(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Inventory/CreateInventoryInternal',
      data: req,
    });
    dataCreateInventoryInternal.value = res.data;
  }
  return {
    dataCreateInventoryInternal,
    createInventoryInternal,
  };
}
