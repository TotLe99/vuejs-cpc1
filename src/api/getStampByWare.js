import { ref } from 'vue';
import axios from 'axios';

export default function useGetStampByWare() {
  const dataGetStampByWare = ref([]);
  async function getStampByWare(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Material/GetStampByWare',
      data: req,
    });
    dataGetStampByWare.value = res.data;
  }

  return {
    dataGetStampByWare,
    getStampByWare,
  };
}
