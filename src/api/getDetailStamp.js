import axios from 'axios';
import { ref } from 'vue';

export default function useDetailStamp() {
  const dataDetailStamp = ref([]);

  async function getDetailStamp(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialStamp/GetDetailStamp',
      data: req,
    });
    dataDetailStamp.value = await res.data.Data;
  }

  return {
    dataDetailStamp,
    getDetailStamp,
  };
}
