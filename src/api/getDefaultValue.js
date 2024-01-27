import axios from 'axios';
import { ref } from 'vue';

export default function useGetDefaultValue() {
  const dataQASupplier = ref([]);
  const dataQAMaterialUnit = ref([]);
  const dataQAStatusMaterial = ref([]);
  const dataQAMaterialPacking = ref([]);

  async function getDefaultValue(req) {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/Other/GetDefaultValue',
      data: req,
    });
    if (req.Table === 'QASupplier') {
      dataQASupplier.value = res.data;
    } else if (req.Table === 'QAMaterialUnit') {
      dataQAMaterialUnit.value = res.data;
    } else if (req.Table === 'QAStatusMaterial') {
      dataQAStatusMaterial.value = res.data;
    } else if (req.Table === 'QAMaterialPacking') {
      dataQAMaterialPacking.value = res.data;
    }
  }

  return {
    dataQASupplier,
    dataQAMaterialUnit,
    dataQAStatusMaterial,
    dataQAMaterialPacking,
    getDefaultValue,
  };
}
