import axios from 'axios';
import { ref } from 'vue';

export default function useGetLocation() {
  const dataGetLocation = ref([]);

  async function getLocation(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Material/GetLocation',
      data: req,
    });
    dataGetLocation.value = res.data;
  }
  return {
    dataGetLocation,
    getLocation,
  };
}
