import axios from 'axios';
import { ref } from 'vue';

export default function useStampHeaderMaterial() {
  let dataStampHeaderMaterial = ref([]);
  async function getStampHeaderMaterial(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialStamp/GetStampHeaderMaterial',
      data: req,
    });
    dataStampHeaderMaterial.value = await res.data;
  }

  return {
    getStampHeaderMaterial,
    dataStampHeaderMaterial,
  };
}
