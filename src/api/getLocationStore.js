import axios from 'axios';
import { ref } from 'vue';

export default function useGetLocationStore() {
  const dataGetLocationStore = ref([]);
  async function getLocationStore(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Other/GetLocationStore',
      data: req,
    });
    dataGetLocationStore.value = res.data;
  }
  return {
    dataGetLocationStore,
    getLocationStore,
  };
}
