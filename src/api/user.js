import  axios  from "axios";

export const getData = async (data)=>{
   const res = await axios({
     method: 'POST',
     url: 'https://icpc1hn.work/WebSX_API/MaterialImport/GetMaterialImport',
     data: data,
   });
    return res.data
}