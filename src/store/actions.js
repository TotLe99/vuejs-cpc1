export default {
  updateProfile({ commit }) {
    commit('setName', 'CPC1 Ha Noi');
  },

  updateInforLogin({commit}, infor) {
    commit('setInforLogin', infor);
  }
};
