export default {
  setName(state, name) {
    state.nameVuex = name;
  },

  setInforLogin(state, infor) {
    state.inforLogin = infor;
    localStorage.setItem('inforLogin', JSON.stringify(state.inforLogin));
  },

  setDataCheckStampVuex(state, data) {
    state.dataCheckStampVuex = data;
  },
};
