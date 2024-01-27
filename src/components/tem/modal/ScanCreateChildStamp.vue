<template>
  <div>
    <StreamBarcodeReader @decode="onDecode" />
    <el-input v-model="inputStamID" placeholder="Quét mã..." />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import _ from 'lodash';
import { StreamBarcodeReader } from 'vue-barcode-reader';

export default {
  components: {
    StreamBarcodeReader,
  },

  setup(props, { emit }) {
    const inputStamID = ref('');

    const checkStampDebounced = _.debounce((newValue) => {
      emit('onAddItem', newValue);
    }, 1500);

    watch(inputStamID, (newValue) => {
      checkStampDebounced(newValue);
    });

    // Camera scan QR
    function onDecode(decode) {
      emit('onAddItem', decode);
    }

    return {
      inputStamID,
      onDecode,
    };
  },
};
</script>

<style>
#scanner-container {
  position: relative;
  z-index: 1;
}

video {
  max-width: 100%;
}

.drawingBuffer {
  display: none;
}

.laser {
  position: absolute;
  left: 0;
  width: 99.9%;
  height: 2px;
  background-color: red;
  top: 0;
  animation: laserAnimation 3s infinite linear;
}

@keyframes laserAnimation {
  0% {
    top: 25%;
    opacity: 0;
  }
  25% {
    top: 50%;
    opacity: 1;
  }
  50% {
    top: 75%;
    opacity: 0.5;
  }
  75% {
    top: 50%;
    opacity: 1;
  }
  100% {
    top: 25%;
    opacity: 0.5;
  }
}
</style>
