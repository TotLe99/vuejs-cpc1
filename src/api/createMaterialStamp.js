import axios from 'axios';
import { ref } from 'vue';

export default function useCreateMaterialStamp() {
  const dataCreateMaterialStamp = ref({});

  async function createMaterialStamp(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Material/CreateMaterialStamp',
      data: req,
    });
    dataCreateMaterialStamp.value = await res.data;
  }

  return {
    dataCreateMaterialStamp,
    createMaterialStamp,
  };
}
