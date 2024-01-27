<template>
  <div>
    <StreamBarcodeReader @decode="onDecode" />
  </div>
</template>

<script>
import { StreamBarcodeReader } from 'vue-barcode-reader';

export default {
  components: {
    StreamBarcodeReader,
  },

  setup(props, { emit }) {
    // Camera scan QR
    function onDecode(decode) {
      emit('scanCheckStamp', decode);
    }
    return { onDecode };
  },
};
</script>

<style></style>
