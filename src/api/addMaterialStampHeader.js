import { ref } from 'vue';
import axios from 'axios';

export default function useAddMaterialStampHeader() {
  const dataAddMaterialStampHeader = ref();

  async function addMaterialStampHeader(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialStamp/AddMaterialStampHeader',
      data: req,
    });
    dataAddMaterialStampHeader.value = res.data;
  }

  return {
    dataAddMaterialStampHeader,
    addMaterialStampHeader,
  };
}
