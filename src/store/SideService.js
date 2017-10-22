/**
 * Created by sioxa on 2016/12/25 0025.
 */
import * as def from '../config/def'
import Vue from 'vue'

export default {
  state: {
    SideLi: def.SideLi
  },
  mutations: {
    toggleSide (state, id){
      var that = this;
      var show = state.SideLi[id].show? (!state.SideLi[id].show): true;
      Vue.set(state.SideLi[id], "show", show);
    },
    dragSide (state, {id, x, y}){
      Vue.set(state.SideLi[id], "x", x);
      Vue.set(state.SideLi[id], "y", y);
    }
  },
  getters: {
  }
}
