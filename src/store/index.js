import mutations from './mutations';
import actions from './actions';
import { createStore } from 'vuex';
import getters from './getters';
import state from './state';

export const storeConfigs = createStore({
  state,
  getters,
  mutations,
  actions,
});

export default storeConfigs;
