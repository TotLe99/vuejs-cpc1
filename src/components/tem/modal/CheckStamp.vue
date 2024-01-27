<template>
  <div>
    <StreamBarcodeReader @decode="onDecode" />
    <el-input v-model="inputStampID" placeholder="Quét mã..." />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import useCheckStamp from '../../../api/checkStamp';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import _ from 'lodash';
import { StreamBarcodeReader } from 'vue-barcode-reader';

export default {
  components: {
    StreamBarcodeReader,
  },
  setup(props, { emit }) {
    const inforLogin = JSON.parse(localStorage.getItem('inforLogin'));
    const { checkStamp, dataCheckStamp } = useCheckStamp();
    const store = useStore();
    const inputStampID = ref('');

    // call API Scan Stamp
    async function fetchCheckStamp(inputStampIDProp) {
      const req = {
        UserName: inforLogin.UserInfo.Phone,
        Token: inforLogin.Token,
        Type: 'Check tem',
        StampID: inputStampIDProp,
      };
      try {
        await checkStamp(req);

        if (dataCheckStamp.value.RespCode !== 0) {
          ElMessage({
            message: 'Mã QRCode không đúng!',
            type: 'warning',
          });
        } else {
          store.commit('setDataCheckStampVuex', dataCheckStamp.value);
          emit('closeDialog', false);
        }
      } catch (e) {
        console.log(e);
      }
    }

    const checkStampDebounced = _.debounce((newValue) => {
      fetchCheckStamp(newValue);
    }, 1500);

    watch(inputStampID, (newValue) => {
      checkStampDebounced(newValue);
    });

    // Camera Scan
    function onDecode(text) {
      fetchCheckStamp(text);
    }

    return {
      inputStampID,
      fetchCheckStamp,
      onDecode,
    };
  },
};
</script>

<style></style>
