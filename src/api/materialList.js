import axios from 'axios';
export const materialList = async (data) => {
    const res = await axios({
      method: 'POST',
      url: 'https://icpc1hn.work/WebSX_API/MaterialImport/GetMaterialImport',
      data: data,
    });
    return res.data;
}

export const createMaterial = async (data) => {
  const res = await axios({
    method: 'POST',
    url: 'https://icpc1hn.work/WebSX_API/MaterialImport/CreateMaterialImport',
    data: data,
  });
  return res.data;
}

export const updateMaterial = async (data) => {
  const res = await axios({
    method: 'POST',
    url: 'https://icpc1hn.work/WebSX_API/MaterialImport/UpdateMaterialImport',
    data: data,
  });
  return res.data;
};

export const deleteMaterial = async (data) => {
  const res = await axios({
    method: 'POST',
    url: 'https://icpc1hn.work/WebSX_API/MaterialImport/DelMaterialImport',
    data: data,
  });
  return res.data;
};