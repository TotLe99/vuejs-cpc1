import axios from 'axios';
import { ref } from 'vue';

export default function useStampLineMaterial() {
  let dataStampLineMaterial = ref([]);

  async function getStampLineMaterial(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialStamp/GetStampLineMaterial',
      data: req,
    });
    dataStampLineMaterial.value = await res.data.Data;
  }

  return {
    getStampLineMaterial,
    dataStampLineMaterial,
  };
}
