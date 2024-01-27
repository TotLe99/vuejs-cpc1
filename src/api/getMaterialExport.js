import { ref } from 'vue';
import axios from 'axios';

export default function useGetMaterialExport() {
  const dataGetMaterialExport = ref();

  async function getMaterialExport(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialExport/GetMaterialExport',
      data: req,
    });
    dataGetMaterialExport.value = await res.data;
  }
  return {
    dataGetMaterialExport,
    getMaterialExport,
  };
}
