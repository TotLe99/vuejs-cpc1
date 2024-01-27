import { ref } from 'vue';
import axios from 'axios';

export default function useCreateChangeLocation() {
  const dataCreateChangeLocation = ref([]);
  async function createChangeLocation(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Material/CreateChangeLocation',
      data: req,
    });
    dataCreateChangeLocation.value = res.data;
  }
  return {
    dataCreateChangeLocation,
    createChangeLocation,
  };
}
