import axios from 'axios';
import { ref } from 'vue';

export default function useCheckStamp() {
  const dataCheckStamp = ref([]);

  async function checkStamp(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Material/CheckStamp',
      data: req,
    });
    dataCheckStamp.value = await res.data;

    return await res.data;
  }

  return {
    dataCheckStamp,
    checkStamp,
  };
}
