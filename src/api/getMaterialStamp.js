import axios from 'axios';
import { ref } from 'vue';

export default function useMaterialStamp() {
  let dataMaterialStamp = ref([]);

  async function getMaterialStamp(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Material/GetMaterialStamp',
      data: req,
    });
    dataMaterialStamp.value = await res.data;
  }

  return {
    getMaterialStamp,
    dataMaterialStamp,
  };
}
