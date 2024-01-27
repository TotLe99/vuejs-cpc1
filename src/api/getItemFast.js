import axios from 'axios';
import { ref } from 'vue';

export default function useGetItemFast() {
  const dataGetItemFast = ref([]);

  async function getItemFast(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/Web_API/Product/GetItemFast',
      data: req,
    });
    dataGetItemFast.value = res.data;
  }

  return {
    dataGetItemFast,
    getItemFast,
  };
}
