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

    dragSide (state, options){
      var id = options.id;
      options.x && Vue.set(state.SideLi[id], "x", parseInt(options.x));
      options.y && Vue.set(state.SideLi[id], "y", parseInt(options.y));
      options.angle && Vue.set(state.SideLi[id], "angle", parseInt(options.angle));
      options.scale && Vue.set(state.SideLi[id], "scale", parseFloat(options.scale));
      options.opacity && Vue.set(state.SideLi[id], "opacity", parseFloat(options.opacity));
    },

    reorderSide (state, array){
      state.SideLi = array;
    }
  },
  getters: {
  }
}
