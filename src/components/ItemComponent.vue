<template>
  {{ userName }}
  {{ user.name }} {{ user.name2 }}
  <button @click="handleCount">Tăng</button>
  {{ count }}
  {{ fullName }}
</template>

<script>
import { computed, reactive, ref, watch } from 'vue';
import {getData} from "../api/user"
export default {
  setup() {
    let userName = ref('tienthanh');
    let count = ref(0);
    let user = reactive({
      name: 'tien',
      name2: 'thanh',
    });
    // console.log(ref, reactive);
    // setTimeout(() => {
    //   userName.value = 'nguyentienthanh';
    //   user.name = 'nguyentienthanh';
    //   user.name2 = 'nguyentienthanh';
    // }, 2000);
    function handleCount() {
      count.value++;
    }
    async function fetchData(){
        const req ={"DateStart":"2023-12-05T17:00:00.000Z","DateEnd":"2023-12-14T07:17:39.896Z","TypeMaterial":"PL","Status":"","Search":"","Token":"MEYn6J1iqO2y3vW1DG8zNwdAxWMvvvUz","UserName":"0972671120"}
      
       const data = await  getData(req);
       console.log(data);
    }
    watch(count, function (newValue) {
      if (newValue > 2) alert('ok');
    });
    fetchData();
   let fullName =  computed(()=> userName.value + count.value);
    return {
      userName,
      user,
      count,
      handleCount,
      fullName,
      fetchData
    };
  },

  //   created() {
  //     console.log(this.userName);
  //     setTimeout(() => {
  //         this.userName = "nguyentienthanh"
  //     }, 2000);
  //   },
  //   data() {
  //     return {
  //       userName: 'tienthanh',
  //     };
  //   },
  //   methods: {},
  //   watch() {},

  //   computed() {},
  //   mounted() {},
};
</script>

<style></style>
