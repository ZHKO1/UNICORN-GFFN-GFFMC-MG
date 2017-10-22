import Vue from 'vue'
import Vuex from 'vuex'

import SideService from './SideService'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    SideService,
  }
})

