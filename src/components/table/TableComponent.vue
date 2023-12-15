<template>
  <div :style="{ marginBottom: '1%' }" class="d-flex">
    <div :style="{position:'relative', marginRight:'5%',backgroundColor:'#fff'}">
      <!-- <label :style="{marginRight:'1%'}" @click="showStartDate">Ngày bắt đầu</label>
      <i class="ti-calendar" @click="showStartDate"></i> -->
      <DatePicker
      open="isDatePickerOpen"
      value="selectedDate"
      onChange="handleDateChange"
      onClose="closeDatePicker"
      renderInput="renderInput"
    />
    </div>
    <div :style="{position:'relative', backgroundColor:'#fff'}">
      <!-- <label :style="{marginRight:'1%'}" @click="showEndDate">Ngày kết thúc</label>
      <i class="ti-calendar" @click="showEndDate"></i> -->
      <!-- <DatePicker
      open="isDatePickerOpen"
      value="selectedDate"
      onChange="handleDateChange"
      onClose="closeDatePicker"
      renderInput="renderInput"
    /> -->
    </div>
  </div>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="">1</td>
          <td class="">Alex</td>
          <td class="">NY</td>
          <td class="">0987654321</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-info" @click="fetchMaterilList">click</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { materialList } from '../../api/materialList';

export default {
  components: {
  },

  setup() {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const selectedStartDate = ref('');
    let isStartDate = ref(false);
    let isEndDate = ref(false);
    // const selectEndDate = ref('');

    //datepicker
    const selectedDate = ref(null);
    const isDatePickerOpen = ref(false);

    const openDatePicker = () => {
      isDatePickerOpen.value = true;
    };

    const closeDatePicker = () => {
      isDatePickerOpen.value = false;
    };

    const handleDateChange = (date) => {
      selectedDate.value = date;
      closeDatePicker();
    };
    //end datepicker

    async function fetchMaterilList() {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        DateStart: '2023-12-05',
        DateEnd: '2023-12-14',
        TypeMaterial: 'PL',
        Search: '',
        Status: '',
        ReTest: 0,
      };
      const data = await materialList(req);
      console.log('materialList: ', data);
    }

    function showStartDate() {
      isStartDate.value = !isStartDate.value;
    }

    function showEndDate() {
      isEndDate.value = !isEndDate.value;
    }

    return {
      fetchMaterilList,
      selectedStartDate,
      isStartDate,
      isEndDate,
      showStartDate,
      showEndDate,
      selectedDate,
      isDatePickerOpen,
      openDatePicker,
      closeDatePicker,
      handleDateChange,
    };
  },
};
</script>

<style scoped>
</style>
